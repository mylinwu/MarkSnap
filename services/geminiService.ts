import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const enhanceMarkdown = async (markdown: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `You are an expert technical writer. Please improve the grammar, clarity, and flow of the following Markdown content. 
    Maintain the original meaning and structure. 
    Do not add conversational text, just return the improved Markdown.
    
    Markdown to improve:
    ${markdown}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster edits
      }
    });

    return response.text || markdown;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
