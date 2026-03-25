import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/api'
import TemplatePurple from '../templates/TemplatePurple'
import TemplateFuturistic from '../templates/TemplateFuturistic'
import TemplateMinimalist from '../templates/TemplateMinimalist'
import TemplateGrayscale from '../templates/TemplateGrayscale'
import TemplateBrownCream from '../templates/TemplateBrownCream'
import TemplateDarkBlue from '../templates/TemplateDarkBlue'
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
  browncream: TemplateBrownCream,
  grayscale: TemplateGrayscale,
  purple: TemplatePurple,
  futuristic: TemplateFuturistic,
  minimalist: TemplateMinimalist,
  darkblue: TemplateDarkBlue,
  presentationstyle: TemplatePresentationStyle,
  boldblack: TemplateBoldBlack,
  orangewhite: TemplateOrangeWhite,
  bluegradientaesthetic: TemplateBlueGradientAesthetic,
  greenbeige: TemplateGreenBeige,
  neon:        TemplateNeon,
  light:       TemplateLight,
  dark:        TemplateDark,
  classic:     TemplateClassic,
}

export default function PublishedPortfolio() {
  const { slug } = useParams()
  const [portfolio, setPortfolio] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data } = await api.get(`/api/portfolios/public/${slug}`)
        setPortfolio(data)
      } catch (err) {
        setError(err.response?.data?.message || 'Portfolio not found')
      } finally {
        setLoading(false)
      }
    }
    fetchPortfolio()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060d1a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
          <p className="text-gray-400 font-medium">Loading Portfolio...</p>
        </div>
      </div>
    )
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-[#060d1a] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#0d1526] border border-red-500/20 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-red-500 text-3xl">!</span>
          </div>
          <h2 className="text-white text-xl font-bold mb-2">Portfolio Not Found</h2>
          <p className="text-gray-400 mb-8">{error || "This portfolio doesn't exist or isn't live yet."}</p>
          <a href="/" className="text-cyan-400 hover:text-cyan-300 font-medium underline">Go back home</a>
        </div>
      </div>
    )
  }

  const TemplateComp = TEMPLATE_MAP[portfolio.template] || TemplatePurple

  // Normalize data for templates (they usually expect portfolio.details, portfolio.skills, etc.)
  // The backend stores it in portfolio.data
  const normalizedPortfolio = {
    ...portfolio.data,
    template: portfolio.template
  }

  return <TemplateComp p={normalizedPortfolio} />
}
