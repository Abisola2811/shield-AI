import { generateObject } from 'ai'
import { groq } from '@ai-sdk/groq'
import {
  analysisSchema,
  analyzeTextHeuristic,
  buildScamAnalysisPrompt,
  mergeAnalyses,
  scamAnalysisSystemPrompt,
  type AnalysisResult
} from '@/lib/scam-analysis'

type AnalysisResult = z.infer<typeof analysisSchema>

function analyzeTextHeuristic(text: string): AnalysisResult {
  const content = text.toLowerCase()
  const indicators: string[] = []

  const checks = [
    { pattern: /(urgent|immediately|act now|expires today)/, indicator: 'Uses urgency to pressure quick action', weight: 20 },
    { pattern: /(verify your account|suspended|locked account|security alert)/, indicator: 'Claims account issue to force response', weight: 20 },
    { pattern: /(click here|bit\.ly|tinyurl|short\.link|http:\/\/|https:\/\/)/, indicator: 'Contains links that may redirect to fake pages', weight: 15 },
    { pattern: /(gift card|wire transfer|crypto|bitcoin|send money)/, indicator: 'Requests hard-to-recover payment method', weight: 25 },
    { pattern: /(password|otp|verification code|ssn|bank details)/, indicator: 'Asks for sensitive personal or account information', weight: 20 },
    { pattern: /(dear customer|kindly|congratulations you won|prize)/, indicator: 'Uses common scam phrasing and generic greeting', weight: 10 }
  ]

  let score = 10
  for (const check of checks) {
    if (check.pattern.test(content)) {
      indicators.push(check.indicator)
      score += check.weight
    }
  }

  score = Math.min(95, score)
  const riskLevel = score >= 70 ? 'high' : score >= 40 ? 'medium' : 'low'
  const scamType: AnalysisResult['scamType'] = /(password|verify your account|security alert|click here)/.test(content)
    ? 'phishing'
    : /(gift card|wire transfer|crypto|prize)/.test(content)
      ? 'financial scam'
      : /(pretend|impersonat|from support|from bank)/.test(content)
        ? 'impersonation'
        : indicators.length === 0
          ? 'none'
          : 'unknown'

  return {
    riskLevel,
    confidenceScore: score,
    scamType,
    indicators: indicators.length ? indicators : ['No obvious scam indicators found in this text'],
    explanation:
      riskLevel === 'high'
        ? 'This message shows several classic scam tactics. Do not click links or share personal details.'
        : riskLevel === 'medium'
          ? 'This message has some suspicious signals. Verify the sender through official channels before acting.'
          : 'This message looks relatively safe, but still verify unexpected requests before taking action.',
    recommendations: [
      'Do not click unknown links directly from this message',
      'Contact the company/person using an official website or phone number',
      'Never share passwords, OTP codes, or bank details through chat/email'
    ]
  }
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json()

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 })
    }

    let object: AnalysisResult
    const heuristicResult = analyzeTextHeuristic(text)

    if (process.env.GROQ_API_KEY) {
    const systemPrompt = `You are ShieldAI, a cybersecurity assistant that detects scams and explains risks in simple human language.

Your job is to analyze a message, link, or content and determine if it is a scam, suspicious, or safe.

You MUST think based on intent, context, and behavior patterns — not just keywords.

Analyze the input and return your answer in JSON format with the following fields:
- riskLevel: "low", "medium", or "high"
- confidenceScore: a number from 0-100
- scamType: "phishing", "financial scam", "impersonation", "malware", "unknown", or "none"
- indicators: array of specific reasons why this may be risky
- explanation: explain in very simple terms what is going on and why it may be dangerous
- recommendations: array of clear actions the user should take

Rules:
- Be honest. Do not always say it's a scam.
- If uncertain, say medium risk and explain why.
- Focus on intent (urgency, pressure, money request, impersonation).
- Avoid technical jargon. Explain like you're talking to a normal internet user.`

    const userPrompt = `Analyze this content:

"${text}"`

    let object: AnalysisResult
    const hasGroqKey = !!process.env.GROQ_API_KEY

    if (hasGroqKey) {
      try {
        const result = await generateObject({
          model: groq('llama-3.1-70b-versatile'),
          schema: analysisSchema,
          system: scamAnalysisSystemPrompt,
          prompt: buildScamAnalysisPrompt(text)
        })
        object = mergeAnalyses(result.object, heuristicResult)
      } catch (e) {
        console.warn('[v0] Falling back to heuristic text analysis:', e)
        object = heuristicResult
      }
    } else {
      object = heuristicResult
          system: systemPrompt,
          prompt: userPrompt
        })
        object = result.object
      } catch (e) {
        console.warn('[v0] Falling back to heuristic text analysis:', e)
        object = analyzeTextHeuristic(text)
      }
    } else {
      object = analyzeTextHeuristic(text)
    }

    return new Response(JSON.stringify({ ...object, summary: object.explanation }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('[v0] API error:', error)
    return new Response(JSON.stringify({ error: 'Analysis failed', details: String(error) }), { status: 500 })
  }
}
