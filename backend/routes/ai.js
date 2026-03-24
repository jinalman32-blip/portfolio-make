const express = require('express');
const router = express.Router();
const axios = require('axios');

// POST /api/ai/generate-text  — OpenAI GPT-4o-mini
router.post('/generate-text', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1024,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    const text = response.data.choices[0].message.content;
    res.json({ text });
  } catch (err) {
    const msg = err.response?.data?.error?.message || err.message;
    res.status(500).json({ error: msg });
  }
});

// POST /api/ai/generate-image  — Replicate (flux-schnell)
router.post('/generate-image', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });
  try {
    const headers = {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    };

    // Create prediction using flux-schnell (fast, free tier)
    const createRes = await axios.post(
      'https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions',
      { input: { prompt, num_outputs: 1 } },
      { headers }
    );

    const predictionId = createRes.data.id;

    // Poll until done (max 60s)
    let imageUrl = null;
    for (let i = 0; i < 30; i++) {
      await new Promise((r) => setTimeout(r, 2000));
      const poll = await axios.get(
        `https://api.replicate.com/v1/predictions/${predictionId}`,
        { headers }
      );
      const { status, output, error } = poll.data;
      if (status === 'succeeded') { imageUrl = Array.isArray(output) ? output[0] : output; break; }
      if (status === 'failed') throw new Error(error || 'Image generation failed');
    }

    if (!imageUrl) throw new Error('Timed out waiting for image');
    res.json({ imageUrl });
  } catch (err) {
    const msg = err.response?.data?.detail || err.message;
    res.status(500).json({ error: msg });
  }
});

// POST /api/ai/generate-audio  — ElevenLabs TTS
router.post('/generate-audio', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });
  const voiceId = '21m00Tcm4TlvDq8ikWAM'; // Rachel
  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      },
      {
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
        },
        responseType: 'arraybuffer',
      }
    );
    res.set('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(response.data));
  } catch (err) {
    const msg = err.response?.data ? JSON.parse(Buffer.from(err.response.data).toString())?.detail?.message : err.message;
    res.status(500).json({ error: msg || err.message });
  }
});

// POST /api/ai/generate-bg  — Category-based background (flux-dev)
router.post('/generate-bg', async (req, res) => {
  const { category = 'General' } = req.body;

  // Category → visual theme
  const themes = {
    'IT & Software':      'dark cyberpunk digital matrix with floating circuit board traces, holographic code fragments and binary nodes',
    'Design & Creative':  'vibrant abstract fluid ink waves in teal-pink-purple gradients with subtle geometric crystal shapes',
    'Marketing':          'bold dynamic abstract color bursts in warm orange-coral-red gradients with radial energy waves',
    'Finance':            'elegant dark navy with golden geometric grid lines and faint stock-chart silhouette patterns',
    'Healthcare':         'clean soft medical blue-white mist with subtle DNA double helix spirals and hexagonal cell motifs',
    'Education':          'warm scholarly amber-brown tones with scattered constellation-like knowledge graph nodes',
    'Engineering':        'dark industrial metallic surface with blueprint-style technical grid lines and precision gear outlines',
    'Business':           'sophisticated deep charcoal with silver-chrome geometric facets and corporate angular patterns',
    'Science & Research': 'deep cosmic indigo with nebula clouds in blue-violet, faint molecular bond structures scattered at edges',
    'Arts & Entertainment':'artistic paint splatter aurora in rainbow hues with canvas grain texture and brushstroke traces',
    'Legal':              'dark mahogany-black with subtle embossed gold filigree borders and classical column silhouettes',
    'Architecture':       'cool concrete grey with wire-frame building blueprints dissolving into minimalist geometric forms',
    'General':            'elegant dark abstract gradient with soft luminous orbs and gentle flowing curves',
  };

  const twists = [
    'ethereal soft particle glow',
    'gritty metallic texture overlay',
    'dreamy light leak bokeh',
    'dynamic radiant energy streaks',
    'subtle glitter dust particles',
    'vintage grainy film texture',
    'bold volumetric light shafts',
    'gentle iridescent shimmer',
    'deep chromatic aberration haze',
    'soft aurora borealis glow',
  ];

  const theme    = themes[category] || themes['General'];
  const twist    = twists[Math.floor(Math.random() * twists.length)];
  const stylize  = Math.floor(Math.random() * 551) + 300;   // 300–850
  const seed     = Math.floor(Math.random() * 2147483647);
  const guidance = +(3.5 + Math.random() * 1.5).toFixed(2); // 3.5–5.0
  const steps    = Math.floor(Math.random() * 8) + 28;       // 28–35

  const prompt = `Professional resume background only, no text no people no faces no watermarks no clutter no letters, for ${category} category, ${theme}, ${twist}, high-quality cinematic aesthetic, subtle thematic elements scattered faintly in corners and edges only, large empty clean central rectangular area for text overlay, keep center mostly plain and readable, ultra detailed realistic rendering 8k, soft volumetric lighting, stylize ${stylize}`;

  try {
    const headers = {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    };

    const createRes = await axios.post(
      'https://api.replicate.com/v1/models/black-forest-labs/flux-dev/predictions',
      {
        input: {
          prompt,
          aspect_ratio: '2:3',
          guidance,
          num_inference_steps: steps,
          seed,
          output_format: 'webp',
          output_quality: 90,
        },
      },
      { headers }
    );

    const predictionId = createRes.data.id;

    // Poll until done (max 120s — flux-dev is slower than schnell)
    let imageUrl = null;
    for (let i = 0; i < 60; i++) {
      await new Promise((r) => setTimeout(r, 2000));
      const poll = await axios.get(
        `https://api.replicate.com/v1/predictions/${predictionId}`,
        { headers }
      );
      const { status, output, error } = poll.data;
      if (status === 'succeeded') { imageUrl = Array.isArray(output) ? output[0] : output; break; }
      if (status === 'failed')    throw new Error(error || 'Background generation failed');
    }

    if (!imageUrl) throw new Error('Timed out waiting for background image');
    res.json({ imageUrl, meta: { category, twist, stylize, seed, guidance, steps } });
  } catch (err) {
    const msg = err.response?.data?.detail || err.message;
    res.status(500).json({ error: msg });
  }
});

// POST /api/ai/generate-profile  — AI profile photo (flux-schnell)
router.post('/generate-profile', async (req, res) => {
  const { name = 'Professional', title = 'Professional' } = req.body;

  const styles = [
    'professional corporate headshot, studio lighting, clean white background',
    'modern professional portrait, soft bokeh background, natural lighting',
    'minimalist professional photo, gradient grey background, sharp focus',
    'creative professional portrait, warm studio lighting, neutral backdrop',
    'tech professional headshot, clean office environment, confident pose',
  ];
  const style = styles[Math.floor(Math.random() * styles.length)];
  const prompt = `High quality professional ${title} headshot portrait, ${style}, photorealistic, sharp details, no text no watermark no logo, 4k quality, centered framing, professional attire, confident expression, single person`;

  try {
    const headers = {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    };

    const createRes = await axios.post(
      'https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions',
      { input: { prompt, num_outputs: 1, aspect_ratio: '1:1', output_format: 'webp', output_quality: 90 } },
      { headers }
    );

    const predictionId = createRes.data.id;

    let imageUrl = null;
    for (let i = 0; i < 30; i++) {
      await new Promise((r) => setTimeout(r, 2000));
      const poll = await axios.get(
        `https://api.replicate.com/v1/predictions/${predictionId}`,
        { headers }
      );
      const { status, output, error } = poll.data;
      if (status === 'succeeded') { imageUrl = Array.isArray(output) ? output[0] : output; break; }
      if (status === 'failed') throw new Error(error || 'Profile photo generation failed');
    }

    if (!imageUrl) throw new Error('Timed out waiting for profile photo');
    res.json({ imageUrl });
  } catch (err) {
    const msg = err.response?.data?.detail || err.message;
    res.status(500).json({ error: msg });
  }
});

// POST /api/ai/parse-resume  — upload PDF/DOCX → extract portfolio JSON
const multer = require('multer');
const pdfParse = require('pdf-parse');
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.post('/parse-resume', upload.single('resume'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  let text = '';
  try {
    if (req.file.mimetype === 'application/pdf') {
      const data = await pdfParse(req.file.buffer);
      text = data.text;
    } else {
      text = req.file.buffer.toString('utf-8');
    }
  } catch (e) {
    return res.status(400).json({ error: 'Could not read file: ' + e.message });
  }

  if (!text.trim()) return res.status(400).json({ error: 'Resume file is empty or unreadable' });

  const prompt = `Extract portfolio data from this resume text and return ONLY valid JSON (no markdown, no explanation):

Resume text:
${text.substring(0, 6000)}

Return this exact JSON structure:
{
  "details": {
    "name": "<full name or empty string>",
    "title": "<job title or empty string>",
    "bio": "<2-3 sentence professional summary, first person, or empty string>",
    "email": "<email or empty string>",
    "phone": "<phone or empty string>",
    "location": "<city, country or empty string>",
    "website": "<website url or empty string>",
    "linkedin": "<linkedin url or empty string>"
  },
  "skills": [{ "name": "<skill name>", "level": "Beginner" | "Intermediate" | "Expert" }],
  "education": [{ "degree": "<degree>", "field": "<field of study>", "institution": "<university name>", "from": "<year>", "to": "<year>", "grade": "<GPA or grade or empty>" }],
  "experience": [{ "role": "<job title>", "company": "<company name>", "location": "<city>", "from": "<month year>", "to": "<month year or Present>", "current": true|false, "description": "<responsibilities in 1-2 sentences>" }],
  "projects": [{ "name": "<project name>", "description": "<1-2 sentences>", "tech": "<comma separated tech>", "link": "", "github": "" }]
}

If a field is not found in the resume, use empty string "" or empty array []. Infer skill levels from context (mentioned as expert/senior = Expert, basic/familiar = Beginner, else Intermediate).`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2048,
        temperature: 0.3,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    const raw = response.data.choices[0].message.content;
    const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const portfolio = JSON.parse(cleaned);
    res.json({ portfolio });
  } catch (err) {
    const msg = err.response?.data?.error?.message || err.message;
    res.status(500).json({ error: msg });
  }
});

module.exports = router;
