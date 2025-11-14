

import { GoogleGenAI, Modality } from "@google/genai";
import type { Trip } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set. Gemini features will not be available.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateBlogImage = async (title: string, excerpt: string): Promise<string> => {
  if (!API_KEY) {
    // Return a default placeholder if the API key is not available
    return "https://picsum.photos/seed/fallback-image/800/600";
  }

  const prompt = `A high-quality, vibrant photograph for a travel blog post about Himalayan motorcycle adventures. The post is titled "${title}". The main theme is: ${excerpt}. The style should be adventurous, inspiring, and visually stunning, suitable for a premium travel company. Focus on epic landscapes, winding roads, and the spirit of adventure.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const firstPart = response.candidates?.[0]?.content?.parts?.[0];
    if (firstPart && firstPart.inlineData) {
      const base64ImageBytes: string = firstPart.inlineData.data;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      console.warn("No image data found in Gemini response.");
      return "https://picsum.photos/seed/fallback-image/800/600";
    }
  } catch (error) {
    console.error("Error generating blog image:", error);
    return "https://picsum.photos/seed/fallback-error/800/600";
  }
};


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