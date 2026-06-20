export type ActiveScreen = 'Landing' | 'Dashboard' | 'Chat' | 'Library' | 'Settings';

export interface DocumentItem {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
  status: "Ready" | "Risk Detected" | "Processing";
  tags: string[];
  summary: string;
  content: string;
  risks: string[];
  metadata: {
    ocrConfidence: string;
    keyDates: string[];
  };
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  citation?: string;
  refName?: string;
  timestamp: string;
}

export interface LiveActivity {
  id: string;
  icon: string;
  text: string;
  time: string;
  type: "success" | "info" | "error" | "warning";
}
