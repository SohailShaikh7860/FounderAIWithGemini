import React, { useState } from 'react';
import { Header } from './components/Header';
import { SubmissionForm } from './components/SubmissionForm';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { NegotiationChat } from './components/NegotiationChat';
import { AppState, StartupSubmission, AnalysisResult } from './types';
import { analyzeStartupPitch } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleSubmission = async (data: StartupSubmission) => {
    setAppState(AppState.ANALYZING);
    try {
      // Pass the new reportFile argument to the service
      const result = await analyzeStartupPitch(data.videoFile, data.reportText, data.reportFile);
      setAnalysisResult(result);
      setAppState(AppState.RESULTS);
    } catch (error: any) {
      console.error("Analysis failed:", error);
      // Show the specific error message to the user
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      alert(`Failed to analyze pitch: ${errorMessage}\n\nPlease check your API key and network connection.`);
      setAppState(AppState.IDLE);
    }
  };

  const startNegotiation = () => {
    if (analysisResult && analysisResult.score >= 90) {
      setAppState(AppState.NEGOTIATING);
    }
  };

  const closeNegotiation = () => {
    // Reset or go back to results
    setAppState(AppState.RESULTS);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section - Only show when IDLE */}
        {appState === AppState.IDLE && (
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Founding the Future with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Intelligent Capital</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              Upload your startup pitch. Our Gemini-powered AI analyzes viability in seconds. 
              Top-tier startups get immediate access to automated term sheet negotiation.
            </p>
          </div>
        )}

        {/* Dynamic Content based on State */}
        <div className="transition-all duration-500 ease-in-out">
          {appState === AppState.IDLE || appState === AppState.ANALYZING ? (
            <SubmissionForm 
              onSubmit={handleSubmission} 
              isProcessing={appState === AppState.ANALYZING} 
            />
          ) : null}

          {appState === AppState.RESULTS && analysisResult && (
            <AnalysisDashboard 
              result={analysisResult} 
              onStartNegotiation={startNegotiation} 
            />
          )}

          {appState === AppState.NEGOTIATING && analysisResult && (
             <NegotiationChat 
               analysis={analysisResult} 
               onClose={closeNegotiation}
             />
          )}
        </div>
      </main>

      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/5 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
};

export default App;