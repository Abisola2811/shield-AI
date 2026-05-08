'use client'

export default function LaptopMockup() {
  return (
    <div className="relative w-full">
      {/* Laptop body */}
      <div className="relative">
        {/* Screen */}
        <div className="rounded-2xl border-[12px] border-slate-900 bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl overflow-hidden"
          style={{
            boxShadow: '0 0 60px rgba(139, 92, 246, 0.3), 0 0 120px rgba(59, 130, 246, 0.2)'
          }}>
          {/* Screen content - Analyzer UI */}
          <div className="aspect-video bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 flex flex-col">
            {/* Top sidebar */}
            <div className="flex gap-4 mb-6">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30"></div>
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30"></div>
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30"></div>
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30"></div>
            </div>

            {/* Main content grid */}
            <div className="flex-1 grid grid-cols-3 gap-4">
              {/* Left section */}
              <div className="col-span-1">
                <div className="space-y-3">
                  <div className="h-6 bg-slate-700/30 rounded"></div>
                  <div className="h-6 bg-slate-700/30 rounded"></div>
                  <div className="h-6 bg-slate-700/30 rounded"></div>
                </div>
              </div>

              {/* Center - Risk Score */}
              <div className="col-span-1 flex flex-col items-center justify-center gap-4">
                <div className="text-sm text-slate-400">Risk Score</div>
                <div className="w-20 h-20 rounded-full border-4 border-red-500 flex items-center justify-center">
                  <span className="text-2xl font-bold text-red-500">85</span>
                </div>
                <div className="text-xs text-red-500 font-semibold">High Risk</div>
              </div>

              {/* Right section */}
              <div className="col-span-1 space-y-3">
                <div className="text-xs text-slate-400">Analysis Summary</div>
                <div className="h-4 bg-red-500/20 rounded border border-red-500/30"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-700/30 rounded"></div>
                  <div className="h-3 bg-slate-700/30 rounded"></div>
                  <div className="h-3 bg-slate-700/30 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Laptop base */}
        <div className="relative -mt-1">
          <div className="h-3 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-b-2xl"></div>
          <div className="h-2 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-b-2xl"></div>
          <div className="relative">
            <div className="h-1 bg-slate-900 rounded-b-full"></div>
            <div className="absolute inset-x-1/3 h-6 -bottom-3 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-lg opacity-40"></div>
          </div>
        </div>
      </div>

      {/* Annotation - Phishing Detected */}
      <div className="absolute top-1/3 -left-24 w-40">
        <div className="flex items-center gap-3">
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-2 text-sm">
            <div className="flex items-center gap-2 text-red-400">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="font-medium">Phishing</span>
            </div>
            <span className="text-xs text-red-400">Detected</span>
          </div>
          <svg className="w-8 h-8 text-red-500 -mr-4" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" d="M20 12l-8 8" />
          </svg>
        </div>
      </div>

      {/* Annotation - Deepfake Detected */}
      <div className="absolute top-1/4 -right-32 w-40">
        <div className="flex items-center gap-3 justify-end">
          <svg className="w-8 h-8 text-blue-500 -ml-4" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" d="M4 12l8-8" />
          </svg>
          <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg px-4 py-2 text-sm">
            <div className="flex items-center gap-2 text-blue-400">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="font-medium">Deepfake</span>
            </div>
            <span className="text-xs text-blue-400">Detected</span>
          </div>
        </div>
      </div>

      {/* Annotation - Safe & Secure */}
      <div className="absolute bottom-1/3 -right-40 w-40">
        <div className="flex items-center gap-3 justify-end">
          <svg className="w-8 h-8 text-emerald-500 -ml-4" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" d="M4 12l8-8" />
          </svg>
          <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-lg px-4 py-2 text-sm">
            <div className="flex items-center gap-2 text-emerald-400">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="font-medium">Safe &</span>
            </div>
            <span className="text-xs text-emerald-400">Secure</span>
          </div>
        </div>
      </div>
    </div>
  )
}
