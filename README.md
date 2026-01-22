# VentureScout AI

An intelligent VC investment platform powered by Google Gemini 3.0 that analyzes startup pitches and automates the investment decision pipeline.

## Overview

VentureScout AI transforms the venture capital investment process by using multiple specialized AI agents to evaluate startups, conduct due diligence, and negotiate term sheets. The platform processes multimodal inputs (video pitches, PDF decks, text summaries) and provides comprehensive investment analysis.

## Key Features

### Multi-Agent AI System
- **Pitch Analyzer** - Multimodal analysis of video, PDF, and text
- **Due Diligence Agent** - Autonomous claim verification
- **Investment Committee** - Three AI partners debate startup viability
- **Negotiation Agent** - Automated term sheet discussions
- **Board Simulator** - Future scenario generation

### Gemini 3.0 Capabilities Showcased
- Multimodal input processing (video + PDF + text)
- Structured JSON output with schema validation
- Long-context understanding for full pitch decks
- Multi-turn conversational AI for negotiations
- Specialized system instructions for agent personalities
- Multiple models (Flash for speed, Pro for reasoning)

### Complete Investment Pipeline
1. Upload startup pitch materials
2. AI analysis with 0-100 scoring
3. Automated due diligence verification
4. Investment committee deliberation
5. Term sheet negotiation
6. Future scenario simulation

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4
- **AI**: Google Gemini 3.0 (Flash + Pro models)
- **Visualization**: Recharts
- **Build**: Vite
- **Icons**: Lucide React

## Setup

### Prerequisites
- Node.js (v18 or higher)
- Gemini API Key (get it at https://aistudio.google.com/apikey)

### Installation

1. Clone the repository
```bash
git clone https://github.com/AashishTambe/FounderAIWithGemini.git
cd FounderAIWithGemini
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
# Create .env.local file
echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env.local
```

4. Run the development server
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser

## File Size Limits

- Video files: Maximum 20MB
- PDF files: Maximum 10MB
- Text summaries: No limit

## Project Structure

```
FounderAIWithGemini/
├── components/          # React components
│   ├── AnalysisDashboard.tsx
│   ├── CommitteeRoom.tsx
│   ├── DueDiligenceView.tsx
│   ├── NegotiationChat.tsx
│   ├── BoardSimulator.tsx
│   └── ...
├── services/
│   └── geminiService.ts # All Gemini API interactions
├── types.ts             # TypeScript interfaces
└── App.tsx              # Main application flow
```

## How It Works

### 1. Pitch Analysis
Upload video pitches, PDF decks, or text summaries. Gemini 3.0 Flash analyzes all inputs simultaneously and returns structured JSON with:
- Investment score (0-100)
- Strengths and weaknesses
- Market size, scalability, and innovation metrics
- Executive summary

### 2. Due Diligence
AI extracts key claims from the pitch and asks targeted verification questions across four categories:
- Market claims
- Financial projections
- Team credentials
- Product capabilities

### 3. Committee Deliberation
Three AI agents with distinct personalities debate the investment:
- CTO Agent: Technical feasibility and scalability
- CFO Agent: Financial viability and risk
- Partner Agent: Market opportunity and vision

### 4. Negotiation
High-scoring startups (90+) enter automated term sheet negotiations with Gemini 3.0 Pro, discussing:
- Valuation and equity
- Use of funds
- EBITDA targets
- Exit strategy

### 5. Future Simulation
AI generates realistic scenarios 18 months into the future, presenting strategic choices with potential consequences.

## API Usage

All Gemini API calls use structured output with JSON schemas for reliability. Example:

```typescript
const response = await ai.models.generateContent({
  model: "gemini-3-flash-preview",
  contents: { parts: [...] },
  config: {
    responseMimeType: "application/json",
    responseSchema: analysisSchema
  }
});
```

## Built For

Google Gemini 3.0 Hackathon - Showcasing advanced multimodal AI capabilities in a real-world venture capital application.

## Team

**[Aashish Tambe]** - [AashishTambe](https://github.com/AashishTambe)

**[Sohail shaikh]** - [SohailShaikh7860](https://github.com/SohailShaikh7860)

Built for the Gemini 3.0 Hackathon 2026
