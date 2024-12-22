import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateImageDescription(
  imageUrl: string
): Promise<string[]> {
  try {
    // Convert image URL to base64
    const imageResponse = await fetch(imageUrl);
    const imageBlob = await imageResponse.blob();
    const imageBase64 = await blobToBase64(imageBlob);

    // Initialize the model with Gemini 1.5 Flash
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `You are a descriptive writing assistant. Please provide 3 different ways to describe this image. 
    Each description should be unique in style and focus, about 2-3 sentences long. 
    Separate each description with "---".
    Make the descriptions engaging and vivid.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64.split(",")[1],
        },
      },
    ]);

    const generatedResponse = await result.response;
    const text = generatedResponse.text();

    // Split the response into separate descriptions and ensure we have valid content
    const descriptions = text
      .split("---")
      .map((desc) => desc.trim())
      .filter((desc) => desc.length > 0);

    // If we don't get enough descriptions, add a fallback message
    if (descriptions.length === 0) {
      return ["Unable to generate descriptions. Please try again."];
    }

    return descriptions;
  } catch (error) {
    console.error("Error generating descriptions:", error);
    // Return a user-friendly error message
    return [
      "An error occurred while generating descriptions. Please try again later.",
    ];
  }
}

// Helper function to convert blob to base64
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
