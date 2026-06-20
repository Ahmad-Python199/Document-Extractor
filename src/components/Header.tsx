import React, { useState } from "react";
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Sparkles, 
  FileText,
  Upload,
  ChevronRight,
  User,
  Settings
} from "lucide-react";
import { ActiveScreen, DocumentItem } from "../types";

interface HeaderProps {
  activeScreen: ActiveScreen;
  activeDoc: DocumentItem | null;
  documents: DocumentItem[];
  onSelectDoc: (doc: DocumentItem) => void;
  onGenerateSummary: () => void;
  onSearchChange: (search: string) => void;
  onTriggerUpload: () => void;
  onNavigate?: (screen: ActiveScreen) => void;
}

export default function Header({ 
  activeScreen, 
  activeDoc, 
  documents, 
  onSelectDoc, 
  onGenerateSummary,
  onSearchChange,
  onTriggerUpload,
  onNavigate
}: HeaderProps) {
  const [docDropdownOpen, setDocDropdownOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchVal(val);
    onSearchChange(val);
  };

  return (
    <header id="documind-header" className="fixed top-0 right-0 w-[calc(100%-280px)] h-16 bg-[#031427]/80 border-b border-[#424754]/40 backdrop-blur-md flex justify-between items-center px-6 z-40">
      
      {/* LEFT SECTION (CONTEXTUAL) */}
      <div className="flex items-center gap-4 flex-1">
        {activeScreen === "Chat" && activeDoc ? (
          <div className="flex items-center gap-3">
            {/* Document Selector Dropdown */}
            <div className="relative">
              <button 
                id="header-doc-selector"
                onClick={() => setDocDropdownOpen(!docDropdownOpen)}
                className="flex items-center gap-2 bg-[#1b2b3f] hover:bg-[#26364a] px-4 py-1.5 rounded-full border border-[#424754]/50 cursor-pointer text-sm text-[#d3e4fe] transition-colors"
              >
                <FileText className="w-4 h-4 text-[#adc6ff]" />
                <span className="font-semibold max-w-[180px] truncate">{activeDoc.name}</span>
                <ChevronDown className="w-4 h-4 text-[#c2c6d6]" />
              </button>

              {docDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-64 bg-[#102034] border border-[#424754] rounded-xl shadow-2xl overflow-hidden z-50">
                  <p className="px-4 py-2 text-[10px] uppercase tracking-widest text-[#adc6ff] font-mono border-b border-[#424754]/30">Select Document</p>
                  <div className="max-h-60 overflow-y-auto custom-scrollbar divide-y divide-[#424754]/20">
                    {documents.map((doc) => (
                      <button
                        key={doc.id}
                        onClick={() => {
                          onSelectDoc(doc);
                          setDocDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-xs text-[#d3e4fe] hover:bg-[#26364a] flex items-center justify-between transition-colors ${
                          doc.id === activeDoc.id ? "bg-[#4d8eff]/10 text-[#adc6ff]" : ""
                        }`}
                      >
                        <span className="font-semibold truncate">{doc.name}</span>
                        <span className="font-mono text-[9px] text-[#c2c6d6]/60">{doc.size}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Generate Summary Trigger */}
            <button
              id="header-generate-summary-btn"
              onClick={onGenerateSummary}
              className="bg-[#adc6ff] text-[#002e6a] font-semibold text-xs px-4 py-1.5 rounded-full hover:bg-[#adc6ff]/90 transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-[#adc6ff]/10 hover:shadow-cyan-400/5 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate Summary</span>
            </button>
          </div>
        ) : (
          /* Search Input for Dashboard and Library grids */
          <div className="relative w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#c2c6d6]" />
            <input
              id="header-search-input"
              type="text"
              placeholder={activeScreen === "Library" ? "Search across documents..." : "Search documents..."}
              value={searchVal}
              onChange={handleSearch}
              className="w-full bg-[#0b1c30] border border-[#424754]/60 rounded-lg pl-10 pr-4 py-1.5 text-xs text-[#d3e4fe] placeholder:text-[#c2c6d6]/50 focus:ring-2 focus:ring-[#adc6ff] focus:outline-none transition-all"
            />
          </div>
        )}
      </div>

      {/* RIGHT SECTION (SHARED USER PANEL) */}
      <div className="flex items-center gap-4">
        {/* Optional quick upload action button */}
        {(activeScreen === "Library" || activeScreen === "Dashboard") && (
          <button
            id="header-quick-upload-btn"
            onClick={onTriggerUpload}
            className="bg-[#adc6ff] text-[#002e6a] text-xs font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload</span>
          </button>
        )}

        <div className="h-6 w-px bg-[#424754]/50 hidden sm:block"></div>

        {/* Notifications Icon Button */}
        <button className="relative text-[#c2c6d6] hover:text-[#adc6ff] transition-colors p-1">
          <Bell className="w-4 h-4" />
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#df7412] animate-ping" />
        </button>

        {/* Settings Icon Button */}
        <button 
          onClick={() => onNavigate?.("Settings")}
          className="text-[#c2c6d6] hover:text-[#adc6ff] transition-colors p-1"
          title="Workspace Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        <div className="h-6 w-px bg-[#424754]/50"></div>

        {/* User Identity Info card */}
        <div 
          onClick={() => onNavigate?.("Settings")}
          className="flex items-center gap-2 group cursor-pointer"
          title="Profile Settings"
        >
          <div className="w-8 h-8 rounded-full bg-[#1b2b3f] flex items-center justify-center border border-[#adc6ff]/30 hover:border-[#adc6ff] transition-all">
            <User className="w-4 h-4 text-[#adc6ff]" />
          </div>
          <span className="font-sans text-xs font-semibold text-[#d3e4fe] hidden sm:block">Free User</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#c2c6d6]" />
        </div>
      </div>
    </header>
  );
}
