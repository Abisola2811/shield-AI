'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react'

interface AnalysisResult {
  riskLevel: 'high' | 'medium' | 'low' | null
  confidenceScore: number
  indicators: string[]
  summary: string
  recommendations: string[]
  analysisDetails?: {
    isAIGenerated: boolean
    isDeepfake: boolean
    suspiciousElements: string[]
  }
}

interface AnalysisResultsProps {
  result: AnalysisResult
}

export default function AnalysisResults({ result }: AnalysisResultsProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-950/40 border-red-700 text-red-100'
      case 'medium':
        return 'bg-amber-950/40 border-amber-700 text-amber-100'
      case 'low':
        return 'bg-green-950/40 border-green-700 text-green-100'
      default:
        return 'bg-slate-900 border-slate-700 text-slate-100'
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high':
        return <AlertCircle className="w-6 h-6 text-red-600" />
      case 'medium':
        return <AlertTriangle className="w-6 h-6 text-amber-600" />
      case 'low':
        return <CheckCircle2 className="w-6 h-6 text-green-600" />
      default:
        return null
    }
  }

  const getRiskLabel = (level: string) => {
    switch (level) {
      case 'high':
        return 'High Risk'
      case 'medium':
        return 'Medium Risk'
      case 'low':
        return 'Low Risk'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className="space-y-4">
      {/* Risk Level Card */}
      <Card className={`border-2 ${getRiskColor(result.riskLevel || '')}`}>
        <CardHeader>
        <CardTitle className="text-base text-slate-100">Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getRiskIcon(result.riskLevel || '')}
              <span className="font-bold text-lg">{getRiskLabel(result.riskLevel || '')}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm rounded-md bg-slate-900/70 px-3 py-2 border border-slate-700">
              <span className="text-slate-300">Confidence Score</span>
              <span className="font-bold text-white">{result.confidenceScore}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
              <div
                className={`h-full transition-all ${
                  result.riskLevel === 'high'
                    ? 'bg-red-600'
                    : result.riskLevel === 'medium'
                      ? 'bg-amber-600'
                      : 'bg-green-600'
                }`}
                style={{ width: `${result.confidenceScore}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-700 leading-relaxed">{result.summary}</p>
        </CardContent>
      </Card>

      {/* Indicators Card */}
      {result.indicators && result.indicators.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Indicators Found</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.indicators.map((indicator, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-slate-700">
                  <span className="text-slate-400 flex-shrink-0">•</span>
                  <span>{indicator}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Recommendations Card */}
      {result.recommendations && result.recommendations.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.recommendations.map((rec, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-slate-700">
                  <span className="text-blue-600 flex-shrink-0">✓</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Image Analysis Details */}
      {result.analysisDetails && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Image Analysis Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">AI-Generated Content</span>
              <span className={`font-semibold ${result.analysisDetails.isAIGenerated ? 'text-red-600' : 'text-green-600'}`}>
                {result.analysisDetails.isAIGenerated ? 'Detected' : 'Not Detected'}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm border-t pt-2">
              <span className="text-slate-600">Deepfake Indicators</span>
              <span className={`font-semibold ${result.analysisDetails.isDeepfake ? 'text-red-600' : 'text-green-600'}`}>
                {result.analysisDetails.isDeepfake ? 'Detected' : 'Not Detected'}
              </span>
            </div>
            {result.analysisDetails.suspiciousElements &&
              result.analysisDetails.suspiciousElements.length > 0 && (
                <div className="border-t pt-2 space-y-2">
                  <span className="text-sm font-medium text-slate-600">Suspicious Elements:</span>
                  <ul className="space-y-1">
                    {result.analysisDetails.suspiciousElements.map((elem, idx) => (
                      <li key={idx} className="text-sm text-slate-700 ml-2">
                        • {elem}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
