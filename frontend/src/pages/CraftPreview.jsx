import React, { useState, useRef, Component } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

class PreviewErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Template rendering error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red', textAlign: 'left', background: '#ffebee', borderRadius: '10px' }}>
          <h2>Template Crashed</h2>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: '12px' }}>
            {this.state.error && this.state.error.toString()}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
import {
  ArrowLeft, Download, Edit3, Check, Palette,
  Monitor, Smartphone, RefreshCw, Printer, Sparkles, ImageIcon, User, Save, FolderOpen, Globe, ExternalLink, X, Loader
} from 'lucide-react'
import api from '../api/api'
import TemplatePurple      from '../templates/TemplatePurple'
import TemplateFuturistic  from '../templates/TemplateFuturistic'
import TemplateMinimalist  from '../templates/TemplateMinimalist'
import TemplateGrayscale   from '../templates/TemplateGrayscale'
import TemplateBrownCream  from '../templates/TemplateBrownCream'
import TemplateDarkBlue   from '../templates/TemplateDarkBlue'
import TemplatePresentationStyle from '../templates/TemplatePresentationStyle'
import TemplateBoldBlack from '../templates/TemplateBoldBlack'
import TemplateOrangeWhite from '../templates/TemplateOrangeWhite'
import TemplateBlueGradientAesthetic from '../templates/TemplateBlueGradientAesthetic'
import TemplateGreenBeige from '../templates/TemplateGreenBeige'
import TemplateNeon from '../templates/TemplateNeon'
import TemplateLight from '../templates/TemplateLight'
import TemplateDark from '../templates/TemplateDark'
import TemplateClassic from '../templates/TemplateClassic'

const TEMPLATE_MAP = {
  browncream:         { component: TemplateBrownCream,         name: 'Brown & Cream',       accent: '#7B5B3A' },
  grayscale:          { component: TemplateGrayscale,          name: 'B&W Photography',     accent: '#ffffff' },
  purple:             { component: TemplatePurple,             name: 'Purple Beige',        accent: '#c4a0d0' },
  futuristic:         { component: TemplateFuturistic,         name: 'Neural Circuit',      accent: '#00d4ff' },
  minimalist:         { component: TemplateMinimalist,         name: 'B&W Minimalist',      accent: '#e8e3d5' },
  darkblue:           { component: TemplateDarkBlue,           name: 'Dark Blue Creative',  accent: '#5b4ff5' },
  presentationstyle:  { component: TemplatePresentationStyle,  name: 'Presentation Style',  accent: '#C8860A' },
  boldblack:          { component: TemplateBoldBlack,          name: 'Bold Black',          accent: '#F0EEE8' },
  orangewhite:           { component: TemplateOrangeWhite,              name: 'Orange & White',             accent: '#E85C26' },
  bluegradientaesthetic: { component: TemplateBlueGradientAesthetic,    name: 'Blue Gradient Aesthetic',    accent: '#4a90e8' },
  greenbeige:            { component: TemplateGreenBeige,               name: 'Green Beige Creative',        accent: '#6b8c4e' },
  neon:                  { component: TemplateNeon,                    name: 'Neon Cyber',                  accent: '#39ff14' },
  light:                 { component: TemplateLight,                   name: 'Clean Light',                 accent: '#3b82f6' },
  dark:                  { component: TemplateDark,                    name: 'Modern Dark',                 accent: '#6366f1' },
  classic:               { component: TemplateClassic,                 name: 'Classic Professional',        accent: '#2d3748' },
}

function generatePurpleHTML(portfolio) {
  const { details: d, skills, education, experience, projects, certifications = [], publications = [], awards = [] } = portfolio
  const P = '#c4a0d0', PD = '#a07ab5', BG = '#f4ece8'
  const lvl = { Beginner:'35%', Intermediate:'65%', Expert:'92%' }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${d?.name || 'Portfolio'}</title>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet"/>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Nunito',sans-serif;background:${BG};color:#1a1a1a;min-height:100vh}
    a{color:${PD};text-decoration:none}
    h1,h2,h3{font-family:'Fredoka One',cursive}
    .hero{position:relative;overflow:hidden;min-height:280px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:55px 80px 45px;text-align:center}
    .avatar{width:88px;height:88px;border-radius:50%;background:linear-gradient(135deg,${P},${PD});display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:900;color:white;margin:0 auto 16px;border:4px solid ${P}55;box-shadow:0 4px 20px ${P}55;font-family:'Fredoka One',cursive}
    .hero h1{font-size:50px;color:#1a1a1a}
    .hero .sub{font-size:18px;color:${PD};font-weight:700;margin-top:6px}
    .contacts{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 18px;margin-top:14px;font-size:13px;color:#555}
    .blob-section{padding:16px 50px 28px;position:relative}
    .blob{background:${P};border-radius:60% 40% 65% 35%/52% 48% 52% 48%;padding:46px 70px;text-align:center;max-width:820px;margin:0 auto}
    .blob h2{font-size:32px;color:white;margin-bottom:16px}
    .blob p{font-size:15px;color:rgba(255,255,255,0.92);line-height:1.85;max-width:600px;margin:0 auto}
    .body{padding:10px 50px 50px;display:grid;grid-template-columns:1fr 1.55fr;gap:32px;max-width:1040px;margin:0 auto}
    .col{display:flex;flex-direction:column;gap:28px}
    .col-blob{background:${P};border-radius:60% 40% 65% 35%/52% 48% 52% 48%;padding:36px 36px 30px;text-align:left}
    .col-blob h2{font-size:28px;color:white;margin-bottom:14px}
    .skill-row{margin-bottom:10px}
    .skill-meta{display:flex;justify-content:space-between;margin-bottom:4px;font-size:13px;color:white;font-weight:600}
    .skill-meta small{color:rgba(255,255,255,0.7);font-weight:400}
    .skill-track{height:6px;background:rgba(255,255,255,0.18);border-radius:4px}
    .skill-fill{height:100%;background:rgba(255,255,255,0.85);border-radius:4px}
    .edu-item{margin-bottom:16px;padding-left:12px;border-left:3px solid rgba(255,255,255,0.5)}
    .edu-item strong{font-size:15px;color:white;font-family:'Fredoka One',cursive}
    .edu-item .inst{font-size:13px;color:rgba(255,255,255,0.82);margin-top:3px}
    .edu-item small{font-size:12px;color:rgba(255,255,255,0.55)}
    .sec-head{font-size:30px;color:#1a1a1a;margin-bottom:14px}
    .exp-card,.proj-card{padding:16px 20px;background:${P}22;border-radius:18px;border:1.5px solid ${P}55;margin-bottom:12px}
    .exp-card .row{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}
    .exp-card strong{font-size:16px;color:#1a1a1a;font-family:'Fredoka One',cursive}
    .exp-card .comp{font-size:13px;color:${PD};margin-top:2px;font-weight:600}
    .exp-card .date{font-size:12px;color:#666}
    .exp-card p{font-size:13px;color:#555;margin-top:8px;line-height:1.65}
    .proj-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
    .proj-card strong{font-size:15px;color:#1a1a1a;font-family:'Fredoka One',cursive}
    .proj-links{display:flex;gap:8px;margin-top:2px}
    .proj-links a{font-size:11px;color:${PD}}
    .proj-card p{font-size:12px;color:#555;margin-top:6px;line-height:1.55}
    .tags{display:flex;flex-wrap:wrap;gap:4px;margin-top:8px}
    .tag{font-size:10px;padding:2px 8px;border-radius:20px;background:${P}30;color:${PD};border:1px solid ${P}55;font-weight:600}
    .footer{position:relative;overflow:hidden;text-align:center;padding:40px 60px 50px;background:${BG}}
    .footer h2{font-size:44px;color:#1a1a1a}
    .footer .line{margin:10px auto 0;width:220px;border-bottom:3px dashed ${P};opacity:0.7}
    @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
  </style>
</head>
<body>
  <div class="hero">
    <div class="avatar">${d?.profileImage ? `<img src="${d.profileImage}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">` : (d?.name||'U')[0].toUpperCase()}</div>
    <h1>${d?.name||'Your Name'}</h1>
    ${d?.title?`<p class="sub">${d.title}</p>`:''}
    <div class="contacts">
      ${d?.email?`<span>✉ ${d.email}</span>`:''}
      ${d?.phone?`<span>📞 ${d.phone}</span>`:''}
      ${d?.location?`<span>📍 ${d.location}</span>`:''}
      ${d?.website?`<a href="${d.website}">🌐 Website</a>`:''}
      ${d?.linkedin?`<a href="${d.linkedin}">LinkedIn</a>`:''}
    </div>
  </div>
  ${d?.bio?`<div class="blob-section"><div class="blob"><h2>Introduction</h2><p>${d.bio}</p></div></div>`:''}
  <div class="body">
    <div class="col">
      ${skills?.length?`<div class="col-blob"><h2>Skills</h2>${skills.map(s=>`<div class="skill-row"><div class="skill-meta"><span>${s.image?`<img src="${s.image}" style="width:16px;height:16px;object-fit:cover;border-radius:3px;vertical-align:middle;margin-right:5px">`:''}${s.name}</span><small>${s.level}</small></div><div class="skill-track"><div class="skill-fill" style="width:${lvl[s.level]||'50%'}"></div></div></div>`).join('')}</div>`:'' }
      ${education?.length?`<div class="col-blob"><h2>Education</h2>${education.map(e=>`<div class="edu-item"><strong>${e.degree}${e.field?` in ${e.field}`:''}</strong><div class="inst">${e.institution}</div><small>${e.from||''}${e.to?` — ${e.to}`:''}${e.grade?` · ${e.grade}`:''}</small></div>`).join('')}</div>`:''}
    </div>
    <div class="col">
      ${experience?.length?`<div><h2 class="sec-head">Experience</h2>${experience.map(e=>`<div class="exp-card"><div class="row"><div><strong>${e.role}</strong><div class="comp">${e.company}${e.location?` · ${e.location}`:''}</div></div><span class="date">${e.from||''}${e.to?` – ${e.current?'Present':e.to}`:''}</span></div>${e.description?`<p>${e.description}</p>`:''}</div>`).join('')}</div>`:''}
      ${projects?.length?`<div><h2 class="sec-head">Projects</h2><div class="proj-grid">${projects.map(proj=>`<div class="proj-card">${proj.image?`<img src="${proj.image}" style="width:100%;height:80px;object-fit:cover;border-radius:10px 10px 0 0;display:block;margin:-12px -14px 10px;width:calc(100% + 28px)">`:''}<strong>${proj.name}</strong><div class="proj-links">${proj.link?`<a href="${proj.link}">Live ↗</a>`:''}${proj.github?`<a href="${proj.github}">GitHub ↗</a>`:''}</div>${proj.description?`<p>${proj.description}</p>`:''}${proj.tech?`<div class="tags">${proj.tech.split(',').map(t=>`<span class="tag">${t.trim()}</span>`).join('')}</div>`:''}</div>`).join('')}</div></div>`:''}
    </div>
  </div>
  ${certifications?.length?`<div style="padding:20px 50px"><h2 class="sec-head">Certifications</h2><div style="display:flex;flex-direction:column;gap:10px">${certifications.map(cert=>`<div style="padding:12px 16px;background:#c4a0d018;border-radius:14px;border:1.5px solid #c4a0d050;display:flex;gap:12px;align-items:flex-start">${cert.image?`<img src="${cert.image}" style="width:48px;height:48px;object-fit:cover;border-radius:8px;flex-shrink:0">`:''}<div><strong style="font-size:14px;color:#1a1a1a">${cert.name}</strong>${cert.issuer?`<div style="font-size:12px;color:#a07ab5;margin-top:2px">${cert.issuer}</div>`:''}${cert.date?`<div style="font-size:11px;color:#555;margin-top:2px">${cert.date}</div>`:''}${cert.url?`<a href="${cert.url}" style="font-size:11px;color:#a07ab5">View ↗</a>`:''}</div></div>`).join('')}</div></div>`:''}
  ${publications?.length?`<div style="padding:20px 50px"><h2 class="sec-head">Publications</h2><div style="display:flex;flex-direction:column;gap:10px">${publications.map(pub=>`<div style="padding:12px 16px;background:#c4a0d018;border-radius:14px;border:1.5px solid #c4a0d050;display:flex;gap:12px;align-items:flex-start">${pub.image?`<img src="${pub.image}" style="width:48px;height:48px;object-fit:cover;border-radius:8px;flex-shrink:0">`:''}<div><strong style="font-size:14px;color:#1a1a1a">${pub.title}</strong>${pub.publisher?`<div style="font-size:12px;color:#a07ab5;margin-top:2px">${pub.publisher}</div>`:''}${pub.date?`<div style="font-size:11px;color:#555;margin-top:2px">${pub.date}</div>`:''}${pub.url?`<a href="${pub.url}" style="font-size:11px;color:#a07ab5">Read ↗</a>`:''}</div></div>`).join('')}</div></div>`:''}
  ${awards?.length?`<div style="padding:20px 50px"><h2 class="sec-head">Awards</h2><div style="display:flex;flex-direction:column;gap:10px">${awards.map(award=>`<div style="padding:12px 16px;background:#c4a0d018;border-radius:14px;border:1.5px solid #c4a0d050;display:flex;gap:12px;align-items:flex-start">${award.image?`<img src="${award.image}" style="width:48px;height:48px;object-fit:cover;border-radius:8px;flex-shrink:0">`:''}<div><strong style="font-size:14px;color:#1a1a1a">${award.title}</strong>${award.organization?`<div style="font-size:12px;color:#a07ab5;margin-top:2px">${award.organization}</div>`:''}${award.date?`<div style="font-size:11px;color:#555;margin-top:2px">${award.date}</div>`:''}${award.description?`<p style="font-size:12px;color:#555;margin-top:4px;line-height:1.55">${award.description}</p>`:''}</div></div>`).join('')}</div></div>`:''}
  <div class="footer"><h2>Thank You</h2><div class="line"></div></div>
</body>
</html>`
}

function generateFuturisticHTML(portfolio) {
  const { details: d, skills, education, experience, projects, futuristic_bg, certifications = [], publications = [], awards = [] } = portfolio
  const CYAN = '#00d4ff', PURPLE = '#a855f7', BG = '#03040d'
  const lvl = { Beginner:'35%', Intermediate:'65%', Expert:'92%' }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${d?.name || 'Portfolio'}</title>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Inter',sans-serif;background:${BG};color:white;min-height:100vh;position:relative;overflow-x:hidden}
    ${futuristic_bg ? `body::after{content:'';position:fixed;inset:0;background:url('${futuristic_bg}') center/cover no-repeat;z-index:-2;pointer-events:none} body::before{content:'';position:fixed;inset:0;background:rgba(3,4,13,0.72);z-index:-1;pointer-events:none}` : `body::before{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(0,212,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.04) 1px,transparent 1px);background-size:40px 40px;pointer-events:none;z-index:0}`}
    a{color:${CYAN};text-decoration:none}
    h1,h2{font-family:'Orbitron',sans-serif}
    .hero{position:relative;z-index:1;padding:52px 60px 40px;border-bottom:1px solid rgba(0,212,255,0.1);display:flex;align-items:center;gap:32px}
    .avatar{width:86px;height:86px;border-radius:50%;background:linear-gradient(135deg,${PURPLE},${CYAN});display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:900;color:white;font-family:'Orbitron',sans-serif;box-shadow:0 0 0 3px ${CYAN}33,0 0 30px ${CYAN}44;border:2px solid ${CYAN}55;flex-shrink:0}
    .badge{display:inline-flex;align-items:center;gap:6px;padding:3px 12px;border-radius:20px;background:${CYAN}12;border:1px solid ${CYAN}33;font-size:10px;color:${CYAN};letter-spacing:2px;text-transform:uppercase;font-weight:600;margin-bottom:8px}
    .dot{width:6px;height:6px;border-radius:50%;background:${CYAN};box-shadow:0 0 6px ${CYAN};display:inline-block}
    .name{font-size:40px;font-weight:900;background:linear-gradient(135deg,${CYAN},${PURPLE});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1.1;margin:0 0 6px}
    .title-sub{font-size:16px;color:${CYAN}cc;font-weight:500;margin:0 0 12px;letter-spacing:0.5px}
    .contacts{display:flex;flex-wrap:wrap;gap:4px 20px;font-size:12px;color:rgba(255,255,255,0.5)}
    .bio-strip{position:relative;z-index:1;background:linear-gradient(135deg,${PURPLE}18,${CYAN}10);border-bottom:1px solid ${PURPLE}25;padding:24px 60px}
    .bio-strip p{font-size:14px;color:rgba(255,255,255,0.75);line-height:1.8;max-width:820px;margin:0 auto}
    .body{position:relative;z-index:1;display:grid;grid-template-columns:280px 1fr;gap:24px;padding:30px 40px 50px;max-width:1100px;margin:0 auto}
    .col{display:flex;flex-direction:column;gap:20px}
    .card{background:rgba(8,12,32,0.82);border:1px solid ${CYAN}30;border-radius:16px;padding:20px 22px;position:relative;overflow:hidden}
    .card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${CYAN}55,transparent)}
    .card-purple{border-color:${PURPLE}30}
    .card-purple::before{background:linear-gradient(90deg,transparent,${PURPLE}55,transparent)}
    .sec-head{display:flex;align-items:center;gap:10px;margin-bottom:14px}
    .sec-bar{width:3px;height:18px;border-radius:2px;background:linear-gradient(180deg,${CYAN},${PURPLE});box-shadow:0 0 8px ${CYAN}}
    .sec-bar-p{background:linear-gradient(180deg,${PURPLE},${CYAN});box-shadow:0 0 8px ${PURPLE}}
    .sec-head h2{font-size:20px;font-weight:700;color:white;margin:0;letter-spacing:0.5px}
    .skill-row{margin-bottom:12px}
    .skill-meta{display:flex;justify-content:space-between;font-size:12px;color:rgba(255,255,255,0.85);font-weight:500;margin-bottom:5px}
    .skill-meta span+span{color:${CYAN};font-size:11px}
    .skill-track{height:4px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden}
    .skill-fill{height:100%;background:linear-gradient(90deg,${CYAN},${PURPLE});border-radius:2px;box-shadow:0 0 8px ${CYAN}66}
    .edu-item{margin-bottom:14px;padding-left:12px;border-left:2px solid ${PURPLE}55}
    .edu-item strong{font-size:12px;font-weight:700;color:white;font-family:'Orbitron',sans-serif}
    .edu-item .inst{font-size:12px;color:${PURPLE};margin:3px 0;font-weight:500}
    .edu-item small{font-size:11px;color:rgba(255,255,255,0.4)}
    .right-col{display:flex;flex-direction:column;gap:24px}
    .exp-card{background:rgba(8,12,32,0.82);border:1px solid ${CYAN}30;border-radius:16px;padding:20px 22px;margin-bottom:14px;position:relative;overflow:hidden}
    .exp-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${CYAN}55,transparent)}
    .exp-row{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}
    .exp-role{font-size:13px;font-weight:700;color:white;font-family:'Orbitron',sans-serif}
    .exp-comp{font-size:12px;color:${CYAN};margin-top:3px;font-weight:500}
    .exp-date{font-size:11px;color:rgba(255,255,255,0.4);white-space:nowrap;padding:2px 10px;background:${CYAN}0d;border-radius:20px;border:1px solid ${CYAN}20}
    .exp-desc{font-size:12px;color:rgba(255,255,255,0.55);margin-top:10px;line-height:1.7}
    .proj-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .proj-card{background:rgba(8,12,32,0.82);border:1px solid ${PURPLE}30;border-radius:16px;padding:20px 22px;position:relative;overflow:hidden}
    .proj-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${PURPLE}55,transparent)}
    .proj-name{font-size:11px;font-weight:700;color:white;font-family:'Orbitron',sans-serif;margin-bottom:4px}
    .proj-links{display:flex;gap:8px;margin-bottom:6px}
    .proj-links a:first-child{color:${CYAN}}
    .proj-links a:last-child{color:${PURPLE}}
    .proj-links a{font-size:11px}
    .proj-desc{font-size:11px;color:rgba(255,255,255,0.5);line-height:1.6}
    .tags{display:flex;flex-wrap:wrap;gap:4px;margin-top:8px}
    .tag{font-size:10px;padding:2px 8px;border-radius:20px;background:${PURPLE}18;color:${PURPLE};border:1px solid ${PURPLE}35;font-weight:600}
    .footer{position:relative;z-index:1;text-align:center;padding:36px 60px 44px;border-top:1px solid rgba(0,212,255,0.1);background:rgba(0,0,0,0.3)}
    .footer h2{font-size:36px;font-weight:900;background:linear-gradient(135deg,${CYAN},${PURPLE});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
    .footer-line{width:200px;height:1px;margin:0 auto;background:linear-gradient(90deg,transparent,${CYAN},${PURPLE},transparent);box-shadow:0 0 12px ${CYAN}66}
    .footer-sub{font-size:12px;color:rgba(255,255,255,0.25);margin-top:14px;letter-spacing:1px}
    @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
  </style>
</head>
<body>
  <div class="hero">
    <div class="avatar">${d?.profileImage ? `<img src="${d.profileImage}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">` : (d?.name||'U')[0].toUpperCase()}</div>
    <div>
      <div class="badge"><span class="dot"></span>System Online</div>
      <h1 class="name">${d?.name||'Your Name'}</h1>
      ${d?.title?`<p class="title-sub">${d.title}</p>`:''}
      <div class="contacts">
        ${d?.email?`<span>✉ ${d.email}</span>`:''}
        ${d?.phone?`<span>📞 ${d.phone}</span>`:''}
        ${d?.location?`<span>📍 ${d.location}</span>`:''}
        ${d?.website?`<a href="${d.website}">🌐 ${d.website}</a>`:''}
        ${d?.linkedin?`<a href="${d.linkedin}">LinkedIn</a>`:''}
      </div>
    </div>
  </div>
  ${d?.bio?`<div class="bio-strip"><p>${d.bio}</p></div>`:''}
  <div class="body">
    <div class="col">
      ${skills?.length?`<div class="card"><div class="sec-head"><div class="sec-bar"></div><h2>Skills</h2></div>${skills.map(s=>`<div class="skill-row"><div class="skill-meta"><span>${s.image?`<img src="${s.image}" style="width:16px;height:16px;object-fit:cover;border-radius:3px;vertical-align:middle;margin-right:5px">`:''}${s.name}</span><span>${s.level}</span></div><div class="skill-track"><div class="skill-fill" style="width:${lvl[s.level]||'50%'}"></div></div></div>`).join('')}</div>`:''}
      ${education?.length?`<div class="card card-purple"><div class="sec-head"><div class="sec-bar sec-bar-p"></div><h2>Education</h2></div>${education.map(e=>`<div class="edu-item"><strong>${e.degree}${e.field?` in ${e.field}`:''}</strong><div class="inst">${e.institution}</div><small>${e.from||''}${e.to?` — ${e.to}`:''}${e.grade?` · ${e.grade}`:''}</small></div>`).join('')}</div>`:''}
    </div>
    <div class="right-col">
      ${experience?.length?`<div><div class="sec-head"><div class="sec-bar"></div><h2>Experience</h2></div>${experience.map(e=>`<div class="exp-card"><div class="exp-row"><div><div class="exp-role">${e.role}</div><div class="exp-comp">${e.company}${e.location?` · ${e.location}`:''}</div></div><div class="exp-date">${e.from||''}${e.to?` – ${e.current?'Present':e.to}`:''}</div></div>${e.description?`<p class="exp-desc">${e.description}</p>`:''}</div>`).join('')}</div>`:''}
      ${projects?.length?`<div><div class="sec-head"><div class="sec-bar sec-bar-p"></div><h2>Projects</h2></div><div class="proj-grid">${projects.map(proj=>`<div class="proj-card"><div class="proj-name">${proj.name}</div><div class="proj-links">${proj.link?`<a href="${proj.link}">Live ↗</a>`:''}${proj.github?`<a href="${proj.github}">GitHub ↗</a>`:''}</div>${proj.description?`<p class="proj-desc">${proj.description}</p>`:''}${proj.tech?`<div class="tags">${proj.tech.split(',').map(t=>`<span class="tag">${t.trim()}</span>`).join('')}</div>`:''}</div>`).join('')}</div></div>`:''}
    </div>
  </div>
  ${certifications?.length?`<div style="position:relative;z-index:1;padding:0 40px 30px;max-width:1100px;margin:0 auto"><div class="sec-head"><div class="sec-bar"></div><h2>Certifications</h2></div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px">${certifications.map(cert=>`<div class="card" style="display:flex;gap:12px;align-items:flex-start">${cert.image?`<img src="${cert.image}" style="width:48px;height:48px;object-fit:cover;border-radius:8px;flex-shrink:0">`:''}<div><div class="exp-role">${cert.name}</div>${cert.issuer?`<div class="exp-comp">${cert.issuer}</div>`:''}${cert.date?`<div style="font-size:11px;color:rgba(255,255,255,0.4)">${cert.date}</div>`:''}${cert.url?`<a href="${cert.url}" style="font-size:11px;color:#00d4ff">View ↗</a>`:''}</div></div>`).join('')}</div></div>`:''}
  ${publications?.length?`<div style="position:relative;z-index:1;padding:0 40px 30px;max-width:1100px;margin:0 auto"><div class="sec-head"><div class="sec-bar"></div><h2>Publications</h2></div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px">${publications.map(pub=>`<div class="card" style="display:flex;gap:12px;align-items:flex-start">${pub.image?`<img src="${pub.image}" style="width:48px;height:48px;object-fit:cover;border-radius:8px;flex-shrink:0">`:''}<div><div class="exp-role">${pub.title}</div>${pub.publisher?`<div class="exp-comp">${pub.publisher}</div>`:''}${pub.date?`<div style="font-size:11px;color:rgba(255,255,255,0.4)">${pub.date}</div>`:''}${pub.url?`<a href="${pub.url}" style="font-size:11px;color:#00d4ff">Read ↗</a>`:''}</div></div>`).join('')}</div></div>`:''}
  ${awards?.length?`<div style="position:relative;z-index:1;padding:0 40px 30px;max-width:1100px;margin:0 auto"><div class="sec-head"><div class="sec-bar"></div><h2>Awards</h2></div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px">${awards.map(award=>`<div class="card" style="display:flex;gap:12px;align-items:flex-start">${award.image?`<img src="${award.image}" style="width:48px;height:48px;object-fit:cover;border-radius:8px;flex-shrink:0">`:''}<div><div class="exp-role">${award.title}</div>${award.organization?`<div class="exp-comp">${award.organization}</div>`:''}${award.date?`<div style="font-size:11px;color:rgba(255,255,255,0.4)">${award.date}</div>`:''}${award.description?`<p class="exp-desc">${award.description}</p>`:''}</div></div>`).join('')}</div></div>`:''}
  <div class="footer"><h2>Thank You</h2><div class="footer-line"></div><p class="footer-sub">SYSTEM END · ${d?.name||''}</p></div>
</body>
</html>`
}

function generateBrownCreamHTML(portfolio) {
  const { details: d, skills, education, experience, projects, certifications = [], publications = [], awards = [] } = portfolio
  const BR='#3D2B1F', BM='#7B5B3A', BL='#A67C52', CREAM='#FAF7F2', BEIGE='#E8D5C0'
  const lvl = { Beginner:'35%', Intermediate:'65%', Expert:'90%' }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${d?.name||'Portfolio'}</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Segoe UI',Georgia,system-ui,sans-serif;background:${CREAM};color:${BR};min-height:100vh}
    a{color:${BM};text-decoration:none}
    .hero{position:relative;overflow:hidden;padding:52px 64px 44px}
    .hero-inner{display:flex;align-items:center;gap:32px;max-width:960px;margin:0 auto}
    .avatar-ring{width:170px;height:170px;border-radius:50%;border:8px solid ${BM};display:flex;align-items:center;justify-content:center;flex-shrink:0;background:${BEIGE};box-shadow:0 6px 30px rgba(123,91,58,0.2)}
    .avatar{width:96px;height:96px;border-radius:50%;border:5px solid ${BM};background:${BEIGE};display:flex;align-items:center;justify-content:center;font-size:38px;font-weight:900;color:${BR}}
    h1{font-size:46px;font-weight:900;color:${BR};margin:0;line-height:1.05}
    .badge{display:inline-block;margin-top:10px;background:${BM};color:#fff;border-radius:30px;padding:6px 22px;font-size:15px;font-weight:600}
    .bio{margin-top:14px;font-size:14px;color:#5a4030;line-height:1.75;max-width:480px}
    .contacts{display:flex;flex-wrap:wrap;gap:4px 20px;margin-top:12px;font-size:13px;color:${BL}}
    .deco{position:absolute;border-radius:50%}
    .divider{height:3px;background:linear-gradient(90deg,${BM},${BEIGE},${BM});opacity:0.4}
    .body{max-width:960px;margin:0 auto;padding:40px 64px;display:grid;grid-template-columns:1fr 1.6fr;gap:40px}
    .sec-badge{display:inline-block;background:${BM};color:#fff;border-radius:30px;padding:6px 22px;font-size:15px;font-weight:700;margin-bottom:16px;letter-spacing:0.3px}
    .section{margin-bottom:28px}
    .skill-row{margin-bottom:14px}
    .skill-meta{display:flex;justify-content:space-between;margin-bottom:5px;font-size:13px;color:${BR}}
    .skill-meta small{color:${BL};font-style:italic}
    .skill-track{height:7px;background:${BEIGE};border-radius:4px}
    .skill-fill{height:100%;background:linear-gradient(90deg,${BM},${BL});border-radius:4px}
    .edu-item{margin-bottom:16px;padding-left:14px;border-left:4px solid ${BM}}
    .edu-item strong{font-weight:800;font-size:14px;color:${BR}}
    .edu-item .inst{font-size:13px;color:${BM};margin-top:3px;font-weight:600}
    .edu-item small{font-size:12px;color:${BL}}
    .exp-card,.proj-card{padding:16px 18px;background:#fff;border-radius:14px;border:1.5px solid ${BEIGE};box-shadow:0 2px 10px rgba(123,91,58,0.08);margin-bottom:12px}
    .exp-card .row{display:flex;justify-content:space-between;flex-wrap:wrap;gap:6px}
    .exp-card strong{font-weight:800;font-size:15px;color:${BR}}
    .exp-card .comp{font-size:13px;color:${BM};margin-top:2px;font-weight:600}
    .exp-card .date{font-size:12px;color:${BL};white-space:nowrap}
    .exp-card p{font-size:13px;color:#5a4030;margin-top:8px;line-height:1.65}
    .proj-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
    .proj-card strong{font-size:14px;font-weight:800;color:${BR}}
    .proj-links{display:flex;gap:8px;margin-top:4px}
    .proj-links a{font-size:11px;color:${BM}}
    .proj-card p{font-size:12px;color:#5a4030;margin-top:6px;line-height:1.55}
    .tags{display:flex;flex-wrap:wrap;gap:4px;margin-top:8px}
    .tag{font-size:10px;padding:2px 8px;border-radius:20px;background:${BEIGE};color:${BM};border:1px solid ${BL}55;font-weight:600}
    .footer{position:relative;overflow:hidden;text-align:center;padding:44px 60px 52px;background:${CREAM};border-top:2px solid ${BEIGE}}
    .footer h2{font-size:40px;font-weight:900;color:${BR};margin:0}
    .footer p{font-size:18px;color:${BM};margin-top:8px;font-style:italic}
    .footer .contacts{justify-content:center;margin-top:20px;font-size:14px}
    @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
  </style>
</head>
<body>
  <div class="hero">
    <div class="deco" style="width:52px;height:52px;background:${BEIGE};top:18px;right:200px"></div>
    <div class="deco" style="width:72px;height:72px;background:${BEIGE};bottom:-20px;left:340px"></div>
    <div class="deco" style="width:110px;height:110px;background:${BM};bottom:-55px;right:-30px;opacity:0.7"></div>
    <div class="hero-inner">
      <div class="avatar-ring">
        ${d?.profileImage ? `<img src="${d.profileImage}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">` : `<div class="avatar">${(d?.name||'U')[0].toUpperCase()}</div>`}
      </div>
      <div>
        <h1>${d?.name||'Your Name'}</h1>
        ${d?.title?`<div class="badge">${d.title}</div>`:''}
        ${d?.bio?`<p class="bio">${d.bio}</p>`:''}
        <div class="contacts">
          ${d?.email?`<span>✉ ${d.email}</span>`:''}
          ${d?.phone?`<span>📞 ${d.phone}</span>`:''}
          ${d?.location?`<span>📍 ${d.location}</span>`:''}
          ${d?.website?`<a href="${d.website}">🌐 ${d.website}</a>`:''}
        </div>
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <div class="body">
    <div>
      ${skills?.length?`<div class="section"><div class="sec-badge">Skills &amp; Expertise</div>${skills.map(s=>`<div class="skill-row"><div class="skill-meta"><span>${s.name}</span><small>${s.level}</small></div><div class="skill-track"><div class="skill-fill" style="width:${lvl[s.level]||'50%'}"></div></div></div>`).join('')}</div>`:''}
      ${education?.length?`<div class="section"><div class="sec-badge">Education</div>${education.map(e=>`<div class="edu-item"><strong>${e.degree}${e.field?` in ${e.field}`:''}</strong><div class="inst">${e.institution}</div><small>${e.from||''}${e.to?` — ${e.to}`:''}${e.grade?` · ${e.grade}`:''}</small></div>`).join('')}</div>`:''}
    </div>
    <div>
      ${experience?.length?`<div class="section"><div class="sec-badge">Experience</div>${experience.map(e=>`<div class="exp-card"><div class="row"><div><strong>${e.role}</strong><div class="comp">${e.company}${e.location?` · ${e.location}`:''}</div></div><span class="date">${e.from||''}${e.to?` – ${e.current?'Present':e.to}`:''}</span></div>${e.description?`<p>${e.description}</p>`:''}</div>`).join('')}</div>`:''}
      ${projects?.length?`<div class="section"><div class="sec-badge">Projects</div><div class="proj-grid">${projects.map(proj=>`<div class="proj-card"><strong>${proj.name}</strong><div class="proj-links">${proj.link?`<a href="${proj.link}">Live ↗</a>`:''}${proj.github?`<a href="${proj.github}">GitHub ↗</a>`:''}</div>${proj.description?`<p>${proj.description}</p>`:''}${proj.tech?`<div class="tags">${proj.tech.split(',').map(t=>`<span class="tag">${t.trim()}</span>`).join('')}</div>`:''}</div>`).join('')}</div></div>`:''}
    </div>
  </div>
  ${certifications?.length?`<div style="max-width:960px;margin:0 auto;padding:20px 64px"><div class="sec-badge">Certifications</div><div style="display:flex;flex-direction:column;gap:10px;margin-top:10px">${certifications.map(cert=>`<div class="exp-card" style="display:flex;gap:12px;align-items:flex-start">${cert.image?`<img src="${cert.image}" style="width:48px;height:48px;object-fit:cover;border-radius:8px;flex-shrink:0">`:''}<div><strong>${cert.name}</strong>${cert.issuer?`<div class="comp">${cert.issuer}</div>`:''}${cert.date?`<small>${cert.date}</small>`:''}${cert.url?`<br><a href="${cert.url}" style="font-size:11px;color:${BM}">View ↗</a>`:''}</div></div>`).join('')}</div></div>`:''}
  ${publications?.length?`<div style="max-width:960px;margin:0 auto;padding:20px 64px"><div class="sec-badge">Publications</div><div style="display:flex;flex-direction:column;gap:10px;margin-top:10px">${publications.map(pub=>`<div class="exp-card" style="display:flex;gap:12px;align-items:flex-start">${pub.image?`<img src="${pub.image}" style="width:48px;height:48px;object-fit:cover;border-radius:8px;flex-shrink:0">`:''}<div><strong>${pub.title}</strong>${pub.publisher?`<div class="comp">${pub.publisher}</div>`:''}${pub.date?`<small>${pub.date}</small>`:''}${pub.url?`<br><a href="${pub.url}" style="font-size:11px;color:${BM}">Read ↗</a>`:''}</div></div>`).join('')}</div></div>`:''}
  ${awards?.length?`<div style="max-width:960px;margin:0 auto;padding:20px 64px"><div class="sec-badge">Awards</div><div style="display:flex;flex-direction:column;gap:10px;margin-top:10px">${awards.map(award=>`<div class="exp-card" style="display:flex;gap:12px;align-items:flex-start">${award.image?`<img src="${award.image}" style="width:48px;height:48px;object-fit:cover;border-radius:8px;flex-shrink:0">`:''}<div><strong>${award.title}</strong>${award.organization?`<div class="comp">${award.organization}</div>`:''}${award.date?`<small>${award.date}</small>`:''}${award.description?`<p>${award.description}</p>`:''}</div></div>`).join('')}</div></div>`:''}
  <div class="footer">
    <div class="deco" style="width:80px;height:80px;background:${BEIGE};top:-20px;left:-20px;opacity:0.6"></div>
    <div class="deco" style="width:110px;height:110px;background:${BM};bottom:-40px;right:-30px;opacity:0.25"></div>
    <h2>Thank you for visiting,</h2>
    <p>and I hope you find inspiration in my work!</p>
    <div class="contacts">
      ${d?.email?`<span>✉ ${d.email}</span>`:''}
      ${d?.phone?`<span>📞 ${d.phone}</span>`:''}
      ${d?.location?`<span>📍 ${d.location}</span>`:''}
    </div>
  </div>
</body>
</html>`
}

function generateHTML(portfolio, templateId) {
  if (templateId === 'browncream')  return generateBrownCreamHTML(portfolio)
  if (templateId === 'purple')     return generatePurpleHTML(portfolio)
  if (templateId === 'futuristic') return generateFuturisticHTML(portfolio)
  if (templateId === 'grayscale')  return generateGrayscaleHTML(portfolio)

  // fallback generic dark
  const accent = '#22d3ee'
  const bg     = '#060d1a'
  const { details: d, skills, education, experience, projects, certifications = [], publications = [], awards = [] } = portfolio

  const skillBar = (level) => ({ Beginner:'35%', Intermediate:'65%', Expert:'90%' }[level] || '50%')

  const skillsHTML = skills.length ? `
    <section><h2 class="sec-title">Skills</h2>
    ${skills.map(s => `
      <div class="skill-row">
        <div class="skill-meta"><span>${s.name}</span><small>${s.level}</small></div>
        <div class="skill-track"><div class="skill-fill" style="width:${skillBar(s.level)}"></div></div>
      </div>`).join('')}
    </section>` : ''

  const eduHTML = education.length ? `
    <section><h2 class="sec-title">Education</h2>
    ${education.map(e => `
      <div class="item">
        <strong>${e.degree}${e.field ? ` in ${e.field}` : ''}</strong>
        <div class="item-sub">${e.institution}</div>
        <small>${e.from || ''}${e.to ? ` — ${e.to}` : ''}${e.grade ? ` · ${e.grade}` : ''}</small>
      </div>`).join('')}
    </section>` : ''

  const expHTML = experience.length ? `
    <section><h2 class="sec-title">Experience</h2>
    ${experience.map(e => `
      <div class="card">
        <div class="card-head">
          <div><strong>${e.role}</strong><div class="card-sub">${e.company}${e.location ? ` · ${e.location}` : ''}</div></div>
          <small>${e.from || ''}${e.to ? ` – ${e.current ? 'Present' : e.to}` : ''}</small>
        </div>
        ${e.description ? `<p class="card-desc">${e.description}</p>` : ''}
      </div>`).join('')}
    </section>` : ''

  const projHTML = projects.length ? `
    <section><h2 class="sec-title">Projects</h2>
    ${projects.map(proj => `
      <div class="card">
        <div class="card-head">
          <strong>${proj.name}</strong>
          <div>${proj.link ? `<a href="${proj.link}" target="_blank">Live ↗</a>` : ''}${proj.github ? ` <a href="${proj.github}" target="_blank">GitHub ↗</a>` : ''}</div>
        </div>
        ${proj.description ? `<p class="card-desc">${proj.description}</p>` : ''}
        ${proj.tech ? `<div class="tags">${proj.tech.split(',').map(t=>`<span class="tag">${t.trim()}</span>`).join('')}</div>` : ''}
      </div>`).join('')}
    </section>` : ''

  const certHTML = certifications.length ? `
    <section><h2 class="sec-title">Certifications</h2>
    ${certifications.map(cert => `
      <div class="card" style="display:flex;gap:12px;align-items:flex-start">
        ${cert.image ? `<img src="${cert.image}" style="width:48px;height:48px;object-fit:cover;border-radius:8px;flex-shrink:0">` : ''}
        <div>
          <strong style="color:white;display:block">${cert.name}</strong>
          ${cert.issuer ? `<div class="card-sub">${cert.issuer}</div>` : ''}
          ${cert.date ? `<small style="color:#64748b">${cert.date}</small>` : ''}
          ${cert.url ? `<div><a href="${cert.url}" target="_blank">View ↗</a></div>` : ''}
        </div>
      </div>`).join('')}
    </section>` : ''

  const pubHTML = publications.length ? `
    <section><h2 class="sec-title">Publications</h2>
    ${publications.map(pub => `
      <div class="card" style="display:flex;gap:12px;align-items:flex-start">
        ${pub.image ? `<img src="${pub.image}" style="width:48px;height:48px;object-fit:cover;border-radius:8px;flex-shrink:0">` : ''}
        <div>
          <strong style="color:white;display:block">${pub.title}</strong>
          ${pub.publisher ? `<div class="card-sub">${pub.publisher}</div>` : ''}
          ${pub.date ? `<small style="color:#64748b">${pub.date}</small>` : ''}
          ${pub.url ? `<div><a href="${pub.url}" target="_blank">Read ↗</a></div>` : ''}
        </div>
      </div>`).join('')}
    </section>` : ''

  const awardsHTML = awards.length ? `
    <section><h2 class="sec-title">Awards</h2>
    ${awards.map(award => `
      <div class="card" style="display:flex;gap:12px;align-items:flex-start">
        ${award.image ? `<img src="${award.image}" style="width:48px;height:48px;object-fit:cover;border-radius:8px;flex-shrink:0">` : ''}
        <div>
          <strong style="color:white;display:block">${award.title}</strong>
          ${award.organization ? `<div class="card-sub">${award.organization}</div>` : ''}
          ${award.date ? `<small style="color:#64748b">${award.date}</small>` : ''}
          ${award.description ? `<p class="card-desc">${award.description}</p>` : ''}
        </div>
      </div>`).join('')}
    </section>` : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${d.name || 'Portfolio'}</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Segoe UI',system-ui,sans-serif;background:${bg};color:${templateId==='light'?'#1e293b':'#e2e8f0'};min-height:100vh}
    a{color:${accent};text-decoration:none}
    header{background:${templateId==='light'?`linear-gradient(135deg,#0ea5e9,#0284c7)`:`linear-gradient(135deg,${bg},${bg}ee)`};padding:50px 60px;border-bottom:1px solid ${accent}25}
    .avatar{width:88px;height:88px;border-radius:50%;background:linear-gradient(135deg,${accent},#6366f1);display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:800;color:white;flex-shrink:0;border:3px solid ${accent}40;box-shadow:0 0 20px ${accent}40}
    .header-inner{max-width:900px;margin:0 auto;display:flex;align-items:center;gap:28px}
    h1{font-size:38px;font-weight:800;color:${templateId==='light'?'white':'white'};line-height:1.1}
    .title{font-size:17px;color:${accent};margin-top:6px;font-weight:600}
    .bio{font-size:14px;color:${templateId==='light'?'rgba(255,255,255,0.85)':'#94a3b8'};margin-top:10px;line-height:1.7}
    .contacts{display:flex;flex-wrap:wrap;gap:6px 20px;margin-top:12px;font-size:13px;color:${templateId==='light'?'rgba(255,255,255,0.8)':'#94a3b8'}}
    main{max-width:900px;margin:0 auto;padding:40px 60px;display:grid;grid-template-columns:1fr 1.6fr;gap:40px}
    .sec-title{font-size:13px;font-weight:800;color:${accent};text-transform:uppercase;letter-spacing:2px;margin-bottom:14px;padding-bottom:8px;border-bottom:1px solid ${accent}25}
    section{margin-bottom:28px}
    .skill-row{margin-bottom:10px}
    .skill-meta{display:flex;justify-content:space-between;margin-bottom:4px;font-size:13px}
    .skill-track{height:5px;background:${accent}15;border-radius:4px}
    .skill-fill{height:100%;background:linear-gradient(90deg,${accent},${accent}99);border-radius:4px}
    .item{margin-bottom:14px;padding-left:10px;border-left:2px solid ${accent}40}
    .item strong{font-size:14px;color:white;display:block}
    .item-sub{font-size:13px;color:${accent};margin-top:2px}
    .item small{font-size:12px;color:#64748b}
    .card{background:${accent}08;border:1px solid ${accent}18;border-radius:10px;padding:14px 16px;margin-bottom:14px}
    .card-head{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}
    .card-head strong{font-size:15px;color:white;display:block}
    .card-sub{font-size:13px;color:${accent};margin-top:2px}
    .card-head small{font-size:12px;color:#64748b;white-space:nowrap;margin-top:3px}
    .card-desc{font-size:13px;color:#94a3b8;margin-top:8px;line-height:1.6}
    .tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}
    .tag{font-size:11px;padding:3px 8px;border-radius:6px;background:${accent}15;color:${accent};border:1px solid ${accent}25}
    @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
  </style>
</head>
<body>
  <header>
    <h1>${d.name || 'Your Name'}</h1>
    ${d.title ? `<div class="title">${d.title}</div>` : ''}
    ${d.bio ? `<p class="bio">${d.bio}</p>` : ''}
    <div class="contacts">
      ${d.email ? `<span>✉ ${d.email}</span>` : ''}
      ${d.phone ? `<span>📞 ${d.phone}</span>` : ''}
      ${d.location ? `<span>📍 ${d.location}</span>` : ''}
      ${d.website ? `<a href="${d.website}">🌐 Website</a>` : ''}
      ${d.linkedin ? `<a href="${d.linkedin}">LinkedIn</a>` : ''}
    </div>
  </header>
  <main style="gap:40px">
    <div class="col-left">${skillsHTML}${eduHTML}</div>
    <div class="col-right">${expHTML}${projHTML}</div>
  </main>
  <div style="max-width:1000px;margin:0 auto 40px;padding:0 40px">
    ${certHTML}${pubHTML}${awardsHTML}
  </div>
</body>
</html>`
}

const DEMO_PORTFOLIO = {
  details: { name: 'Jane Smith', title: 'Full Stack Developer', bio: 'Passionate developer with 5 years of experience building scalable web apps. I love turning ideas into clean, efficient code that makes a real impact.', email: 'jane@example.com', phone: '+1 234 567 890', location: 'San Francisco, CA', website: '', linkedin: '' },
  skills: [{ name: 'React', level: 'Expert' }, { name: 'Node.js', level: 'Intermediate' }, { name: 'Python', level: 'Intermediate' }, { name: 'MongoDB', level: 'Beginner' }],
  education: [{ degree: 'B.Sc.', field: 'Computer Science', institution: 'University of California', from: '2016', to: '2020', grade: '3.8 GPA' }],
  experience: [{ role: 'Frontend Developer', company: 'Acme Corp', location: 'San Francisco', from: 'Jan 2021', to: 'Present', current: true, description: 'Built responsive UIs with React and improved performance by 40%. Led a team of 3 developers on key product features.' }],
  projects: [{ name: 'Portfolio Builder', description: 'AI-powered portfolio creation tool with multiple templates and PDF export.', tech: 'React, Node.js, MongoDB', link: '', github: '' }, { name: 'Task Manager', description: 'Full-stack task management app with real-time collaboration features.', tech: 'Vue.js, Firebase', link: '', github: '' }],
  certifications: [
    { name: 'Google Workspace Professional', issuer: 'Google', date: '2023', url: '', image: '' },
    { name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', date: '2022', url: '', image: '' }
  ],
  publications: [
    { title: 'The Future of Web Development', publisher: 'Tech Journal', date: '2024', url: '' },
    { title: 'Designing for Accessibility', publisher: 'Medium', date: '2023', url: '' }
  ],
  awards: [
    { title: 'Best Portfolio 2024', organization: 'Design Awards', date: '2024', description: 'Awarded for exceptional design and user experience in personal branding.' },
    { title: 'Innovation Lead', organization: 'Acme Corp', date: '2022', description: 'Recognized for leading the most innovative project of the year.' }
  ],
}

export default function CraftPreview() {
  const navigate = useNavigate()
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const isFullScreen = query.get('full') === 'true'
  
  const [scale] = useState(0.7)
  const [mobile, setMobile] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTemplate, setActiveTemplate] = useState(location.state?.previewTemplate || null)
  const [bgGenerating, setBgGenerating] = useState(false)
  const [bgError, setBgError] = useState(null)
  const [bgCategory, setBgCategory] = useState('IT & Software')
  const [bgMeta, setBgMeta] = useState(null)
  const [profileGenerating, setProfileGenerating] = useState(false)
  const [profileError, setProfileError] = useState(null)
  const [publishing, setPublishing] = useState(false)
  const [publishModal, setPublishModal] = useState(false)
  const [slug, setSlug] = useState('')
  const [publishStatus, setPublishStatus] = useState({ type: '', msg: '', url: '' })

  const rawPortfolio = (() => {
    try { return JSON.parse(sessionStorage.getItem('craft_portfolio') || 'null') } catch { return null }
  })()

  // Ensure portfolio always has the minimum required structure to prevent template crashes
  const safeRaw = rawPortfolio || DEMO_PORTFOLIO
  
  const portfolio = {
    ...safeRaw,
    details: safeRaw.details || {},
    skills: safeRaw.skills || [],
    education: safeRaw.education || [],
    experience: safeRaw.experience || [],
    projects: safeRaw.projects || [],
    certifications: safeRaw.certifications || [],
    publications: safeRaw.publications || [],
    awards: safeRaw.awards || [],
    template: activeTemplate || safeRaw.template || 'purple'
  }

  const templateId = activeTemplate || portfolio.template || 'purple'
  const tmpl = TEMPLATE_MAP[templateId] || TEMPLATE_MAP.browncream || TEMPLATE_MAP.purple
  const TemplateComp = tmpl.component

  const handleDownload = async () => {
    const html = generateHTML(portfolio, templateId)
    const iframe = document.createElement('iframe')
    iframe.style.visibility = 'hidden'
    iframe.style.position = 'absolute'
    iframe.style.width = '1000px'
    iframe.style.height = '100%vh'
    document.body.appendChild(iframe)
    iframe.contentDocument.write(html)
    iframe.contentDocument.close()
    
    // wait for styles/images to load
    await new Promise(r => setTimeout(r, 800))
    
    try {
      iframe.contentWindow.focus()
      iframe.contentWindow.print()
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 3000)
    } catch (e) {
      console.error(e)
    } finally {
      setTimeout(() => document.body.removeChild(iframe), 2000)
    }
  }

  const handleSaveToPortfolios = async () => {
    try {
      setSaved(false)
      let token = localStorage.getItem('token')
      if (!token) {
        token = 'guest_' + Math.random().toString(36).substring(2, 10);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ name: 'Guest User', email: 'guest@portfoliomaker.com' }));
      }

      const payload = {
        title: portfolio.details?.name || 'My Portfolio',
        template: templateId,
        data: portfolio,
      }

      const portfolioId = portfolio._id || rawPortfolio?._id

      let res;
      if (portfolioId) {
        res = await api.put(`/api/portfolios/${portfolioId}`, payload)
      } else {
        res = await api.post('/api/portfolios', payload)
      }

      const savedData = res.data

      // Update sessionStorage so subsequent actions use the cloud ID
      const updatedLocal = { ...portfolio, _id: savedData._id }
      sessionStorage.setItem('craft_portfolio', JSON.stringify(updatedLocal))

      // Also keep a local backup for legacy reasons
      const existing = JSON.parse(localStorage.getItem('my_portfolios') || '[]')
      const filtered = existing.filter(p => (p._id || p.id) !== savedData._id)
      const record = { ...portfolio, _id: savedData._id, id: savedData._id, template: templateId, savedAt: new Date().toISOString(), status: savedData.status || 'draft' }
      filtered.unshift(record)
      localStorage.setItem('my_portfolios', JSON.stringify(filtered))

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      return savedData._id
    } catch (err) {
      alert('Error saving portfolio: ' + (err.response?.data?.message || err.message))
    }
  }

  const handlePublish = async () => {
    if (!slug) return alert('Please enter a URL slug')
    setPublishing(true)
    setPublishStatus({ type: '', msg: '' })
    try {
      const portfolioId = await handleSaveToPortfolios()
      if (!portfolioId) return

      const { data } = await api.post(`/api/portfolios/${portfolioId}/publish`, { slug })

      setPublishStatus({
        type: 'success',
        msg: 'Your site is live!',
        url: `${window.location.origin}/p/${slug}`
      })
    } catch (err) {
      setPublishStatus({
        type: 'error',
        msg: err.response?.data?.message || 'Failed to publish'
      })
    } finally {
      setPublishing(false)
    }
  }

  const handleGenerateProfile = async () => {
    setProfileGenerating(true)
    setProfileError(null)
    try {
      const { data } = await api.post('/api/ai/generate-profile', {
        name: portfolio.details?.name || 'Professional',
        title: portfolio.details?.title || 'Professional',
      })
      const existing = JSON.parse(sessionStorage.getItem('craft_portfolio') || '{}')
      const updated = { ...existing, details: { ...(existing.details || {}), profileImage: data.imageUrl } }
      sessionStorage.setItem('craft_portfolio', JSON.stringify(updated))
      // Force re-render
      const cur = activeTemplate
      setActiveTemplate(null)
      setTimeout(() => setActiveTemplate(cur || templateId), 10)
    } catch (err) {
      setProfileError(err.message)
    } finally {
      setProfileGenerating(false)
    }
  }

  const handleGenerateBg = async () => {
    setBgGenerating(true)
    setBgError(null)
    setBgMeta(null)
    try {
      const { data } = await api.post('/api/ai/generate-bg', { category: bgCategory })
      const existing = JSON.parse(sessionStorage.getItem('craft_portfolio') || '{}')
      sessionStorage.setItem('craft_portfolio', JSON.stringify({ ...existing, futuristic_bg: data.imageUrl }))
      if (data.meta) setBgMeta(data.meta)
      // Force re-render
      setActiveTemplate(null)
      setTimeout(() => setActiveTemplate('futuristic'), 10)
    } catch (err) {
      setBgError(err.message)
    } finally {
      setBgGenerating(false)
    }
  }

  // --- FULL SCREEN MODE ---
  if (isFullScreen) {
    return (
      <div className="min-h-screen bg-white">
        {/* Floating Close Button for convenience */}
        <button 
          onClick={() => window.close()} 
          className="fixed top-6 right-6 z-[9999] px-4 py-2 bg-black/80 text-white rounded-full flex items-center gap-2 hover:bg-black transition-all shadow-xl"
        >
          <Edit3 size={14} /> Back to Editor
        </button>
        <PreviewErrorBoundary>
          <TemplateComp p={portfolio} />
        </PreviewErrorBoundary>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#060d1a] overflow-hidden" style={{ fontFamily: 'system-ui' }}>

      {/* LEFT — Controls panel */}
      <div className="w-full lg:w-80 flex-shrink-0 flex flex-col h-[28vh] sm:h-[35vh] lg:h-full"
        style={{ background:'linear-gradient(180deg,#0d1526,#060e20)', borderRight:'1px solid rgba(34,211,238,0.1)', zIndex:100 }}>

        {/* Header */}
        <div className="p-2 sm:p-5 border-b border-cyan-500/10 flex items-center lg:block gap-3">
          <button onClick={() => navigate('/craft')}
            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-xs lg:text-sm lg:mb-4">
            <ArrowLeft size={16}/> <span className="hidden sm:inline lg:hidden">Back</span><span className="hidden lg:inline">Back to Edit</span>
          </button>
          <div className="flex-1 lg:block">
            <h2 className="text-white font-bold text-sm lg:text-lg">Preview</h2>
            <p className="hidden lg:block text-gray-400 text-xs mt-1">Review & download your portfolio</p>
          </div>
        </div>

        {/* Scrollable middle content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0">
          {/* Template switcher */}
          <div className="p-4 border-b border-cyan-500/10">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Palette size={12}/> Switch Template
          </p>
          <div className="space-y-2">
            {Object.entries(TEMPLATE_MAP).map(([id, t]) => (
              <button key={id} onClick={() => setActiveTemplate(id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left"
                style={{
                  background: templateId === id ? `${t.accent}15` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${templateId === id ? `${t.accent}40` : 'rgba(75,85,99,0.2)'}`,
                }}>
                <div className="w-6 h-6 rounded-lg flex-shrink-0" style={{ background: `linear-gradient(135deg,${t.accent},${t.accent}66)` }}/>
                <span className="text-sm font-medium" style={{ color: templateId === id ? t.accent : '#94a3b8' }}>{t.name}</span>
                {templateId === id && <Check size={14} className="ml-auto" style={{ color: t.accent }}/>}
              </button>
            ))}
          </div>
        </div>

        {/* AI Profile Photo — all templates */}
        <div className="p-4 border-b border-cyan-500/10">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <User size={12}/> AI Profile Photo
          </p>

          {portfolio.details?.profileImage && (
            <div className="mb-3 rounded-xl overflow-hidden relative" style={{ height: 76 }}>
              <img src={portfolio.details.profileImage} alt="profile"
                className="w-full h-full object-cover" style={{ borderRadius: 12 }} />
              <div className="absolute inset-0 flex items-end justify-center pb-1"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)', borderRadius: 12 }}>
                <span className="text-white text-[10px] font-medium">Current Photo</span>
              </div>
            </div>
          )}

          <button
            onClick={handleGenerateProfile}
            disabled={profileGenerating}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: profileGenerating
                ? 'rgba(34,211,238,0.05)'
                : 'linear-gradient(135deg,rgba(34,211,238,0.18),rgba(99,102,241,0.22))',
              border: '1px solid rgba(34,211,238,0.4)',
              color: profileGenerating ? '#94a3b8' : '#22d3ee',
              cursor: profileGenerating ? 'not-allowed' : 'pointer',
            }}
          >
            {profileGenerating ? (
              <><RefreshCw size={13} className="animate-spin"/> Generating (~30s)…</>
            ) : (
              <><Sparkles size={13}/> {portfolio.details?.profileImage ? 'Regenerate Photo' : 'Generate AI Photo'}</>
            )}
          </button>

          {profileError && (
            <div className="mt-2 p-2 rounded-lg text-xs text-red-400"
              style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}>
              {profileError}
            </div>
          )}
        </div>

        {/* AI Background — only for futuristic */}
        {templateId === 'futuristic' && (
          <div className="p-4 border-b border-cyan-500/10">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ImageIcon size={12}/> AI Background
            </p>

            {/* Current bg preview */}
            {portfolio.futuristic_bg && (
              <div className="mb-3 rounded-xl overflow-hidden relative" style={{ height: 76, background: '#000' }}>
                <img src={portfolio.futuristic_bg} alt="bg preview"
                  className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.35)' }}>
                  <span className="text-white text-xs font-medium opacity-80">Current Background</span>
                </div>
              </div>
            )}

            {/* Category selector */}
            <div className="mb-2">
              <label className="text-gray-500 text-xs mb-1 block">Your Category</label>
              <select
                value={bgCategory}
                onChange={e => setBgCategory(e.target.value)}
                disabled={bgGenerating}
                className="w-full text-xs rounded-lg px-2.5 py-2 outline-none"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(0,212,255,0.2)',
                  color: '#e2e8f0',
                  cursor: bgGenerating ? 'not-allowed' : 'pointer',
                }}
              >
                {['IT & Software','Design & Creative','Marketing','Finance','Healthcare',
                  'Education','Engineering','Business','Science & Research',
                  'Arts & Entertainment','Legal','Architecture','General'
                ].map(c => <option key={c} value={c} style={{ background: '#0d1526' }}>{c}</option>)}
              </select>
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerateBg}
              disabled={bgGenerating}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: bgGenerating
                  ? 'rgba(168,85,247,0.08)'
                  : 'linear-gradient(135deg,rgba(0,212,255,0.18),rgba(168,85,247,0.22))',
                border: '1px solid rgba(168,85,247,0.4)',
                color: bgGenerating ? '#94a3b8' : '#c084fc',
                cursor: bgGenerating ? 'not-allowed' : 'pointer',
              }}
            >
              {bgGenerating ? (
                <><RefreshCw size={13} className="animate-spin"/> Generating (~60s)…</>
              ) : (
                <><Sparkles size={13}/> {portfolio.futuristic_bg ? 'Regenerate BG' : 'Generate AI Background'}</>
              )}
            </button>

            {/* Meta info after generation */}
            {bgMeta && !bgGenerating && (
              <div className="mt-2 p-2 rounded-lg text-xs space-y-0.5"
                style={{ background: 'rgba(168,85,247,0.07)', border: '1px solid rgba(168,85,247,0.15)' }}>
                <p className="text-purple-300 font-medium">{bgMeta.twist}</p>
                <p className="text-gray-500">Stylize {bgMeta.stylize} · Guidance {bgMeta.guidance} · Seed {bgMeta.seed}</p>
              </div>
            )}

            {bgError && (
              <div className="mt-2 p-2 rounded-lg text-xs text-red-400"
                style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}>
                {bgError}
              </div>
            )}
          </div>
        )}


        {/* Summary */}
        <div className="p-4 flex-1 hidden lg:block">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Portfolio Summary</p>
          {[
            ['Name', portfolio.details?.name || '—'],
            ['Title', portfolio.details?.title || '—'],
            ['Skills', `${portfolio.skills?.length || 0} added`],
            ['Education', `${portfolio.education?.length || 0} entries`],
            ['Experience', `${portfolio.experience?.length || 0} entries`],
            ['Projects', `${portfolio.projects?.length || 0} added`],
            ['Certifications', `${portfolio.certifications?.length || 0} added`],
            ['Publications', `${portfolio.publications?.length || 0} added`],
            ['Awards', `${portfolio.awards?.length || 0} added`],
          ].map(([label, val]) => (
            <div key={label} className="flex justify-between py-1.5 border-b border-white/5 text-xs">
              <span className="text-gray-500">{label}</span>
              <span className="text-gray-300 font-medium truncate max-w-[120px] text-right">{val}</span>
            </div>
          ))}
        </div>

        </div>

        {/* Action buttons (Pinned to bottom) */}
        <div className="p-2 sm:p-4 border-t border-cyan-500/10 bg-[#0d1526]/90 backdrop-blur-md shrink-0">
          <p className="hidden lg:flex text-gray-400 text-[10px] font-semibold uppercase tracking-wider mb-2 items-center gap-1.5 px-1">
            Actions
          </p>

          <div className="flex flex-row lg:flex-col gap-2">
            <button onClick={() => setPublishModal(true)}
              className="flex-1 lg:w-full flex items-center justify-center gap-1.5 py-2 lg:py-3 rounded-lg lg:rounded-xl font-bold transition-all hover:scale-[1.02] shadow-lg text-[10px] sm:text-xs lg:text-sm"
              style={{ background: 'linear-gradient(135deg, #22d3ee, #0ea5e9)', color: 'white' }}>
              <Globe size={14} /> 
              <span className="lg:hidden ml-1">Publish</span>
              <span className="hidden lg:inline">Publish Site</span>
            </button>

            <button onClick={handleDownload}
              className="flex-1 lg:w-full flex items-center justify-center gap-1.5 py-2 lg:py-3 rounded-lg lg:rounded-xl font-semibold transition-all lg:mb-3 hover:scale-[1.02] text-[10px] sm:text-xs lg:text-sm"
              style={{ background: downloaded ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.08)', border: `1px solid ${downloaded ? '#22d3ee' : 'rgba(255,255,255,0.15)'}`, color: downloaded ? '#22d3ee' : 'white' }}>
              {downloaded ? <Check size={14}/> : <Download size={14}/>} 
              <span className="lg:hidden ml-1">PDF</span>
              <span className="hidden lg:inline">{downloaded ? 'Generated' : 'Download PDF'}</span>
            </button>

            <button onClick={handleSaveToPortfolios}
              className="flex-1 lg:w-full flex items-center justify-center gap-1.5 py-2 lg:py-3 rounded-lg lg:rounded-xl transition-all text-[10px] sm:text-xs lg:text-sm"
              style={{ background: saved ? 'rgba(34,211,238,0.1)' : 'rgba(255,255,255,0.03)', border: `1px solid ${saved ? '#22d3ee' : 'rgba(255,255,255,0.08)'}`, color: saved ? '#22d3ee' : '#94a3b8' }}>
              {saved ? <Check size={14}/> : <Save size={14}/>} 
              <span className="hidden sm:inline">Save</span>
            </button>
          </div>
        </div>

        {/* --- PUBLISH MODAL --- */}
        {publishModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-[#0d1526] border border-cyan-500/20 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white text-xl font-bold flex items-center gap-2">
                  <Globe size={20} className="text-cyan-400" /> Publish Your Portfolio
                </h3>
                <button onClick={() => setPublishModal(false)} className="text-gray-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              {!publishStatus.url ? (
                <>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    Choose a unique URL for your portfolio. Your site will be publicly accessible at this link.
                  </p>
                  <div className="mb-6">
                    <label className="text-gray-500 text-xs uppercase font-bold tracking-widest block mb-2">Custom URL Slug</label>
                    <div className="flex items-center bg-black/30 border border-white/10 rounded-xl px-4 py-3 focus-within:border-cyan-500/50 transition-all">
                      <span className="text-gray-600 text-sm select-none">.../p/</span>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))}
                        className="bg-transparent border-none outline-none text-white text-sm ml-0.5 flex-1"
                        placeholder="john-doe-2026"
                      />
                    </div>
                  </div>

                  {publishStatus.type === 'error' && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs mb-6">
                      {publishStatus.msg}
                    </div>
                  )}

                  <button
                    onClick={handlePublish}
                    disabled={publishing}
                    className="btn-primary w-full"
                  >
                    {publishing ? <Loader className="animate-spin" size={18} /> : <Sparkles size={18} />}
                    {publishing ? 'Publishing Site...' : 'Confirm & Go Live'}
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={32} className="text-green-500" />
                  </div>
                  <h4 className="text-white text-2xl font-black mb-2 tracking-tight">Your site is live!</h4>
                  <p className="text-gray-400 text-sm mb-6">Congratulations! Anyone can now view your portfolio using the link below.</p>
                  
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between gap-3 mb-8">
                    <span className="text-cyan-400 text-xs truncate font-mono">{publishStatus.url}</span>
                    <button onClick={() => window.open(publishStatus.url, '_blank')} className="p-2 bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-400 rounded-lg transition-all flex-shrink-0">
                      <ExternalLink size={14} />
                    </button>
                  </div>

                  <button onClick={() => setPublishModal(false)} className="w-full py-4 text-gray-500 hover:text-white font-medium transition-all">
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT — Preview monitor */}
      <div className="flex-1 bg-[#040812] relative overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between bg-[#060d1a]/50 backdrop-blur-md z-20 min-h-[44px]">
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center bg-white/5 rounded-lg p-1 border border-white/10">
              <button onClick={() => setMobile(false)}
                className={`p-1.5 rounded-md transition-all ${!mobile ? 'bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/10' : 'text-gray-500 hover:text-gray-300'}`}>
                <Monitor size={14}/>
              </button>
              <button onClick={() => setMobile(true)}
                className={`p-1.5 rounded-md transition-all ${mobile ? 'bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/10' : 'text-gray-500 hover:text-gray-300'}`}>
                <Smartphone size={14}/>
              </button>
            </div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/> PREVIEW
            </div>
          </div>

          <div className="flex-1 max-w-[180px] lg:max-w-md mx-3 h-7 rounded-lg flex items-center px-3 text-[10px] sm:text-xs text-gray-500 bg-white/5 border border-white/10 truncate">
            🔒 {portfolio.details?.name?.toLowerCase().replace(/\s+/g,'-') || 'your-portfolio'}.portfoliomaker.com
          </div>

          <button onClick={() => window.location.reload()} className="text-gray-500 hover:text-white transition-colors p-1">
            <RefreshCw size={14}/>
          </button>
        </div>

        {/* Demo notice */}
        {!hasRealData && (
          <div className="flex items-center justify-between px-4 py-2 text-xs"
            style={{ background:'rgba(234,179,8,0.08)', border:'1px solid rgba(234,179,8,0.2)', borderTop:'none' }}>
            <span className="text-yellow-400">Demo preview — sample data shown. <button onClick={()=>navigate('/craft')} className="underline hover:text-yellow-300">Fill your details</button> to personalize.</span>
          </div>
        )}

        {/* Preview Frame */}
        <div className="flex-1 overflow-auto bg-[#040812] p-2 sm:p-8 flex justify-center items-start custom-scrollbar">
          <div
            id="portfolio-container"
            className="transition-all duration-500 origin-top shadow-[0_30px_100px_rgba(0,0,0,0.6)] portfolio-template"
            style={{
              width: mobile ? 385 : '100%',
              maxWidth: mobile ? 385 : 1000,
              minHeight: '100%',
              background: '#fff',
              transform: `scale(${window.innerWidth < 1024 ? Math.min(0.95, (window.innerWidth - 30) / (mobile ? 385 : 1000)) : scale})`,
              borderRadius: mobile ? '32px' : '0px',
              border: mobile ? '10px solid #1a1a1a' : 'none',
              overflow: 'hidden'
            }}
          >
            <PreviewErrorBoundary key={portfolio.template || templateId}>
              <TemplateComp p={portfolio} />
            </PreviewErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  )
}
