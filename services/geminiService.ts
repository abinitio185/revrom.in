

import { GoogleGenAI } from "@google/genai";
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

  const prompt = `Photorealistic, vibrant photograph for a premium travel blog. Subject: Himalayan motorcycle adventure. The blog post is titled "${title}", focusing on: ${excerpt}. Capture the spirit of adventure with epic landscapes, winding mountain roads, and dramatic lighting. No text or logos.`;

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: '4:3',
        outputMimeType: 'image/jpeg',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      console.warn("No image data found in Imagen response.");
      return "https://picsum.photos/seed/fallback-image/800/600";
    }
  } catch (error) {
    console.error("Error generating blog image with Imagen:", error);
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

interface CustomItineraryPreferences {
    travelers: string;
    duration: string;
    destinations: string;
    style: string;
    interests: string;
}

export const generateCustomItinerary = async (preferences: CustomItineraryPreferences, existingTrips: Trip[]): Promise<string> => {
    if (!API_KEY) {
        return Promise.resolve("AI features are currently unavailable. Please contact us directly for a custom itinerary.");
    }

    const tripExamplesString = existingTrips.map(trip => 
        `- ${trip.title} (${trip.duration} days in ${trip.destination}): ${trip.shortDescription}`
    ).join('\n');

    const prompt = `You are an expert motorcycle tour planner for Revrom.in, specializing in the Indian Himalayas. Your task is to create a custom, day-by-day itinerary based on the user's preferences.

The user's request is as follows:
- Number of Riders: ${preferences.travelers}
- Desired Duration: ${preferences.duration} days
- Preferred Destinations/Regions: ${preferences.destinations}
- Desired Travel Style: ${preferences.style}
- Specific Interests: ${preferences.interests}

Here are some examples of tours we currently offer, for your reference and inspiration:
${tripExamplesString}

Based on this information, generate a compelling, well-structured itinerary. The response MUST be in markdown format.

The itinerary should include:
1.  A catchy, adventurous title for the tour, starting with '#'.
2.  A brief, exciting 2-3 sentence summary of the tour.
3.  A day-by-day breakdown.
4.  For each day, use a heading like '### Day X: [Title]' and provide a 2-3 sentence description of the day's activities and route.

Make the itinerary sound exciting, safe, and authentic. Emphasize the unique experiences. Ensure the pacing is realistic for the duration and chosen regions. Do not include sections for 'Inclusions', 'Exclusions', or price estimates.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating custom itinerary:", error);
        throw new Error("Failed to generate custom itinerary. The AI service may be temporarily unavailable.");
    }
};