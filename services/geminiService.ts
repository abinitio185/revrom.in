
import { GoogleGenAI } from "@google/genai";
import type { Trip } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set. Gemini features will not be available.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generatePackingList = async (trip: Trip): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("API key not configured. Cannot generate packing list.");
  }

  const prompt = `Generate a detailed packing list for a ${trip.duration}-day motorcycle tour in Ladakh, India. The main activities are: ${trip.activities.join(', ')}. The tour difficulty is rated as ${trip.difficulty}. The response should be in markdown format. 
  
  Please organize the items into these specific categories:
  - **Riding Gear (Essential)**: Must-have protective gear.
  - **Clothing (On & Off Bike)**: Layering is key for the fluctuating temperatures.
  - **Footwear**: For riding and relaxing.
  - **Health & Hygiene**: Including high-altitude specifics.
  - **Documents & Money**: Critical items.
  - **Electronics & Gadgets**: For navigation and memories.
  - **Miscellaneous**: Other useful items.
  
  Provide specific recommendations, especially concerning high-altitude and motorcycle safety. Emphasize the importance of layers and protection against sun and cold.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating packing list:", error);
    return "Sorry, we couldn't generate a packing list at this time. Please try again later.";
  }
};
