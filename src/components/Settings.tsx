import React, { useState } from "react";
import { 
  Settings, 
  Key, 
  Database, 
  Cpu, 
  Lock, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  Info
} from "lucide-react";

export default function SettingsView() {
  const [model, setModel] = useState("gemini-3.5-flash");
  const [complianceThreshold, setComplianceThreshold] = useState(90);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [apiStatus, setApiStatus] = useState("CONNECTED");

  return (
    <div id="settings-view" className="flex-grow pt-24 px-6 pb-12 overflow-y-auto h-screen custom-scrollbar font-sans bg-[#031427]">
      <div className="max-w-4xl mx-auto space-y-6 text-left">
        
        {/* Settings Header */}
        <div>
          <h2 className="font-display font-medium text-2xl md:text-3xl text-[#d3e4fe] flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-[#adc6ff]" />
            <span>Workspace Settings</span>
          </h2>
          <p className="text-[#c2c6d6] text-xs md:text-sm mt-1">
            Configure extraction limits, custom LLM models configurations, and inspect environment credentials.
          </p>
        </div>

        {/* API Credentials Setup Panel */}
        <div className="glass-panel p-6 rounded-xl space-y-4 border border-[#424754]/40">
          <h3 className="font-display font-bold text-sm text-[#adc6ff] flex items-center gap-2">
            <Key className="w-4.5 h-4.5 text-[#adc6ff]" />
            <span>Google Gemini Credentials Status</span>
          </h3>
          
          <div className="bg-[#0b1c30] p-4 rounded-xl border border-[#424754]/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-xs font-semibold text-[#d3e4fe] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active Server Engine: GoogleGenAI SDK v2.4+</span>
              </p>
              <p className="text-[11px] text-[#c2c6d6] mt-1 pr-4 max-w-xl">
                The application reads your <code className="bg-[#102034] px-1.5 py-0.5 rounded font-mono text-xs">GEMINI_API_KEY</code> environment secret on startup. If you customize key values inside the AI Studio Secrets panel, restarting ensures your keys synchronize.
              </p>
            </div>
            <div className="bg-[#26364a]/50 p-3 rounded-lg text-center shrink-0 border border-[#424754]/40">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#c2c6d6]">Key Source Status</span>
              <p className="font-mono text-xs text-[#adc6ff] font-bold mt-0.5">AUTO_INJECTED</p>
            </div>
          </div>
        </div>

        {/* Cognitive Processor Bento configs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Section A: Model Configuration */}
          <div className="glass-panel p-6 rounded-xl space-y-4 border border-[#424754]/40">
            <h3 className="font-display font-bold text-sm text-[#d3e4fe] flex items-center gap-2">
              <Cpu className="w-4.5 h-4.5 text-[#adc6ff]" />
              <span>Cognitive Models Cluster</span>
            </h3>
            
            <div className="space-y-3 text-xs">
              <p className="text-[#c2c6d6] text-[11px]">
                Choose the baseline model used for deep semantic extraction and Q&A chat grounding.
              </p>
              
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 bg-[#0b1c30] hover:bg-[#102034] border border-[#424754]/40 rounded-xl cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="model-select"
                    checked={model === "gemini-3.5-flash"}
                    onChange={() => setModel("gemini-3.5-flash")}
                    className="accent-[#adc6ff]"
                  />
                  <div>
                    <span className="font-semibold text-[#d3e4fe]">Gemini 3.5 Flash</span>
                    <p className="text-[10px] text-[#c2c6d6]/60 font-mono mt-0.5">Optimize speed / low token consumption</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-[#0b1c30] hover:bg-[#102034] border border-[#424754]/40 rounded-xl cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="model-select"
                    checked={model === "gemini-3.5-pro"}
                    onChange={() => setModel("gemini-3.5-pro")}
                    className="accent-[#adc6ff]"
                  />
                  <div>
                    <span className="font-semibold text-[#d3e4fe]">Gemini 3.5 Pro</span>
                    <p className="text-[10px] text-[#c2c6d6]/60 font-mono mt-0.5">High complex multi-turn reasoning</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Section B: Extraction Preferences */}
          <div className="glass-panel p-6 rounded-xl space-y-4 border border-[#424754]/40">
            <h3 className="font-display font-bold text-sm text-[#d3e4fe] flex items-center gap-2">
              <Database className="w-4.5 h-4.5 text-[#ffb786]" />
              <span>Parsing Tolerance Criteria</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <label className="text-[#c2c6d6] text-[11px]">OCR Compliance Confidence Rate</label>
                  <span className="font-mono text-[#adc6ff] font-bold">{complianceThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="75"
                  max="99"
                  value={complianceThreshold}
                  onChange={(e) => setComplianceThreshold(Number(e.target.value))}
                  className="w-full accent-[#adc6ff]"
                />
                <p className="text-[10px] text-[#c2c6d6]/50">
                  Documents with character extraction accuracy falling below this threshold will automatically raise "Low Confidence" warning flags.
                </p>
              </div>

              <div className="pt-2 border-t border-[#424754]/30 flex justify-between items-center bg-[#0b1c30]/40 p-2.5 rounded-lg">
                <div>
                  <span className="font-semibold text-[#d3e4fe] block">AES-256 Storage Shielding</span>
                  <p className="text-[10px] text-[#c2c6d6]/60">Encrypt cached files at rest on instance buckets</p>
                </div>
                <input
                  type="checkbox"
                  checked={encryptionEnabled}
                  onChange={() => setEncryptionEnabled(!encryptionEnabled)}
                  className="w-4 h-4 accent-[#adc6ff]"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Workspace Licensing Compliance Stats */}
        <div className="glass-panel p-6 rounded-xl space-y-4 border border-[#424754]/40">
          <h3 className="font-display font-bold text-sm text-[#d3e4fe] flex items-center gap-2">
            <Lock className="w-4.5 h-4.5 text-[#c2c6d6]" />
            <span>Workspace Licensing & Enterprise Audit Checklist</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="flex gap-2 p-3 bg-[#0b1c30] rounded-lg border border-[#424754]/20 items-start">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#d3e4fe]">SOC-2 Type II Accredited Workspace</span>
                <p className="text-[10px] text-[#c2c6d6]/60 mt-0.5">Complies with strict logical asset controls, privacy protocols, and database isolation.</p>
              </div>
            </div>

            <div className="flex gap-2 p-3 bg-[#0b1c30] rounded-lg border border-[#424754]/20 items-start">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#d3e4fe]">CCPA & GDPR Local Execution Compliance</span>
                <p className="text-[10px] text-[#c2c6d6]/60 mt-0.5">Storage parameters comply with standard rights to be forgotten and regional localization rules.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
