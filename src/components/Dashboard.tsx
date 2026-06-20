import React, { useState } from "react";
import { 
  History, 
  FileText, 
  Bolt, 
  Database, 
  MoreVertical, 
  Upload, 
  ArrowRight, 
  Activity, 
  Sparkles, 
  MessageSquare, 
  AlertTriangle, 
  RefreshCw, 
  UserPlus,
  Play
} from "lucide-react";
import { DocumentItem, LiveActivity, ActiveScreen } from "../types";

interface DashboardProps {
  documents: DocumentItem[];
  activities: LiveActivity[];
  onSelectDoc: (doc: DocumentItem) => void;
  onNavigate: (screen: ActiveScreen) => void;
  onFileUpload: (name: string, content: string) => void;
  isProcessingUpload: boolean;
}

export default function Dashboard({ 
  documents, 
  activities, 
  onSelectDoc, 
  onNavigate,
  onFileUpload,
  isProcessingUpload
}: DashboardProps) {
  // Direct text paste modal states for easy user interaction
  const [pasteModalOpen, setPasteModalOpen] = useState(false);
  const [pasteDocName, setPasteDocName] = useState("");
  const [pasteDocContent, setPasteDocContent] = useState("");

  const handlePasteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pasteDocName || !pasteDocContent) return;
    onFileUpload(pasteDocName, pasteDocContent);
    setPasteModalOpen(false);
    setPasteDocName("");
    setPasteDocContent("");
  };

  // Helper to trigger standard text or PDF file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onFileUpload(file.name, result || "");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div id="system-dashboard" className="flex-grow pt-24 px-6 pb-12 overflow-y-auto h-screen custom-scrollbar font-sans bg-[#031427]">
      <div className="max-w-[1440px] mx-auto space-y-6">
        
        {/* Dashboard Header Banner */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
          <div>
            <h2 className="font-display font-medium text-2xl md:text-3xl text-[#d3e4fe]">
              System Dashboard
            </h2>
            <p className="text-[#c2c6d6] text-xs md:text-sm">
              Intelligent document processing is running at peak performance.
            </p>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="font-mono text-[10px] text-[#adc6ff] uppercase tracking-wider">Cognitive Cluster</span>
            <span className="text-xs font-semibold text-[#d3e4fe] flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Operational
            </span>
          </div>
        </div>

        {/* Stats Grid Rows */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Docs Uploaded */}
          <div className="glass-card p-6 rounded-xl flex items-center gap-4 animate-fade-in">
            <div className="w-12 h-12 rounded-lg bg-[#adc6ff]/10 flex items-center justify-center text-[#adc6ff]">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="font-mono text-[10px] text-[#c2c6d6] uppercase tracking-wider">Docs Uploaded</p>
              <h3 className="font-display text-2xl font-bold text-[#d3e4fe]">{documents.length}</h3>
            </div>
          </div>

          {/* Card 2: AI Queries */}
          <div className="glass-card p-6 rounded-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#ffb786]/10 flex items-center justify-center text-[#ffb786]">
              <Bolt className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="font-mono text-[10px] text-[#c2c6d6] uppercase tracking-wider">AI Queries Run</p>
              <h3 className="font-display text-2xl font-bold text-[#d3e4fe]">
                {activities.filter(a => a.icon === "chat_bubble" || a.text.includes("Chat") || a.text.includes("analysis") || a.text.includes("Analysis")).length}
              </h3>
            </div>
          </div>

          {/* Card 3: Token Usage indicator bar */}
          <div className="glass-card p-6 rounded-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#4b4a53]/40 flex items-center justify-center text-[#c2c6d6]">
              <Database className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-end mb-1.5">
                <p className="font-mono text-[10px] text-[#c2c6d6] uppercase tracking-wider">Token Allocation</p>
                <span className="font-mono text-xs text-[#adc6ff] font-bold">
                  {documents.length > 0 ? `${Math.min(100, documents.length * 12)}%` : "0%"}
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#1b2b3f] rounded-full overflow-hidden">
                <div className="h-full bg-[#adc6ff] transition-all duration-500" style={{ width: documents.length > 0 ? `${Math.min(100, documents.length * 12)}%` : "0%" }}></div>
              </div>
            </div>
          </div>

        </section>

        {/* Bento Board: Main Content Splitting */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* LEFT 8 COLUMNS: Recent Documents */}
          <section className="col-span-12 lg:col-span-8 space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-[#d3e4fe] flex items-center gap-2">
                <History className="w-4 h-4 text-[#adc6ff]" />
                <span>Recent Documents</span>
              </h3>
              <button 
                onClick={() => onNavigate("Library")}
                className="text-[#adc6ff] hover:text-[#d3e4fe] transition-colors text-xs font-semibold cursor-pointer"
              >
                View Library
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Document Cards Mapping */}
              {documents.slice(0, 3).map((doc) => {
                const isPdf = doc.type.toLowerCase().includes("pdf");
                return (
                  <div 
                    key={doc.id}
                    onClick={() => {
                      onSelectDoc(doc);
                      onNavigate("Chat");
                    }}
                    className="glass-card p-5 rounded-xl flex flex-col justify-between h-full cursor-pointer relative"
                  >
                    <div>
                      {/* Card Header information */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded flex items-center justify-center ${isPdf ? "bg-red-500/10 text-red-400" : "bg-[#4d8eff]/10 text-[#adc6ff]"}`}>
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="max-w-[140px]">
                            <h4 className="font-display text-xs font-bold text-[#d3e4fe] leading-tight truncate">{doc.name}</h4>
                            <p className="font-mono text-[9px] text-[#c2c6d6]/60 uppercase mt-0.5">{doc.type.split("/")[1] || "DOCX"}</p>
                          </div>
                        </div>
                        
                        {/* Status Label badge */}
                        <div className="text-[10px]">
                          {doc.status === "Risk Detected" ? (
                            <span className="bg-[#93000a]/20 text-[#ffdad6] border border-[#ffb4ab]/20 px-2 py-0.5 rounded font-mono text-[9px]">
                              RISK
                            </span>
                          ) : doc.status === "Processing" ? (
                            <span className="bg-[#1b2b3f] text-[#c2c6d6] border border-[#424754]/50 px-2 py-0.5 rounded font-mono text-[9px] animate-pulse">
                              PRCS
                            </span>
                          ) : (
                            <span className="bg-emerald-950/20 text-[#adc6ff] border border-emerald-400/20 px-2 py-0.5 rounded font-mono text-[9px]">
                              READY
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Summary Section */}
                      <div className="bg-[#102034]/50 p-3 rounded-lg border border-[#424754]/20 mb-4 text-left">
                        <p className="font-mono text-[8px] text-[#adc6ff] font-bold tracking-widest uppercase mb-1">AI INSIGHT</p>
                        <p className="text-xs text-[#c2c6d6] italic leading-relaxed line-clamp-3">
                          "{doc.summary}"
                        </p>
                      </div>
                    </div>

                    {/* Metadata tags bottom row */}
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#424754]/10">
                      <div className="flex gap-1">
                        {doc.tags.map((tag, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-[#26364a]/50 text-[#c2c6d6] rounded text-[9px] font-mono border border-[#424754]/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="font-mono text-[9px] text-[#c2c6d6]/40">{doc.date}</span>
                    </div>

                  </div>
                );
              })}

              {/* Box Trigger Dropzone card */}
              <div 
                id="dashboard-upload-card"
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (!target.closest("button")) {
                    document.getElementById("dashboard-file-picker")?.click();
                  }
                }}
                className={`border-2 border-dashed border-[#424754]/50 hover:border-[#adc6ff] hover:bg-[#adc6ff]/5 rounded-xl flex flex-col items-center justify-center p-8 text-center group cursor-pointer transition-all min-h-[240px] ${documents.length === 0 ? "col-span-1 md:col-span-2 bg-[#0c1b2f]/30" : ""}`}
              >
                <input
                  type="file"
                  id="dashboard-file-picker"
                  className="hidden"
                  accept=".txt,.doc,.docx,.pdf,.xlsx"
                  onChange={handleFileChange}
                />
                
                <div className="flex gap-2">
                  <div 
                    className="w-10 h-10 rounded-full bg-[#1b2b3f] flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Upload className="w-5 h-5 text-[#c2c6d6] group-hover:text-[#adc6ff]" />
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setPasteModalOpen(true);
                    }}
                    className="w-10 h-10 rounded-full bg-[#1b2b3f] flex items-center justify-center hover:scale-110 transition-transform"
                    title="Paste plain document text"
                  >
                    <Sparkles className="w-5 h-5 text-[#ffb786]" />
                  </button>
                </div>

                <p className="font-display text-sm font-semibold text-[#d3e4fe] mt-3 group-hover:text-[#adc6ff] transition-colors">
                  Upload Document Asset
                </p>
                <p className="text-xs text-[#c2c6d6]/60 mt-1 max-w-[180px]">
                  Supports PDF or TXT up to 50MB. Click anywhere to select file.
                </p>
              </div>

            </div>
          </section>

          {/* RIGHT 4 COLUMNS: Live System logs */}
          <section className="col-span-12 lg:col-span-4 space-y-4">
            
            <h3 className="font-display text-base font-semibold text-[#d3e4fe] flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#adc6ff]" />
              <span>Live Activity Logs</span>
            </h3>

            {/* List Activity Container */}
            <div className="glass-panel rounded-xl overflow-hidden divide-y divide-[#424754]/30">
              {activities.slice(0, 5).map((act, index) => {
                const isError = act.type === "error";
                const isSuccess = act.type === "success";
                const isWarning = act.type === "warning";
                
                return (
                  <div key={act.id || index} className="p-3.5 flex gap-3 hover:bg-[#26364a]/20 transition-colors text-left text-xs text-[#d3e4fe]">
                    <div className="mt-0.5 shrink-0">
                      <span className={`p-1.5 rounded-full block ${
                        isError ? "bg-red-500/10 text-red-400" :
                        isSuccess ? "bg-emerald-500/10 text-emerald-400" :
                        isWarning ? "bg-amber-500/10 text-amber-400" :
                        "bg-[#4d8eff]/10 text-[#adc6ff]"
                      }`}>
                        <Sparkles className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <div>
                      <p className="font-sans text-[#d3e4fe]">
                        {act.text}
                      </p>
                      <p className="font-mono text-[9px] text-[#c2c6d6]/50 mt-1 uppercase tracking-widest">{act.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Knowledge base card promotion */}
            <div className="glass-card p-5 rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent relative overflow-hidden group border border-emerald-500/20 text-left">
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <h4 className="font-display text-sm font-bold text-[#d3e4fe]">Advanced RAG Enabled</h4>
                </div>
                <p className="text-[#c2c6d6] text-xs mb-4 leading-relaxed">
                  Multi-document semantic grounding, cross-contract compliance matching, and private LLM routing is active.
                </p>
                <div 
                  onClick={() => onNavigate("Library")}
                  className="font-mono text-[10px] font-bold text-emerald-400 flex items-center gap-1 cursor-pointer group-hover:gap-2 transition-all uppercase tracking-wider"
                >
                  <span>Launch Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
            </div>

          </section>

        </div>

      </div>

      {/* PASTE PLAIN DOCUMENT TEXT MODAL */}
      {pasteModalOpen && (
        <div className="fixed inset-0 bg-[#000f21]/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <form 
            onSubmit={handlePasteSubmit}
            className="w-full max-w-lg bg-[#102034] rounded-2xl p-6 border border-[#424754] text-left space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#424754]/30 pb-3">
              <h3 className="font-display font-bold text-base text-[#adc6ff] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#ffb786]" />
                <span>Analyse New Document</span>
              </h3>
              <button 
                type="button" 
                onClick={() => setPasteModalOpen(false)}
                className="text-[#c2c6d6] hover:text-[#d3e4fe] font-bold font-mono text-sm"
              >
                [ESC]
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#c2c6d6]">File Title / Metadata Name</label>
              <input
                type="text"
                required
                placeholder="e.g., Service_Contract_Addendum.txt"
                value={pasteDocName}
                onChange={(e) => setPasteDocName(e.target.value)}
                className="w-full bg-[#0b1c30] border border-[#424754]/60 rounded-xl px-4 py-2 text-xs text-[#d3e4fe] placeholder:text-[#c2c6d6]/40 focus:ring-1 focus:ring-[#adc6ff] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#c2c6d6]">Document Core Contents</label>
              <textarea
                required
                rows={8}
                placeholder="Paste the plain text transcript, agreement clauses, or project guidelines here. We will query Google Gemini 3.5 AI Core to compose summaries, list compliance key dates, and isolate core liabilities..."
                value={pasteDocContent}
                onChange={(e) => setPasteDocContent(e.target.value)}
                className="w-full bg-[#0b1c30] border border-[#424754]/60 rounded-xl p-4 text-xs text-[#d3e4fe] placeholder:text-[#c2c6d6]/40 focus:ring-1 focus:ring-[#adc6ff] focus:outline-none resize-none custom-scrollbar"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPasteModalOpen(false)}
                className="px-4 py-2 border border-[#424754] rounded-lg text-xs text-[#c2c6d6] hover:bg-[#26364a]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#adc6ff] text-[#002e6a] font-bold rounded-lg text-xs hover:brightness-110 flex items-center gap-1.5 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-[#002e6a]" />
                <span>Begin Analysis</span>
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
