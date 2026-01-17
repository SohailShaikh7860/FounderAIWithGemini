export interface AnalysisResult {
  score: number;
  companyName: string;
  summary: string;
  pros: string[];
  cons: string[];
  metrics: {
    marketSize: string;
    scalability: string;
    innovation: string;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
  NEGOTIATING = 'NEGOTIATING',
  REJECTED = 'REJECTED'
}

export interface StartupSubmission {
  videoFile: File | null;
  reportText: string;
  reportFile: File | null;
}
