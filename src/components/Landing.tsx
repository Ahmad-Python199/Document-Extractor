import React from "react";
import { 
  ArrowRight, 
  Sparkles, 
  AlertTriangle, 
  Calendar, 
  Database, 
  Cpu, 
  CheckCircle2, 
  HelpCircle,
  ShieldAlert,
  Fingerprint
} from "lucide-react";
import { ActiveScreen } from "../types";

interface LandingProps {
  onStartAnalyzing: () => void;
}

export default function Landing({ onStartAnalyzing }: LandingProps) {
  return (
    <div id="landing-page" className="flex-1 bg-[#031427] text-[#d3e4fe] min-h-[calc(100vh-64px)] pb-12 overflow-y-auto custom-scrollbar font-sans">
      
      {/* Hero Section with Radial Gradient */}
      <section className="relative min-h-[921px] flex flex-col items-center justify-center text-center px-4 md:px-8 overflow-hidden pt-8 bg-[radial-gradient(circle_at_50%_50%,rgba(173,198,255,0.1)_0%,transparent_70%)]">
        <div className="z-10 max-w-4xl mx-auto mt-4">
          
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4d8eff]/10 rounded-full border border-[#adc6ff]/20 text-[#adc6ff] text-xs font-mono mb-6">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>ENHANCED WITH GEMINI 3.5 FLASH COGNITIVE CORE</span>
          </div>

          <h1 className="font-display font-extrabold text-[#d3e4fe] text-5xl md:text-7xl mb-6 leading-[1.1] tracking-tight">
            Your Documents, <span className="text-[#adc6ff]">Now Intelligent.</span>
          </h1>
          
          <p className="text-[#c2c6d6] text-sm md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            Production-grade RAG engine for instant insights, summaries, and complex analysis. Built for corporate legal, engineering, and enterprise workflows.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              id="landing-start-analyzing-btn"
              onClick={onStartAnalyzing}
              className="bg-[#4d8eff] text-[#001a42] px-8 py-3.5 rounded-xl font-bold font-sans text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-xl shadow-[#4d8eff]/10 cursor-pointer"
            >
              <span>Start Analyzing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="landing-view-demo-btn"
              onClick={onStartAnalyzing}
              className="glass-panel text-[#d3e4fe] px-8 py-3.5 rounded-xl font-semibold text-sm border border-[#424754] hover:bg-[#26364a]/50 transition-colors cursor-pointer"
            >
              View Demo
            </button>
          </div>
        </div>

        {/* Abstract Document Scanner Visuals (Screen 3) - Completely revamped and made extremely interesting with IDE styling, highlighted real contracts & connection links */}
        <div className="mt-16 relative w-full max-w-5xl mx-auto px-4">
          {/* Subtle surrounding glow */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-[#adc6ff]/10 via-amber-500/5 to-[#adc6ff]/10 rounded-2xl blur-lg opacity-75"></div>
          
          <div className="relative bg-[#071324] rounded-2xl border border-[#424754]/40 overflow-hidden shadow-[0_25px_50px_-12px_rgba(3,20,39,0.7)]">
            
            {/* Mock IDE Header Bar */}
            <div className="bg-[#0b1c30] border-b border-[#424754]/30 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                </div>
                <div className="h-4 w-px bg-[#424754]/30 mx-2"></div>
                <div className="flex items-center gap-1.5 bg-[#031427] px-3 py-1 rounded-md border border-[#424754]/40">
                  <span className="material-symbols-outlined text-[#adc6ff] text-xs">description</span>
                  <span className="font-mono text-[10px] text-[#adc6ff] font-semibold">MSA_Cloud_Services_Final.pdf</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-emerald-950/40 text-emerald-400 rounded font-mono text-[9px] border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping"></span>
                  OCR VALIDATED
                </span>
                <span className="font-mono text-[9px] text-[#c2c6d6]/40 uppercase">Confidence: 99.8%</span>
              </div>
            </div>

            {/* Animating Laser Scan Bar */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#adc6ff] to-transparent shadow-[0_0_15px_#adc6ff] opacity-80 animate-scan pointer-events-none z-10"></div>
            
            {/* IDE Interface Layout */}
            <div className="grid grid-cols-12 gap-6 p-6 md:p-8 h-full text-left relative min-h-[360px]">
              
              {/* Actual Contract Page Replica (Left 7 Columns) */}
              <div className="col-span-12 md:col-span-7 flex flex-col gap-4 font-sans bg-[#031122]/60 p-5 rounded-xl border border-[#424754]/20 relative">
                
                {/* Background Grid Accent */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1b2b3f_1px,transparent_1px),linear-gradient(to_bottom,#1b2b3f_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-[0.03] pointer-events-none rounded-xl"></div>
                
                <div className="flex justify-between items-center border-b border-[#424754]/20 pb-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#c2c6d6]/60">Document Body Extract</span>
                  <span className="font-mono text-[9px] text-[#adc6ff]">Pages: 1 / 1</span>
                </div>

                <div className="space-y-3.5 text-[11px] text-[#c2c6d6] leading-relaxed select-none">
                  <h3 className="font-display font-bold text-xs text-[#d3e4fe] border-b border-[#424754]/10 pb-1">MASTER SERVICES AGREEMENT</h3>
                  <p>
                    This Agreement is entered into as of October 12, 2024, by and between{' '}
                    <span className="bg-[#4d8eff]/10 px-1 py-0.5 rounded text-[#adc6ff] font-semibold">DocuMind Systems Inc.</span> ("Provider") and{' '}
                    <span className="bg-[#4d8eff]/10 px-1 py-0.5 rounded text-[#adc6ff] font-semibold">Global Enterprise Corp</span> ("Client").
                  </p>
                  
                  {/* Highlighted Risk Block */}
                  <div className="p-3 bg-red-950/10 border-l-2 border-red-500/60 rounded-r-lg space-y-1 relative group">
                    <span className="absolute right-2 top-1.5 font-mono text-[8px] font-bold text-red-400 bg-red-950/40 px-1 rounded">CLAUSE 4.2</span>
                    <p className="font-semibold text-red-200">3. LIABILITY & INDEMNIFICATION</p>
                    <p className="text-[#ffdad6]/80 text-[10px]">
                      Except in cases of gross negligence, the total liability of either party for any single claim arising under this Agreement shall not exceed $5,000,000 USD. <span className="bg-red-500/20 text-red-200 border-b border-dashed border-red-400">The Client agrees to indemnify the Provider against third-party claims...</span>
                    </p>
                    {/* Pulsing indicator anchor for SVG connected lines */}
                    <div className="absolute -right-1 top-1/2 w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
                  </div>

                  <p>
                    Either party may terminate this agreement with 60 days written notice.{' '}
                    <span className="bg-amber-500/15 border-b border-dashed border-amber-400/60 px-0.5 text-amber-200 font-medium">
                      Automatic renewal triggers 30 days prior to expiry
                    </span>{' '}
                    unless explicit opt-out is provided via certified mail.
                  </p>
                </div>

                <div className="mt-2 h-1.5 w-1/3 bg-[#424754]/30 rounded"></div>
              </div>

              {/* Connecting Tracks SVG Overlays (Invisible on mobile, beautifully aligns layout anchors) */}
              <div className="absolute hidden md:block inset-0 pointer-events-none z-0">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  {/* Connect Risk Source to widget */}
                  <path 
                    d="M 520,185 Q 560,185 580,145" 
                    fill="none" 
                    stroke="url(#riskGradient)" 
                    strokeWidth="1.5" 
                    strokeDasharray="4,4"
                    className="stroke-[url(#riskGradient)]"
                  />
                  {/* Connect Date Source to widget */}
                  <path 
                    d="M 520,265 Q 560,265 580,285" 
                    fill="none" 
                    stroke="url(#dateGradient)" 
                    strokeWidth="1.5" 
                    strokeDasharray="4,4"
                    className="stroke-[url(#dateGradient)]"
                  />
                  
                  <defs>
                    <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#f87171" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="dateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#adc6ff" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#adc6ff" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Floating Insight Cards / Cog outputs (Right 5 Columns) */}
              <div className="col-span-12 md:col-span-4 flex flex-col justify-center gap-5 z-10 md:col-start-9">
                
                {/* Floating Widget 1: Risks Detected */}
                <div className="glass-panel p-4 rounded-xl border-l-4 border-red-500 shadow-[0_10px_30px_rgba(239,68,68,0.15)] transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="flex items-center gap-2 text-red-400 mb-2">
                    <AlertTriangle className="w-4 h-4 animate-bounce" />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider">RISKS ISOLATED</span>
                    <span className="ml-auto font-mono text-[8px] bg-red-500/15 text-red-400 px-1.5 py-0.5 rounded">CRITICAL</span>
                  </div>
                  <p className="text-xs font-semibold text-[#ffdad6] leading-snug text-left">
                    Clause 4.2 contains ambiguous liability terms with no indemnification cap.
                  </p>
                  <div className="mt-2.5 flex items-center gap-1 text-[10px] text-red-300/70 border-t border-red-500/10 pt-2 font-mono">
                    <span className="material-symbols-outlined text-xs">gavel</span>
                    <span>Indemnity cap omitted</span>
                  </div>
                </div>

                {/* Floating Widget 2: Key Dates */}
                <div className="glass-panel p-4 rounded-xl border-l-4 border-[#adc6ff] shadow-[0_10px_30px_rgba(173,198,255,0.1)] transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="flex items-center gap-2 text-[#adc6ff] mb-2.5">
                    <Calendar className="w-4 h-4" />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider">KEY SCHEDULER DATES</span>
                  </div>
                  <ul className="text-xs space-y-2.5 text-[#c2c6d6] text-left">
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#adc6ff]"></span>
                      <div>
                        <p className="font-semibold text-[#d3e4fe]">Renewal Deadline</p>
                        <p className="font-mono text-[9px] text-[#c2c6d6]/60">Oct 24, 2024 (30 days trigger)</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      <div>
                        <p className="font-semibold text-[#d3e4fe]">Compliance Review</p>
                        <p className="font-mono text-[9px] text-[#c2c6d6]/60">Jan 15, 2025 (Annual Threshold)</p>
                      </div>
                    </li>
                  </ul>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid (Enterprise Stack) */}
      <section className="py-24 px-6 max-w-[#1440px] mx-auto" id="features">
        <div className="text-center mb-16">
          <h2 className="font-display font-medium text-3xl md:text-4xl text-[#d3e4fe] tracking-tight">
            Enterprise Intelligence Stack
          </h2>
          <p className="text-[#c2c6d6] text-sm md:text-base mt-2 max-w-xl mx-auto">
            The architectural layers you need for secure, high-stakes document processing operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Multi-Provider (Left 2 Columns) */}
          <div className="glass-panel p-8 rounded-2xl md:col-span-2 flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 text-left">
              <Cpu className="w-8 h-8 text-[#adc6ff] mb-4" />
              <h3 className="font-display text-lg font-bold mb-2">Multi-provider Cognitive Engine</h3>
              <p className="text-[#c2c6d6] text-xs md:text-sm leading-relaxed">
                Seamlessly dispatch extraction queries across our private system pipeline or Gemini 3.5 cognitive clusters. Leverage customized parsing parameters based on file scale.
              </p>
            </div>
            <div className="w-full md:w-1/2 bg-[#26364a]/30 rounded-xl p-4 border border-[#424754]/30 font-mono text-[10px] space-y-2">
              <div className="flex justify-between items-center p-2.5 bg-[#102034] rounded border border-[#adc6ff]/20">
                <span className="font-semibold">DocuMind Private Pipeline (Fine-tuned)</span>
                <span className="text-[#adc6ff] font-bold">ACTIVE</span>
              </div>
              <div className="flex justify-between items-center p-2.5 border border-[#424754]/40 rounded opacity-60">
                <span className="font-semibold">Gemini 3.5 Flash Cognitive Core</span>
                <span className="text-[#c2c6d6]">STANDBY</span>
              </div>
            </div>
          </div>

          {/* Card 2: Secure OCR (Right Column) */}
          <div className="glass-panel p-8 rounded-2xl text-left">
            <Fingerprint className="w-8 h-8 text-[#ffb786] mb-4" />
            <h3 className="font-display text-lg font-bold mb-2">Secure Vision OCR</h3>
            <p className="text-[#c2c6d6] text-xs md:text-sm leading-relaxed">
              Instantly digitalize tabular data, handwritten amendments, low-resolution scanned legal deeds, and multi-tier Excel formats into structured markdown.
            </p>
          </div>

          {/* Card 3: Vectorized RAG */}
          <div className="glass-panel p-8 rounded-2xl text-left">
            <Database className="w-8 h-8 text-[#adc6ff] mb-4" />
            <h3 className="font-display text-lg font-bold mb-2">Vectorized Semantic Indexing</h3>
            <p className="text-[#c2c6d6] text-xs md:text-sm leading-relaxed">
              Hybrid vector databases structure your uploaded context in real-time, executing semantic lookups and paragraph mappings across thousands of indices in milliseconds.
            </p>
          </div>

          {/* Card 4: Enterprise Encryption (Bottom 2 Columns) */}
          <div className="glass-panel p-8 rounded-2xl md:col-span-2 flex flex-col md:flex-row-reverse gap-6 items-center">
            <div className="flex-1 text-left">
              <ShieldAlert className="w-8 h-8 text-[#c8c5cf] mb-4" />
              <h3 className="font-display text-lg font-bold mb-2">Enterprise-grade Shielding</h3>
              <p className="text-[#c2c6d6] text-xs md:text-sm leading-relaxed">
                Full-scale AES-256 data payload encryption in transit and at rest. Your enterprise intelligence is exclusively self-contained and is never utilized for public training.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full md:w-1/2">
              <div className="p-4 bg-[#0b1c30] rounded-lg border border-[#424754]/30 flex items-center justify-center">
                <span className="font-mono text-xs font-semibold text-[#d3e4fe]">SOC2 Type II</span>
              </div>
              <div className="p-4 bg-[#0b1c30] rounded-lg border border-[#424754]/30 flex items-center justify-center">
                <span className="font-mono text-xs font-semibold text-[#d3e4fe]">ISO 27001</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Pricing Section ("Scalable Intelligence") */}
      <section className="py-24 px-6 bg-[#000f21]/50 border-y border-[#424754]/20" id="pricing">
        <div className="max-w-[#1440px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-medium text-3xl text-[#d3e4fe] tracking-tight">
              Scalable Intelligence
            </h2>
            <p className="text-[#c2c6d6] text-sm mt-2">
              Simple, predictable plans designed for maximum performance scale.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Plans Subgrid (Left 8 Columns) */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Plan 1: Professional */}
              <div className="glass-panel p-8 rounded-2xl relative border-t-2 border-t-[#8c909f] text-left flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">Professional Plan</h3>
                  <div className="mb-6 flex items-baseline">
                    <span className="font-display text-4xl font-extrabold text-[#d3e4fe]">$49</span>
                    <span className="text-[#c2c6d6] text-xs ml-1">/ month</span>
                  </div>
                  <ul className="space-y-4 mb-8 text-[#c2c6d6] text-xs">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#adc6ff] shrink-0" />
                      <span>Up to 2,000 PDF / DOCX pages per month</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#adc6ff] shrink-0" />
                      <span>Standard vector database allocation (5GB)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#adc6ff] shrink-0" />
                      <span>Real-time semantic chat + citations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#adc6ff] shrink-0" />
                      <span>Express email priority support pipeline</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={onStartAnalyzing}
                  className="w-full py-2.5 rounded-xl border border-[#adc6ff] text-[#adc6ff] hover:bg-[#adc6ff]/10 transition-colors font-semibold text-xs text-center cursor-pointer"
                >
                  Get Started Now
                </button>
              </div>

              {/* Plan 2: Enterprise Custom */}
              <div className="glass-panel p-8 rounded-2xl relative border-t-4 border-t-[#adc6ff] bg-[#26364a]/20 text-left flex flex-col justify-between">
                <div className="absolute -top-3 right-5 bg-[#adc6ff] text-[#002e6a] px-3 py-1 rounded-full font-mono text-[9px] font-bold">
                  RECOMMENDED
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">Enterprise Plan</h3>
                  <div className="mb-6 flex items-baseline">
                    <span className="font-display text-4xl font-extrabold text-[#d3e4fe]">Custom Pricing</span>
                  </div>
                  <ul className="space-y-4 mb-8 text-[#c2c6d6] text-xs">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#adc6ff] shrink-0" />
                      <span>Unlimited page extraction and scanning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#adc6ff] shrink-0" />
                      <span>Dedicated models and isolated private server hosts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#adc6ff] shrink-0" />
                      <span>Enterprise custom SSO/SAML workspace integration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#adc6ff] shrink-0" />
                      <span>24/7 dedicated solutions engineering pod</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={onStartAnalyzing}
                  className="w-full py-2.5 rounded-xl bg-[#adc6ff] text-[#002e6a] hover:brightness-110 shadow-md shadow-[#adc6ff]/10 font-bold text-xs text-center transition-all cursor-pointer"
                >
                  Contact Sales
                </button>
              </div>

            </div>

            {/* Custom SVG Neural RAG Routing Graphic (Right 4 Columns) - Built cleanly according to DocuMind / AI */}
            <div className="lg:col-span-4 bg-[#061427]/85 border border-[#424754]/40 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group min-h-[440px] shadow-xl text-left">
              {/* Decorative Glow */}
              <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-[#adc6ff]/10 blur-3xl pointer-events-none group-hover:bg-[#adc6ff]/15 transition-all duration-700"></div>
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-2 border-b border-[#424754]/20 pb-3">
                  <div className="w-2 h-2 rounded-full bg-[#adc6ff] animate-ping"></div>
                  <span className="font-mono text-[9px] font-bold text-[#adc6ff] uppercase tracking-widest">Cognitive Processing Matrix</span>
                </div>

                <p className="text-[#c2c6d6] text-xs leading-relaxed">
                  Real-time visualization of document ingestion, vectorization pipelines, and private LLM token synthesis.
                </p>

                {/* Spectacular Custom SVG Layout */}
                <div className="bg-[#031122] rounded-xl border border-[#424754]/20 p-4 relative flex items-center justify-center min-h-[220px]">
                  <svg className="w-full h-[180px]" viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Pulsing connections pathways */}
                    <path d="M40 90 L100 50 M40 90 L100 130 M100 50 L195 90 M100 130 L195 90" stroke="#424754" strokeWidth="1" strokeDasharray="3,3" />
                    <path d="M40 90 H100 H195" stroke="#adc6ff" strokeOpacity="0.15" strokeWidth="1" />

                    {/* Connection animated highlights */}
                    <circle r="2.5" fill="#adc6ff" className="animate-[ping_3s_linear_infinite]">
                      <animateMotion dur="3s" repeatCount="indefinite" path="M40 90 L100 50 L195 90" />
                    </circle>
                    <circle r="2" fill="#ffb786" className="animate-[ping_4s_linear_infinite]">
                      <animateMotion dur="4.2s" repeatCount="indefinite" path="M40 90 L100 130 L195 90" />
                    </circle>

                    {/* Nodes */}
                    {/* Node 1: Ingestion */}
                    <g transform="translate(40, 90)">
                      <circle r="16" fill="#1b2b3f" stroke="#adc6ff" strokeWidth="1.5" className="animate-pulse" />
                      <circle r="6" fill="#adc6ff" />
                      <text y="28" textAnchor="middle" fill="#c2c6d6" fontSize="7" fontFamily="monospace" fontWeight="bold">SOURCE PDF</text>
                    </g>

                    {/* Node 2: Vector embeddings top block */}
                    <g transform="translate(100, 50)">
                      <circle r="12" fill="#1b2b3f" stroke="#424754" strokeWidth="1" />
                      <path d="M-4 -4 H4 M-4 0 H4 M-4 4 H2" stroke="#adc6ff" strokeWidth="1.5" strokeLinecap="round" />
                      <text y="24" textAnchor="middle" fill="#c2c6d6" fontSize="7" fontFamily="monospace">VE-CHUNK #1</text>
                    </g>

                    {/* Node 3: Vector embeddings bottom block */}
                    <g transform="translate(100, 130)">
                      <circle r="12" fill="#1b2b3f" stroke="#424754" strokeWidth="1" />
                      <path d="M-4 -4 H4 M-4 0 H2 M-4 4 H4" stroke="#ffb786" strokeWidth="1.5" strokeLinecap="round" />
                      <text y="24" textAnchor="middle" fill="#c2c6d6" fontSize="7" fontFamily="monospace">VE-CHUNK #2</text>
                    </g>

                    {/* Node 4: Gemini Core */}
                    <g transform="translate(195, 90)">
                      <polygon points="0,-16 14,8 -14,8" fill="#102034" stroke="#adc6ff" strokeWidth="1.5" className="animate-[spin_12s_linear_infinite]" />
                      <circle r="7" fill="#4d8eff" className="animate-pulse" />
                      <circle r="3" fill="#ffffff" />
                      <text y="28" textAnchor="middle" fill="#adc6ff" fontSize="7" fontFamily="monospace" fontWeight="bold">COGNITIVE ENGINE</text>
                    </g>
                  </svg>
                </div>
              </div>

              <div className="pt-3 border-t border-[#424754]/20 flex justify-between items-center text-[10px] text-[#c2c6d6]/60 font-mono">
                <span>Latency: 140ms</span>
                <span>Security Sandbox: AES-256</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Final Action Call */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <div className="glass-panel p-10 rounded-3xl border border-[#adc6ff]/20">
          <h2 className="font-display font-medium text-3xl mb-3 text-[#d3e4fe]">
            Ready to unlock your data?
          </h2>
          <p className="text-[#c2c6d6] text-sm mb-8 max-w-xl mx-auto leading-relaxed">
            Join hundreds of security-minded enterprises and engineering teams analyzing agreements at speed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onStartAnalyzing}
              className="bg-[#adc6ff] text-[#002e6a] px-8 py-3 rounded-xl font-bold text-xs hover:scale-[1.02] transition-transform cursor-pointer"
            >
              Start Free Trial
            </button>
            <button
              onClick={onStartAnalyzing}
              className="text-[#d3e4fe] font-sans font-semibold text-xs px-8 py-3 hover:underline cursor-pointer"
            >
              Book a Strategy Call
            </button>
          </div>
        </div>
      </section>

      {/* Landing Footer / Signature */}
      <footer className="border-t border-[#424754]/20 py-8 px-6 mt-12 bg-[#000f21]">
        <div className="max-w-[#1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#adc6ff] text-xl">psychology</span>
            <span className="font-display text-sm font-semibold text-[#d3e4fe]">DocuMind AI</span>
          </div>
          <p className="text-[10px] text-[#c2c6d6]/60 font-mono">
            © 2024 DOCUMIND AI. SECURITY INTELLIGENCE CORP. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>

    </div>
  );
}
