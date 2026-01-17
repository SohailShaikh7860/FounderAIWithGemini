import { GoogleGenAI, Type, type Schema } from "@google/genai";
import { AnalysisResult } from "../types";

/**
 * Helper to retrieve API key safely
 */
const getApiKey = (): string => {
  try {
    // Defensively check for process and process.env to avoid ReferenceErrors
    if (typeof process !== "undefined" && process?.env?.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    // Ignore any environment access errors
  }
  return "";
};

/**
 * Helper to convert File to Base64
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the Data-URL declaration (e.g., "data:video/mp4;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Analyzes the startup pitch video, PDF report, and optional text summary.
 */
export const analyzeStartupPitch = async (
  videoFile: File | null,
  reportText: string,
  reportFile: File | null
): Promise<AnalysisResult> => {
  
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Gemini API Key is missing. Please check your environment configuration.");
  }

  const ai = new GoogleGenAI({ apiKey });
  // Using gemini-3-flash-preview for fast, efficient multimodal analysis
  const modelId = "gemini-3-flash-preview"; 

  // Define the output schema for structured JSON
  const analysisSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      score: { type: Type.NUMBER, description: "A score from 0 to 100 based on investment potential." },
      companyName: { type: Type.STRING, description: "Inferred name of the startup." },
      summary: { type: Type.STRING, description: "Brief executive summary of the pitch." },
      pros: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: "List of key strengths."
      },
      cons: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: "List of potential risks or weaknesses."
      },
      metrics: {
        type: Type.OBJECT,
        properties: {
          marketSize: { type: Type.STRING, description: "Estimated market size assessment." },
          scalability: { type: Type.STRING, description: "Assessment of scalability." },
          innovation: { type: Type.STRING, description: "Assessment of innovation/moat." },
        }
      }
    },
    required: ["score", "companyName", "summary", "pros", "cons", "metrics"]
  };

  const parts: any[] = [];

  // Base prompt
  parts.push({
    text: `You are a strict Venture Capital analyst. Analyze the provided startup materials.
    These materials may include a video pitch, a PDF report, and/or a text summary.
    
    Evaluate the business model, market opportunity, and team presentation based on ALL provided content.
    Return a JSON response with a score (0-100). 
    If the startup is exceptional, give it > 90. If it has flaws, score appropriately.`
  });

  // Add text report context if provided
  if (reportText) {
    parts.push({
      text: `ADDITIONAL CONTEXT / SUMMARY:\n${reportText}`
    });
  }

  // Add PDF Report if provided
  if (reportFile) {
    try {
      const base64Pdf = await fileToBase64(reportFile);
      parts.push({
        inlineData: {
          mimeType: "application/pdf",
          data: base64Pdf
        }
      });
    } catch (e) {
      console.error("Error processing PDF file:", e);
      throw new Error("Failed to process PDF report.");
    }
  }

  // Add video if provided
  if (videoFile) {
    try {
      const base64Video = await fileToBase64(videoFile);
      parts.push({
        inlineData: {
          mimeType: videoFile.type,
          data: base64Video
        }
      });
    } catch (e) {
      console.error("Error processing video file:", e);
      throw new Error("Failed to process video file. It might be too large for this browser-based demo.");
    }
  }

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    } else {
      throw new Error("No response text generated");
    }
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

/**
 * Creates a chat session for negotiation.
 */
export const createNegotiationSession = (initialContext: string) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Gemini API Key is missing. Please check your environment configuration.");
  }
  
  const ai = new GoogleGenAI({ apiKey });
  
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview', // Using 3.0 Pro for advanced reasoning in negotiation
    config: {
      systemInstruction: `You are "Ventura", a highly intelligent AI Investment Negotiator representing a top-tier VC firm.
      The startup you are talking to has passed the initial screening with a high score (>90%).
      
      Your Goal: Negotiate a term sheet.
      
      Topics to discuss specifically:
      1. Valuation & Equity (How much for what %)
      2. Use of Funds (Burn rate, runway)
      3. EBITDA & Profitability timelines
      4. Long-term Vision & Exit Strategy
      
      Tone: Professional, direct, shrewd, yet supportive of high-growth potential. Do not accept weak answers. Drill down into numbers.
      Start by congratulating them on the high score and asking for their funding ask.`
    }
  });

  return chat;
};