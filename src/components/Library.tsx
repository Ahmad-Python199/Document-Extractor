import React, { useState } from "react";
import { 
  FolderOpen, 
  Trash2, 
  Eye, 
  MessageSquare, 
  FileText, 
  Tag, 
  Filter, 
  Sparkles,
  Calendar,
  AlertTriangle,
  FlameKindling
} from "lucide-react";
import { DocumentItem } from "../types";

interface LibraryProps {
  documents: DocumentItem[];
  onSelectDoc: (doc: DocumentItem) => void;
  onNavigateToChat: () => void;
  onDeleteDoc: (id: string) => void;
}

export default function Library({ 
  documents, 
  onSelectDoc, 
  onNavigateToChat, 
  onDeleteDoc 
}: LibraryProps) {
  const [filterType, setFilterType] = useState<"ALL" | "PDF" | "WORD">("ALL");
  const [filterQuery, setFilterQuery] = useState("");

  const filteredDocs = documents.filter((doc) => {
    // Type checking
    if (filterType === "PDF" && !doc.type.toLowerCase().includes("pdf")) return false;
    if (filterType === "WORD" && !doc.type.toLowerCase().includes("word")) return false;

    // Search checking
    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase();
      const termMatch = doc.name.toLowerCase().includes(q) || 
                        doc.summary.toLowerCase().includes(q) ||
                        doc.tags.some(t => t.toLowerCase().includes(q)) ||
                        doc.risks.some(r => r.toLowerCase().includes(q));
      if (!termMatch) return false;
    }

    return true;
  });

  return (
    <div id="document-library" className="flex-grow pt-24 px-6 pb-12 overflow-y-auto h-screen custom-scrollbar font-sans bg-[#031427]">
      <div className="max-w-[1440px] mx-auto space-y-6">
        
        {/* Library Welcome Header */}
        <div className="text-left">
          <h2 className="font-display font-medium text-2xl md:text-3xl text-[#d3e4fe] flex items-center gap-2.5">
            <FolderOpen className="w-6 h-6 text-[#adc6ff]" />
            <span>Document Intelligence Library</span>
          </h2>
          <p className="text-[#c2c6d6] text-xs md:text-sm mt-1">
            Browse corporate legal agreements, extract insights, and evaluate liability caps across {documents.length} secure documents.
          </p>
        </div>

        {/* Tab Filters and Search Action bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#102034]/40 p-4 rounded-xl border border-[#424754]/30">
          
          {/* Quick Tabs filters */}
          <div className="flex items-center gap-2 select-none">
            <button
              onClick={() => setFilterType("ALL")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                filterType === "ALL" 
                  ? "bg-[#4d8eff]/20 text-[#adc6ff]" 
                  : "text-[#c2c6d6] hover:text-[#d3e4fe] hover:bg-[#26364a]/40"
              }`}
            >
              All Formats
            </button>
            <button
              onClick={() => setFilterType("PDF")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                filterType === "PDF" 
                  ? "bg-[#4d8eff]/20 text-[#adc6ff]" 
                  : "text-[#c2c6d6] hover:text-[#d3e4fe] hover:bg-[#26364a]/40"
              }`}
            >
              PDF Assets
            </button>
            <button
              onClick={() => setFilterType("WORD")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                filterType === "WORD" 
                  ? "bg-[#4d8eff]/20 text-[#adc6ff]" 
                  : "text-[#c2c6d6] hover:text-[#d3e4fe] hover:bg-[#26364a]/40"
              }`}
            >
              Word Documents
            </button>
          </div>

          {/* Table search sub-field */}
          <div className="flex items-center gap-2 w-full sm:w-72">
            <input
              type="text"
              placeholder="Search table matrix..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full bg-[#0b1c30] border border-[#424754]/70 rounded-lg px-3 py-1.5 text-xs text-[#d3e4fe] placeholder:text-[#c2c6d6]/40 focus:outline-none focus:ring-1 focus:ring-[#adc6ff]"
            />
          </div>

        </div>

        {/* Unified Table view of Documents */}
        <div className="glass-panel rounded-xl overflow-hidden border border-[#424754]/40 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-[#d3e4fe] text-xs text-left">
              
              {/* Table Column headers */}
              <thead className="bg-[#102034]/70 border-b border-[#424754]/40 uppercase font-mono text-[10px] tracking-widest text-[#adc6ff] select-none h-11">
                <tr>
                  <th className="px-6 py-3 font-semibold">Asset Title</th>
                  <th className="px-6 py-3 font-semibold">Format & Size</th>
                  <th className="px-6 py-3 font-semibold">Extracted Date</th>
                  <th className="px-6 py-3 font-semibold">Risk Class</th>
                  <th className="px-6 py-3 font-semibold">Identified Hazards</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>

              {/* Rows List */}
              <tbody className="divide-y divide-[#424754]/20">
                {filteredDocs.length > 0 ? (
                  filteredDocs.map((doc) => {
                    const isPdf = doc.type.toLowerCase().includes("pdf");
                    const hasRisks = doc.risks.length > 0;
                    
                    return (
                      <tr 
                        key={doc.id}
                        className="hover:bg-[#26364a]/30 transition-colors group cursor-pointer h-16"
                        onClick={() => {
                          onSelectDoc(doc);
                          onNavigateToChat();
                        }}
                      >
                        
                        {/* Title column with icons */}
                        <td className="px-6 py-4 font-semibold max-w-[240px]">
                          <div className="flex items-center gap-3">
                            <span className={`p-1.5 rounded ${isPdf ? "bg-red-500/10 text-red-400" : "bg-[#4d8eff]/10 text-[#adc6ff]"}`}>
                              <FileText className="w-4 h-4" />
                            </span>
                            <div className="truncate">
                              <span className="group-hover:text-[#adc6ff] font-medium transition-colors">{doc.name}</span>
                              <p className="text-[10px] text-[#c2c6d6]/60 line-clamp-1 mt-0.5" title={doc.summary}>
                                {doc.summary}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Type & Size Column */}
                        <td className="px-6 py-4 font-mono text-[11px] text-[#c2c6d6]">
                          <span className="uppercase text-white font-bold bg-[#1b2b3f] px-2 py-0.5 rounded mr-1">
                            {doc.type.split("/")[1] || "DOCX"}
                          </span>
                          {doc.size}
                        </td>

                        {/* Upload Date column */}
                        <td className="px-6 py-4 text-[#c2c6d6] font-mono text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#c2c6d6]/40" />
                            <span>{doc.date}</span>
                          </div>
                        </td>

                        {/* Risk Status evaluation indicators */}
                        <td className="px-6 py-4">
                          {doc.status === "Risk Detected" ? (
                            <span className="bg-[#93000a]/35 text-[#ffdad6] border border-[#ffb4ab]/20 px-2.5 py-0.5 rounded-full font-bold font-mono text-[9px] uppercase tracking-wide">
                              Risk Detected
                            </span>
                          ) : doc.status === "Processing" ? (
                            <span className="bg-amber-950/20 text-amber-300 border border-amber-400/20 px-2.5 py-0.5 rounded-full font-bold font-mono text-[9px] uppercase tracking-wide animate-pulse">
                              Processing...
                            </span>
                          ) : (
                            <span className="bg-emerald-950/20 text-emerald-400 border border-emerald-400/20 px-2.5 py-0.5 rounded-full font-bold font-mono text-[9px] uppercase tracking-wide">
                              Safe / Verified
                            </span>
                          )}
                        </td>

                        {/* Risks Lists column mapping */}
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {hasRisks ? (
                              doc.risks.map((risk, idx) => (
                                <span 
                                  key={idx} 
                                  className="bg-amber-900/40 text-amber-200 text-[9px] px-1.5 py-0.5 rounded font-bold border border-amber-300/15"
                                >
                                  {risk}
                                </span>
                              ))
                            ) : (
                              <span className="text-[10px] text-[#c2c6d6]/40 italic">None found</span>
                            )}
                          </div>
                        </td>

                        {/* Action buttons on the right column */}
                        <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-2.5">
                            {/* Analyze button link */}
                            <button
                              onClick={() => {
                                onSelectDoc(doc);
                                onNavigateToChat();
                              }}
                              className="p-1 px-2.5 hover:bg-[#adc6ff]/10 text-[#adc6ff] rounded font-semibold text-[10px] uppercase flex items-center gap-1 transition-all"
                              title="Start semantic conversational evaluation"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Analyze</span>
                            </button>

                            {/* Delete Button */}
                            <button
                              id={`lib-delete-btn-${doc.id}`}
                              onClick={() => onDeleteDoc(doc.id)}
                              className="p-1.5 bg-red-950/10 text-red-400 hover:bg-red-500/10 rounded transition-colors cursor-pointer"
                              title="Delete document asset"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })
                ) : (
                  /* Zero items search row fallback */
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[#c2c6d6]/60">
                      <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2 animate-bounce" />
                      <p className="font-semibold text-sm">No matching elements found in standard search matrix.</p>
                      <p className="text-xs text-[#c2c6d6]/40 mt-1">Try refining your structural keywords or tags.</p>
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
