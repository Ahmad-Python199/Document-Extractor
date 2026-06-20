import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  Paperclip, 
  Mic, 
  Send, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  Printer, 
  Maximize2,
  Info,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  BookOpen
} from "lucide-react";
import { DocumentItem, ChatMessage } from "../types";

interface ChatInterfaceProps {
  activeDoc: DocumentItem | null;
  onRefreshActivities: () => void;
}

export default function ChatInterface({ activeDoc, onRefreshActivities }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMsg, setInputMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Suggestion chips templates
  const suggestions = [
    "Analyze liability caps",
    "Identify automatic renewals",
    "Generate brief executive summary"
  ];

  // Load chat history whenever activeDoc changes
  useEffect(() => {
    if (!activeDoc) return;
    
    const loadHistory = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/chat/${activeDoc.id}`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data.history || []);
        }
      } catch (err) {
        console.error("Failed to load chat history:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, [activeDoc]);

  // Scroll chat stream to bottom when message arrives
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || !activeDoc) return;

    // Append client message locally first
    const clientMsg: ChatMessage = {
      id: `msg-client-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, clientMsg]);
    setInputMsg("");
    setIsLoading(true);

    try {
      const res = await fetch(`/api/chat/${activeDoc.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend })
      });

      if (res.ok) {
        const aiMsg = await res.json();
        setMessages((prev) => [...prev, aiMsg]);
        onRefreshActivities();
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!activeDoc) {
    return (
      <div className="flex-grow pt-24 px-6 flex items-center justify-center text-center h-screen bg-[#031427] font-sans">
        <div className="glass-panel p-8 rounded-2xl max-w-md border border-[#424754]/40">
          <BookOpen className="w-12 h-12 text-[#adc6ff] mx-auto mb-4 animate-bounce" />
          <h3 className="font-display font-bold text-lg text-[#d3e4fe]">No Document Loaded</h3>
          <p className="text-xs text-[#c2c6d6] mt-2 mb-6">
            Please navigate to the System Dashboard or the Document Library to select an asset for interactive Q&A.
          </p>
        </div>
      </div>
    );
  }

  const renderHighlightedContent = (content: string) => {
    if (!content) return "";
    
    const quotes: string[] = [];
    const aiMessages = messages.filter(m => m.sender === "ai");
    if (aiMessages.length > 0) {
      const lastAiMsg = aiMessages[aiMessages.length - 1];
      const matches = lastAiMsg.text.match(/"([^"]+)"/g);
      if (matches) {
        matches.forEach(m => {
          const clean = m.replace(/^"|"$/g, "").trim();
          if (clean.length > 8) {
            quotes.push(clean);
          }
        });
      }
    }
    
    if (quotes.length === 0) {
      const userMessages = messages.filter(m => m.sender === "user");
      if (userMessages.length > 0) {
        const lastUserMsg = userMessages[userMessages.length - 1];
        const keywords = lastUserMsg.text
          .toLowerCase()
          .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
          .split(/\s+/)
          .filter(w => w.length > 3 && !["what", "your", "this", "that", "with", "from", "have", "here", "about", "query"].includes(w));
          
        if (keywords.length > 0) {
          try {
            const sortedKeywords = (Array.from(new Set(keywords)) as string[]).sort((a, b) => b.length - a.length);
            const regexStr = sortedKeywords.map(k => k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join("|");
            const regex = new RegExp(`\\b(${regexStr})\\b`, "gi");
            
            const parts = content.split(regex);
            const lowerKeywords = sortedKeywords.map(k => k.toLowerCase());
            return (
              <>
                {parts.map((part, index) => {
                  const isMatch = lowerKeywords.includes(part.toLowerCase());
                  return isMatch ? (
                    <mark key={index} className="bg-[#4d8eff]/30 text-white px-0.5 rounded font-semibold border-b border-[#4d8eff]/50">
                      {part}
                    </mark>
                  ) : (
                    part
                  );
                })}
              </>
            );
          } catch (e) {
            return content;
          }
        }
      }
      return content;
    }
    
    try {
      const sortedQuotes = (Array.from(new Set(quotes)) as string[]).sort((a, b) => b.length - a.length);
      const regexStr = sortedQuotes.map(q => q.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join("|");
      const regex = new RegExp(`(${regexStr})`, "gi");
      
      const parts = content.split(regex);
      return (
        <>
          {parts.map((part, index) => {
            const isMatch = sortedQuotes.some(q => q.toLowerCase() === part.toLowerCase());
            return isMatch ? (
              <mark key={index} className="bg-amber-500/25 text-[#ffb786] px-1 rounded font-bold border-b border-amber-500">
                {part}
              </mark>
            ) : (
              part
            );
          })}
        </>
      );
    } catch (e) {
      return content;
    }
  };

  // Pre-compiled highlighted elements rendering for the MSA screen (Screen 1 high fidelity mimic)
  const isMsa = activeDoc.id === "msa-final";
  const isSupplier = activeDoc.id === "supplier-agreement";

  return (
    <div id="split-chat-workspace" className="flex-grow pt-16 flex h-screen bg-[#031427] overflow-hidden font-sans">
      
      {/* LEFT SIDEBAR: Document Preview layout */}
      <div className="w-1/2 border-r border-[#424754]/40 flex flex-col h-full bg-[#040f1a] relative">
        
        {/* Document Panel Header */}
        <div className="px-4 py-2 border-b border-[#424754]/30 flex items-center justify-between bg-[#102034]/50">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#adc6ff]" />
            <span className="text-xs font-mono font-semibold text-[#adc6ff] uppercase tracking-wider">Document Workspace Preview</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#4d8eff] animate-ping"></span>
            <span className="text-[10px] font-mono text-[#c2c6d6]">OCR Enhanced Mode</span>
          </div>
        </div>

        {/* Document Frame / Text Canvas */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div 
            id="doc-view-canvas"
            className="w-full bg-[#0b1c30] border border-[#424754]/40 rounded-xl p-8 text-left shadow-2xl relative select-text transition-all origin-top duration-200"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
          >
            {/* Visual scan line if doc is processing */}
            {activeDoc.status === "Processing" && (
              <div className="absolute inset-x-0 h-0.5 bg-[#adc6ff] shadow-[0_0_10px_#adc6ff] top-1/4 animate-scan pointer-events-none" />
            )}

            <div className="prose prose-invert max-w-none text-xs leading-relaxed text-[#c2c6d6] font-sans h-full space-y-4">
              
              {/* Dynamic highlights for high fidelity mockups described in prompt */}
              {isMsa ? (
                <>
                  <h4 className="font-mono text-center font-bold tracking-tight text-[#d3e4fe] border-b border-[#424754]/40 pb-2">
                    MASTER SERVICES AGREEMENT<br />
                    <span className="text-[10px] text-[#adc6ff]">VERSION 4.2 // SECURITY CLEARANCE: HIGH</span>
                  </h4>
                  <p className="mt-4 font-semibold text-[#d3e4fe]">
                    This Master Services Agreement ("Agreement") is entered into as of October 12, 2024, by and between DocuMind Systems Inc. ("Provider") and Global Enterprise Corp ("Client").
                  </p>
                  
                  <div className="pt-2">
                    <p className="font-bold text-[#adc6ff] uppercase text-[10px] tracking-wider mb-1">1. SERVICE DEFINITIONS</p>
                    <p>The Provider shall deliver cloud-based document processing services as specified in Exhibit A. All processing occurs in ISO 27001 certified environments with end-to-end encryption for all data at rest and in transit.</p>
                  </div>

                  <div className="pt-2 relative group">
                    <p className="font-bold text-[#adc6ff] uppercase text-[10px] tracking-wider mb-1">2. TERMINATION & RENEWAL</p>
                    <p>
                      Either party may terminate this agreement with 60 days written notice.{" "}
                      <span 
                        id="highlight-clause-renewal"
                        onMouseEnter={() => setShowTooltip("renewal")}
                        onMouseLeave={() => setShowTooltip(null)}
                        className="highlight-warning cursor-help"
                      >
                        Automatic renewal triggers 30 days prior to expiry
                      </span>{" "}
                      unless explicit opt-out is provided via certified mail to the administrative contact listed in Section 14.2.
                    </p>
                    {showTooltip === "renewal" && (
                      <div className="absolute top-12 left-0 w-80 bg-[#102034] border border-[#ffb4ab]/30 p-3 rounded-lg shadow-2xl z-50 animate-in fade-in duration-100">
                        <p className="font-bold text-xs text-[#ffb4ab] flex items-center gap-1.5 mb-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Renewal Risk Flag</span>
                        </p>
                        <p className="text-[10px] text-[#ffdad6] leading-relaxed">
                          Warning: Automatic renewal risk. Renewals trigger unless 30-day opt-out is sent explicitly via physical certified mail.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 relative">
                    <p className="font-bold text-[#adc6ff] uppercase text-[10px] tracking-wider mb-1">3. LIABILITY & INDEMNIFICATION</p>
                    <p>
                      Except in cases of gross negligence,{" "}
                      <span 
                        id="highlight-clause-liability"
                        onMouseEnter={() => setShowTooltip("liability")}
                        onMouseLeave={() => setShowTooltip(null)}
                        className="highlight-blue cursor-help"
                      >
                        the total liability of either party for any single claim arising under this Agreement shall not exceed $5,000,000 USD.
                      </span>{" "}
                      The Client agrees to indemnify the Provider against third-party claims resulting from misuse of the API endpoints provided.
                    </p>
                    {showTooltip === "liability" && (
                      <div className="absolute top-12 left-0 w-80 bg-[#102034] border border-[#adc6ff]/30 p-3 rounded-lg shadow-2xl z-50 animate-in fade-in duration-100">
                        <p className="font-bold text-xs text-[#adc6ff] flex items-center gap-1.5 mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Indemnification Check</span>
                        </p>
                        <p className="text-[10px] text-[#d3e4fe] leading-relaxed">
                          Risk Assess: Indemnification limit set at $5,000,000 USD. Successfully matches enterprise audit parameters.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <p className="font-bold text-[#adc6ff] uppercase text-[10px] tracking-wider mb-1">4. INTELLECTUAL PROPERTY</p>
                    <p>DocuMind AI retains all rights to the underlying machine learning models used to process the Client's data. No transfer of algorithmic ownership is implied or granted under this Agreement.</p>
                  </div>
                </>
              ) : isSupplier ? (
                <>
                  <h4 className="font-mono text-center font-bold text-[#d3e4fe] border-b border-[#424754]/40 pb-2">
                    SUPPLIER AGREEMENT V2.0<br />
                    <span className="text-[9px] text-[#ffb786]">UNILATERAL CLAUSE RISK FLAG STATUS</span>
                  </h4>
                  <p className="mt-4 font-semibold text-[#d3e4fe]">
                    VendorTech Logistical Systems ("Supplier") and DocuMind Systems Inc. ("Customer") agree to terms of pricing as described.
                  </p>
                  
                  <div className="pt-2">
                    <p className="font-bold text-[#ffb786] text-[10px]">CLAUSE 5. PRICING AND PAYMENTS:</p>
                    <p>
                      The customer agrees to pay all invoices within 15 days of receipt. Unpaid invoices accumulate a late penalty rate of{" "}
                      <span className="highlight-warning">1.5% interest per month.</span>
                    </p>
                  </div>

                  <div className="pt-2">
                    <p className="font-bold text-[#ffb786] text-[10px]">CLAUSE 9. PRICE ADJUSTMENTS:</p>
                    <p>
                      Supplier reserves{" "}
                      <span className="highlight-warning">absolute rights to adjust service subscriptions unilaterally</span>{" "}
                      on 10 days notice based on external macroeconomic indexations.
                    </p>
                  </div>

                  <div className="pt-2">
                    <p className="font-bold text-[#ffb786] text-[10px]">CLAUSE 12. DURATION & TERMINATION:</p>
                    <p>
                      This agreement is effective for 12 months. Unilateral termination by Customer without cause is subject to a{" "}
                      <span className="highlight-blue">$50,000 buyout penalty fee.</span>
                    </p>
                  </div>
                </>
              ) : (
                /* Dynamic standard document format */
                <div className="whitespace-pre-line text-xs leading-relaxed font-sans select-all p-2">
                  <h3 className="font-display font-bold text-sm text-[#d3e4fe] border-b border-[#424754]/30 pb-2 mb-4">{activeDoc.name}</h3>
                  {renderHighlightedContent(activeDoc.content)}
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Floating Tooltips and Help Indicators */}
        {isMsa && (
          <div className="absolute bottom-16 left-6 right-6 bg-[#102034]/90 p-3 rounded-lg border border-[#424754]/40 backdrop-blur flex items-center gap-3">
            <Lightbulb className="w-5 h-5 text-[#adc6ff] shrink-0 animate-pulse" />
            <p className="text-[10px] text-[#c2c6d6] leading-snug">
              Hover over highlighted clauses (e.g., <span className="text-[#adc6ff] font-bold">Auto Renewal</span> or <span className="text-amber-400 font-bold">Total Liability</span>) to inspect cognitive risk classifications.
            </p>
          </div>
        )}

        {/* Paper controls Footer row */}
        <div className="h-12 border-t border-[#424754]/40 bg-[#0b1c30] flex items-center justify-between px-6 z-10 select-none">
          <div className="flex items-center gap-4 text-[#c2c6d6]/80 text-xs">
            {/* Zoom Controls */}
            <div className="flex items-center gap-2">
              <button 
                id="preview-zoom-out"
                onClick={() => setZoom(Math.max(70, zoom - 10))} 
                className="hover:text-white"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="font-mono text-[11px] w-12 text-center">{zoom}%</span>
              <button 
                id="preview-zoom-in"
                onClick={() => setZoom(Math.min(130, zoom + 10))} 
                className="hover:text-white"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Page Indicators */}
          <div className="flex items-center gap-3">
            <button className="text-[#c2c6d6]/40 cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-[#c2c6d6]">Page {currentPage} of 1</span>
            <button className="text-[#c2c6d6]/40 cursor-not-allowed">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Prints & Print commands */}
          <div className="flex items-center gap-3 text-[#c2c6d6]/60">
            <button className="hover:text-white" title="Print document">
              <Printer className="w-4 h-4" />
            </button>
            <button className="hover:text-white" title="Maximize layout view">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* RIGHT SIDEBAR: AI Chat Panel */}
      <div className="w-1/2 flex flex-col h-full bg-[#031427] relative">
        
        {/* Chat Panel Sub-header */}
        <div className="px-6 py-3 border-b border-[#424754]/30 flex items-center justify-between bg-[#102034]/20">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#adc6ff] animate-spin-slow" />
            <h3 className="font-display font-semibold text-sm text-[#d3e4fe]">AI Assistant</h3>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-[9px] text-emerald-400 font-bold uppercase tracking-wider">Advanced RAG Enabled</span>
          </div>
        </div>

        {/* Message Streams view */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar">
          {messages.map((msg) => {
            const isAi = msg.sender === "ai";
            return (
              <div 
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${isAi ? "mr-auto text-left" : "ml-auto text-right"}`}
              >
                {/* Bubble item */}
                <div 
                  className={`p-4 rounded-2xl text-xs leading-relaxed ${
                    isAi 
                      ? "chat-bubble-ai text-[#d3e4fe] rounded-tl-none font-sans" 
                      : "bg-[#4d8eff] text-[#001a42] rounded-tr-none font-sans font-semibold"
                  }`}
                >
                  {msg.text}
                </div>

                {/* Citations row mapping (Screen 1 details) */}
                {isAi && (msg.citation || msg.refName) && (
                  <div className="flex items-center gap-1.5 mt-2 ml-1 text-[10px] font-mono text-[#c2c6d6]">
                    {msg.citation && (
                      <span className="bg-[#1b2b3f] text-[#adc6ff] px-1.5 py-0.5 rounded border border-[#adc6ff]/20">
                        {msg.citation}
                      </span>
                    )}
                    {msg.refName && (
                      <span className="text-[#c2c6d6]/60 font-semibold cursor-pointer hover:text-[#adc6ff] transition-colors underline">
                        {msg.refName}
                      </span>
                    )}
                  </div>
                )}

                {/* Timestamp */}
                <span className="text-[9px] text-[#c2c6d6]/40 mt-1 uppercase font-mono tracking-wider">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}

          {/* Loading indicator */}
          {isLoading && (
            <div className="mr-auto text-left max-w-[80%] space-y-2">
              <div className="chat-bubble-ai p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#adc6ff] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-1.5 h-1.5 bg-[#adc6ff] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-1.5 h-1.5 bg-[#adc6ff] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                <span className="font-mono text-[10px] text-[#c2c6d6]/60 uppercase ml-2 select-none">Synthesizing Gemini context answers...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Footer section */}
        <div className="p-4 border-t border-[#424754]/40 bg-[#031427] space-y-3 z-10">
          
          {/* Suggestion Starter chips */}
          <div className="flex flex-wrap gap-2 py-0.5 max-h-24 overflow-y-auto custom-scrollbar select-none justify-start">
            {suggestions.map((sug, index) => (
              <button
                key={index}
                onClick={() => handleSend(sug)}
                className="px-3 py-1 bg-[#26364a]/40 hover:bg-[#adc6ff]/10 text-xs text-[#c2c6d6] hover:text-[#adc6ff] rounded-full border border-[#424754]/50 transition-colors cursor-pointer active:scale-95 text-left"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Physical Chat Box Input Row */}
          <div className="relative">
            {/* Attachment paperclip trigger */}
            <button className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c2c6d6] hover:text-[#adc6ff] transition-colors">
              <Paperclip className="w-4 h-4" />
            </button>
            
            <input
              id="chat-user-message-input"
              type="text"
              placeholder="Ask anything about the document..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading) {
                  handleSend(inputMsg);
                }
              }}
              className="w-full bg-[#0b1c30] border border-[#424754]/80 rounded-xl py-3 pl-10 pr-20 text-xs text-[#d3e4fe] placeholder:text-[#c2c6d6]/40 focus:ring-2 focus:ring-[#adc6ff] focus:outline-none transition-all"
            />
            
            {/* Right micro / send commands */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[#c2c6d6]">
              <button className="hover:text-[#adc6ff] p-1">
                <Mic className="w-4 h-4" />
              </button>
              
              <button 
                id="chat-send-btn"
                onClick={() => handleSend(inputMsg)}
                className="bg-[#4d8eff] text-[#001a42] p-1.5 rounded-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                title="Send query"
              >
                <Send className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          </div>

          <p className="text-[10px] text-center text-[#c2c6d6]/40 font-semibold tracking-wider uppercase select-none">
            AI answers are fully grounded on your document. Ask specific questions.
          </p>
        </div>

      </div>

    </div>
  );
}
