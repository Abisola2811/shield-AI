'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle, CheckCircle2, AlertTriangle, Loader2, Shield, Upload, ArrowLeft } from 'lucide-react'
import AnalysisResults from '@/components/analysis-results'
import Link from 'next/link'

type RiskLevel = 'high' | 'medium' | 'low' | null

interface AnalysisResult {
  riskLevel: RiskLevel
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

export default function Analyzer() {
  const [textInput, setTextInput] = useState('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [rawResponse, setRawResponse] = useState('')

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value)
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeText = async () => {
    if (!textInput.trim()) return

    setAnalyzing(true)
    setResult(null)
    setRawResponse('')

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textInput }),
      })

      if (!response.ok) {
        const error = await response.json()
        console.error('[v0] API error:', error)
        throw new Error(error.error || 'Analysis failed')
      }

      const data = await response.json()
      console.log('[v0] Analysis result:', data)
      setResult(data)
    } catch (error) {
      console.error('[v0] Analysis error:', error)
    } finally {
      setAnalyzing(false)
    }
  }

  const analyzeImage = async () => {
    if (!selectedImage) return

    setAnalyzing(true)
    setResult(null)
    setRawResponse('')

    try {
      const formData = new FormData()
      formData.append('file', selectedImage)

      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        console.error('[v0] API error:', error)
        throw new Error(error.error || 'Analysis failed')
      }

      const data = await response.json()
      console.log('[v0] Image analysis result:', data)
      setResult(data)
    } catch (error) {
      console.error('[v0] Analysis error:', error)
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4 transition">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-slate-50">ShieldAI</h1>
            </div>
            <p className="text-lg text-slate-400">
              Analyze text and images for potential scams, fraud, and deepfakes using advanced AI
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2">
              <Card className="cyber-card border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-slate-50">Analyze Content</CardTitle>
                  <CardDescription className="text-slate-400">
                    Paste text or upload an image to detect scam indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="text" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-slate-900">
                      <TabsTrigger value="text" className="data-[state=active]:bg-purple-600">Text Analysis</TabsTrigger>
                      <TabsTrigger value="image" className="data-[state=active]:bg-purple-600">Image Analysis</TabsTrigger>
                    </TabsList>

                    <TabsContent value="text" className="space-y-4">
                      <Textarea
                        placeholder="Paste the suspicious message, email, or text here..."
                        value={textInput}
                        onChange={handleTextChange}
                        className="min-h-64 p-4 bg-slate-900 border-slate-700 text-slate-50 placeholder:text-slate-500"
                      />
                      <Button
                        onClick={analyzeText}
                        disabled={analyzing || !textInput.trim()}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 neon-glow"
                      >
                        {analyzing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          'Analyze Text'
                        )}
                      </Button>
                    </TabsContent>

                    <TabsContent value="image" className="space-y-4">
                      <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center bg-slate-900/50">
                        {imagePreview ? (
                          <div className="space-y-4">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="max-h-64 mx-auto rounded-lg"
                            />
                            <Button
                              variant="outline"
                              onClick={() => {
                                setSelectedImage(null)
                                setImagePreview('')
                              }}
                              className="border-slate-700 text-slate-300 hover:bg-slate-800"
                            >
                              Remove Image
                            </Button>
                          </div>
                        ) : (
                          <label className="cursor-pointer">
                            <div className="flex flex-col items-center gap-2 text-slate-400">
                              <Upload className="w-8 h-8" />
                              <span className="font-medium">Click to upload or drag and drop</span>
                              <span className="text-sm">PNG, JPG, GIF up to 10MB</span>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageSelect}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                      <Button
                        onClick={analyzeImage}
                        disabled={analyzing || !selectedImage}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 neon-glow"
                      >
                        {analyzing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          'Analyze Image'
                        )}
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-1">
              {result ? (
                <AnalysisResults result={result} />
              ) : analyzing ? (
                <Card className="cyber-card border-slate-700/50">
                  <CardContent className="pt-6 flex flex-col items-center justify-center min-h-64 gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                    <p className="text-slate-400">Analyzing content...</p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="cyber-card border-slate-700/50">
                  <CardContent className="pt-6 flex flex-col items-center justify-center min-h-64 gap-4 text-center">
                    <Shield className="w-12 h-12 text-slate-700" />
                    <div>
                      <p className="font-medium text-slate-200">No analysis yet</p>
                      <p className="text-sm text-slate-400">
                        Submit content to see risk assessment
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <Card className="cyber-card border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2 text-slate-50">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  What We Detect
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2 text-slate-400">
                <p>• Phishing attempts and social engineering</p>
                <p>• Financial scams and fraud indicators</p>
                <p>• Urgency/pressure tactics</p>
                <p>• Requests for sensitive information</p>
                <p>• AI-generated and deepfake content</p>
              </CardContent>
            </Card>

            <Card className="cyber-card border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2 text-slate-50">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2 text-slate-400">
                <p>• Advanced AI analysis of text content</p>
                <p>• Vision-based image analysis</p>
                <p>• Risk scoring and confidence metrics</p>
                <p>• Detailed indicator identification</p>
                <p>• Actionable recommendations</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
