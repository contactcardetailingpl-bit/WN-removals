
import { GoogleGenAI, Type } from "@google/genai";
import { WasteAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeWasteImage(base64Image: string): Promise<WasteAnalysis> {
  const model = "gemini-3-flash-preview";
  
  const systemPrompt = `You are a professional waste management consultant for "WN Removals" based in Wigan, UK. 
  Analyze the image and provide a JSON response summarizing the waste. 
  Be helpful and professional. Prices should be in GBP (£).`;

  const response = await ai.models.generateContent({
    model: model,
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Image.split(',')[1] || base64Image,
          },
        },
        {
          text: "Identify the type of waste in this image, estimate the volume (e.g., '1 van load', '2 cubic yards'), provide specific disposal advice for Wigan (referencing local recycling centers if applicable), and give a rough price range for removal by WN Removals.",
        },
      ],
    },
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING },
          estimatedVolume: { type: Type.STRING },
          disposalAdvice: { type: Type.STRING },
          estimatedPriceRange: { type: Type.STRING },
        },
        required: ["type", "estimatedVolume", "disposalAdvice", "estimatedPriceRange"],
      },
    },
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    throw new Error("Could not analyze image. Please try again.");
  }
}
