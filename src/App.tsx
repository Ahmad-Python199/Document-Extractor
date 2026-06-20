import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import ChatInterface from "./components/ChatInterface";
import Library from "./components/Library";
import SettingsView from "./components/Settings";
import { ActiveScreen, DocumentItem, LiveActivity } from "./types";

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>("Landing");
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [activities, setActivities] = useState<LiveActivity[]>([]);
  const [activeDoc, setActiveDoc] = useState<DocumentItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProcessingUpload, setIsProcessingUpload] = useState(false);

  // Load initial documents list from API
  const refreshDocuments = async () => {
    try {
      const res = await fetch("/api/documents");
      if (res.ok) {
        const data = await res.json();
        setDocuments(data.documents || []);
        
        // Default to MSA document on first parse if no doc is active
        if (data.documents && data.documents.length > 0 && !activeDoc) {
          const msa = data.documents.find((d: DocumentItem) => d.id === "msa-final") || data.documents[0];
          setActiveDoc(msa);
        }
      }
    } catch (err) {
      console.error("Failed to fetch documents:", err);
    }
  };

  // Load live activities list from API
  const refreshActivities = async () => {
    try {
      const res = await fetch("/api/activities");
      if (res.ok) {
        const data = await res.json();
        setActivities(data.activities || []);
      }
    } catch (err) {
      console.error("Failed to fetch activities logs:", err);
    }
  };

  useEffect(() => {
    refreshDocuments();
    refreshActivities();
  }, []);

  // Update active file selection
  const handleSelectDoc = (doc: DocumentItem) => {
    setActiveDoc(doc);
    refreshActivities();
  };

  // Upload custom document and begin Gemini AI analysis
  const handleFileUpload = async (name: string, content: string) => {
    setIsProcessingUpload(true);
    try {
      // Create activity marker for uploading state
      setActivities((prev) => [
        {
          id: "temp-upload",
          icon: "sync",
          text: `Analyzing layout structural schemas for ${name}...`,
          time: "JUST NOW",
          type: "info"
        },
        ...prev
      ]);

      const res = await fetch("/api/documents/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, content, type: "plain/text" })
      });

      if (res.ok) {
        const parsedDoc = await res.json();
        setDocuments((prev) => [parsedDoc, ...prev]);
        setActiveDoc(parsedDoc);
        setActiveScreen("Chat");
        
        // Small delay to let chat component update properly
        setTimeout(() => {
          refreshActivities();
        }, 800);
      } else {
        console.error("Failed uploading document:", await res.text());
      }
    } catch (err) {
      console.error("Error dispatching file uploads:", err);
    } finally {
      setIsProcessingUpload(false);
    }
  };

  // Trigger quick summary extraction inside Chat Assistant
  const handleGenerateSummary = async () => {
    if (!activeDoc) return;
    try {
      // Simulate/Trigger a chat request for bullet list summary
      const res = await fetch(`/api/chat/${activeDoc.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: "Generate a dense bullet-point summary, list the 3 main liabilities identified, and display extraction keywords." 
        })
      });

      if (res.ok) {
        // Simple artificial screen reload to reflect chat stream update
        setActiveScreen("Landing");
        setTimeout(() => {
          setActiveScreen("Chat");
        }, 50);
        refreshActivities();
      }
    } catch (err) {
      console.error("Failed generating summary:", err);
    }
  };

  // Delete a document from Library catalog
  const handleDeleteDoc = async (id: string) => {
    try {
      const res = await fetch(`/api/documents/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setDocuments((prev) => prev.filter((doc) => doc.id !== id));
        if (activeDoc?.id === id) {
          setActiveDoc(null);
        }
        refreshActivities();
      }
    } catch (err) {
      console.error("Failed to delete document asset:", err);
    }
  };

  // Direct mock upload trigger (e.g. from table action bar)
  const handleTriggerUpload = () => {
    const fileInput = document.getElementById("dashboard-file-picker");
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="min-h-screen bg-[#031427] text-[#d3e4fe] antialiased flex selection:bg-[#adc6ff]/30 selection:text-white">
      
      {/* Route layout rendering depending on landing status */}
      {activeScreen === "Landing" ? (
        <div className="w-full flex flex-col">
          {/* Landing Custom compact Header */}
          <header className="h-16 w-full bg-[#031427]/80 border-b border-[#424754]/20 backdrop-blur-md flex justify-between items-center px-6 md:px-12 z-40 select-none">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#adc6ff] text-2xl font-bold">psychology</span>
              <h1 className="font-display text-xl font-bold text-[#adc6ff] tracking-tighter">DocuMind AI</h1>
            </div>
            
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-6 text-[#c2c6d6] text-xs font-semibold">
                <a href="#features" className="hover:text-[#adc6ff] transition-colors">Features</a>
                <a href="#pricing" className="hover:text-[#adc6ff] transition-colors">Pricing</a>
              </nav>
              <button
                id="landing-header-login-btn"
                onClick={() => {
                  setActiveScreen("Dashboard");
                  refreshDocuments();
                  refreshActivities();
                }}
                className="bg-[#adc6ff] text-[#002e6a] text-xs font-bold px-4 py-1.5 rounded-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </header>

          <Landing onStartAnalyzing={() => {
            setActiveScreen("Dashboard");
            refreshDocuments();
            refreshActivities();
          }} />
        </div>
      ) : (
        /* Regular Workspace shell with fixed sidebar & adaptive top header */
        <div id="workspace-container" className="w-full flex min-h-screen pl-[280px]">
          
          {/* Unified Left Sidebar */}
          <Sidebar 
            activeScreen={activeScreen}
            setActiveScreen={setActiveScreen}
            activeDoc={activeDoc}
            onNewAnalysis={() => {
              setActiveScreen("Dashboard");
              // Wait for render, then trigger paste modal
              setTimeout(() => {
                const uploadCard = document.getElementById("dashboard-upload-card");
                if (uploadCard) {
                  uploadCard.click();
                }
              }, 120);
            }}
          />

          {/* Unified layout shell panel on the right */}
          <div className="flex-1 flex flex-col min-w-0">
            
            {/* Contextual dynamic header */}
            <Header 
              activeScreen={activeScreen}
              activeDoc={activeDoc}
              documents={documents}
              onSelectDoc={handleSelectDoc}
              onGenerateSummary={handleGenerateSummary}
              onSearchChange={setSearchQuery}
              onTriggerUpload={handleTriggerUpload}
              onNavigate={setActiveScreen}
            />

            {/* Core screen contents mapping */}
            <main className="flex-grow flex flex-col">
              {activeScreen === "Dashboard" && (
                <Dashboard 
                  documents={documents}
                  activities={activities}
                  onSelectDoc={handleSelectDoc}
                  onNavigate={setActiveScreen}
                  onFileUpload={handleFileUpload}
                  isProcessingUpload={isProcessingUpload}
                />
              )}

              {activeScreen === "Chat" && (
                <ChatInterface 
                  activeDoc={activeDoc}
                  onRefreshActivities={refreshActivities}
                />
              )}

              {activeScreen === "Library" && (
                <Library 
                  documents={documents}
                  onSelectDoc={handleSelectDoc}
                  onNavigateToChat={() => setActiveScreen("Chat")}
                  onDeleteDoc={handleDeleteDoc}
                />
              )}

              {activeScreen === "Settings" && (
                <SettingsView />
              )}
            </main>

          </div>

        </div>
      )}

    </div>
  );
}
