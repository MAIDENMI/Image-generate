const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/images/generations";

export async function generateImage(
  prompt: string,
  size: "512x512" | "1024x1024",
) {
  try {
    console.log("Sending request to OpenAI with:", { prompt, size });

    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        n: 1,
        size,
        model: "dall-e-3",
        quality: "standard",
        response_format: "url",
      }),
    });

    const data = await response.json();
    console.log("OpenAI API Response:", data);

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to generate image");
    }

    return data.data[0].url;
  } catch (error) {
    console.error("Error generating image:", error);
    if (error instanceof Error) {
      throw new Error(`OpenAI API Error: ${error.message}`);
    }
    throw new Error("Failed to generate image. Please try again.");
  }
}
