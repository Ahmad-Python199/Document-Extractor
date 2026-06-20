import React from "react";
import { 
  LayoutDashboard, 
  MessageSquare, 
  FolderOpen, 
  Settings, 
  Plus, 
  HelpCircle, 
  LogOut,
  Info
} from "lucide-react";
import { ActiveScreen, DocumentItem } from "../types";

interface SidebarProps {
  activeScreen: ActiveScreen;
  setActiveScreen: (screen: ActiveScreen) => void;
  activeDoc: DocumentItem | null;
  onNewAnalysis: () => void;
}

export default function Sidebar({ 
  activeScreen, 
  setActiveScreen, 
  activeDoc, 
  onNewAnalysis 
}: SidebarProps) {
  const menuItems = [
    { id: "Dashboard" as ActiveScreen, label: "Dashboard", icon: LayoutDashboard },
    { id: "Chat" as ActiveScreen, label: "AI Chat", icon: MessageSquare },
    { id: "Library" as ActiveScreen, label: "Library", icon: FolderOpen },
    { id: "Settings" as ActiveScreen, label: "Settings", icon: Settings },
  ];

  return (
    <aside id="documind-sidebar" className="fixed left-0 top-0 h-screen w-[280px] bg-[#102034] dark:bg-[#102034]/80 border-r border-[#424754] backdrop-blur-xl flex flex-col py-6 px-3 z-50 select-none">
      {/* Brand Header */}
      <div className="mb-8 px-4 cursor-pointer" onClick={() => setActiveScreen("Landing")}>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#adc6ff] text-3xl font-bold animate-pulse">psychology</span>
          <h1 className="font-display text-2xl font-bold text-[#adc6ff] tracking-tighter">DocuMind AI</h1>
        </div>
        <p className="font-sans text-xs text-[#c2c6d6]/70 mt-1">Enterprise Plan</p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              id={`sidebar-link-${item.id.toLowerCase()}`}
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-left group relative ${
                isActive
                  ? "bg-[#4d8eff]/15 text-[#adc6ff] font-medium border-l-4 border-[#adc6ff]"
                  : "text-[#c2c6d6]/80 hover:text-[#d3e4fe] hover:bg-[#26364a]/50"
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-[#adc6ff]" : "text-[#c2c6d6]/60 group-hover:text-[#adc6ff]"}`} />
              <span className="font-sans text-sm">{item.label}</span>
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#adc6ff] rounded-r" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Quick Actions Action */}
      <div className="px-2 mb-6">
        <button
          id="sidebar-new-analysis-btn"
          onClick={onNewAnalysis}
          className="w-full py-2.5 px-4 bg-[#adc6ff] text-[#002e6a] hover:bg-[#adc6ff]/90 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#adc6ff]/10 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>New Analysis</span>
        </button>
      </div>

      {/* Dynamic Metadata Preview Pane */}
      {activeDoc && (activeScreen === "Chat" || activeScreen === "Dashboard") && (
        <div className="pt-4 border-t border-[#424754]/30 px-3 mb-6">
          <div className="flex items-center justify-between mb-3 text-[10px] uppercase tracking-widest text-[#adc6ff] font-mono">
            <span>Active Doc Metadata</span>
            <Info className="w-3.5 h-3.5 text-[#c2c6d6]/60 cursor-pointer hover:text-[#adc6ff]" />
          </div>
          <div className="space-y-2">
            <div className="glass-panel p-2.5 rounded-xl border border-[#ffffff]/05">
              <p className="text-[9px] text-[#c2c6d6] uppercase font-bold tracking-wider">Classification Confidence</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="w-2 h-2 rounded-full bg-[#adc6ff] animate-pulse"></div>
                <span className="text-xs font-semibold text-[#d3e4fe]">{activeDoc.metadata.ocrConfidence} Accuracy</span>
              </div>
            </div>

            {activeDoc.risks.length > 0 && (
              <div className="glass-panel p-2.5 rounded-xl border border-[#ffffff]/05">
                <p className="text-[9px] text-[#c2c6d6] uppercase font-bold tracking-wider">Risk Assessments</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {activeDoc.risks.map((risk, index) => (
                    <span 
                      key={index} 
                      className="bg-[#93000a]/35 text-[#ffdad6] text-[9px] px-2 py-0.5 rounded-full font-bold border border-[#ffb4ab]/20"
                    >
                      {risk}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="space-y-1 border-t border-[#424754]/30 pt-4">
        <a
          id="sidebar-help-link"
          href="#help"
          className="flex items-center gap-3 text-[#c2c6d6]/70 hover:text-[#d3e4fe] px-4 py-2 text-xs rounded transition-colors group"
        >
          <HelpCircle className="w-4 h-4 text-[#c2c6d6]/40 group-hover:text-[#adc6ff]" />
          <span>Help Center</span>
        </a>
        <button
          id="sidebar-logout-btn"
          onClick={() => setActiveScreen("Landing")}
          className="w-full flex items-center gap-3 text-[#c2c6d6]/70 hover:text-[#ffb4ab] px-4 py-2 text-xs rounded transition-colors group text-left"
        >
          <LogOut className="w-4 h-4 text-[#c2c6d6]/40 group-hover:text-red-400" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
