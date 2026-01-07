import { GoogleGenAI } from "@google/genai";
import type { Trip } from '../types';

// The API key is obtained exclusively from process.env.API_KEY.
// Always instantiate the SDK with new GoogleGenAI({ apiKey: process.env.API_KEY }).

export const generateBlogImage = async (title: string, excerpt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY is not set. Gemini features will not be available.");
    return "https://picsum.photos/seed/fallback-image/800/600";
  }

  // Create a new GoogleGenAI instance right before making an API call to ensure it uses the most up-to-date configuration.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Photorealistic, vibrant photograph for a premium travel blog. Subject: Himalayan motorcycle adventure. The blog post is titled "${title}", focusing on: ${excerpt}. Capture the spirit of adventure with epic landscapes, winding mountain roads, and dramatic lighting. No text or logos.`;

  try {
    // Generate images using gemini-2.5-flash-image as the default for high-quality general image generation tasks.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "4:3"
        }
      }
    });

    // The output response may contain both image and text parts; iterate through all parts to find the image part.
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString: string = part.inlineData.data;
          return `data:image/png;base64,${base64EncodeString}`;
        }
      }
    }

    console.warn("No image data found in Gemini response.");
    return "https://picsum.photos/seed/fallback-image/800/600";
  } catch (error) {
    console.error("Error generating blog image with Gemini:", error);
    return "https://picsum.photos/seed/fallback-error/800/600";
  }
};

export const generatePackingList = async (trip: Trip): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API key not configured. Cannot generate packing list.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
    // Basic Text Tasks (e.g., list generation): Use gemini-3-flash-preview
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    // Use the .text property to extract the generated string content.
    return response.text || "Failed to generate packing list content.";
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
    if (!process.env.API_KEY) {
        return "AI features are currently unavailable. Please contact us directly for a custom itinerary.";
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
        // Complex Text Tasks (advanced reasoning and planning): Use gemini-3-pro-preview
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: prompt,
        });
        return response.text || "Failed to generate custom itinerary content.";
    } catch (error) {
        console.error("Error generating custom itinerary:", error);
        throw new Error("Failed to generate custom itinerary. The AI service may be temporarily unavailable.");
    }
};