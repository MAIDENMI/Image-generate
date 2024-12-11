const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY;
const COHERE_API_URL = "https://api.cohere.ai/v1/generate";

export async function generateImage(
  prompt: string,
  size: "512x512" | "1024x1024",
) {
  try {
    console.log("Sending request to Cohere with:", { prompt, size });

    // First, generate an optimized prompt for image generation
    const promptResponse = await fetch(COHERE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${COHERE_API_KEY}`,
        "Cohere-Version": "2022-12-06",
      },
      body: JSON.stringify({
        model: "command",
        prompt: `Convert this text into a detailed image generation prompt: ${prompt}`,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!promptResponse.ok) {
      const error = await promptResponse.json();
      throw new Error(error.message || "Failed to generate prompt");
    }

    const promptData = await promptResponse.json();
    const enhancedPrompt = promptData.generations[0].text.trim();

    // Then use the enhanced prompt with the image generation API
    const imageResponse = await fetch(
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${COHERE_API_KEY}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: enhancedPrompt,
              weight: 1,
            },
          ],
          cfg_scale: 7,
          height: size === "512x512" ? 512 : 1024,
          width: size === "512x512" ? 512 : 1024,
          samples: 1,
          steps: 50,
        }),
      },
    );

    if (!imageResponse.ok) {
      const error = await imageResponse.json();
      throw new Error(error.message || "Failed to generate image");
    }

    const imageData = await imageResponse.json();
    return imageData.artifacts[0].base64;
  } catch (error) {
    console.error("Error generating image:", error);
    if (error instanceof Error) {
      throw new Error(`Cohere API Error: ${error.message}`);
    }
    throw new Error("Failed to generate image. Please try again.");
  }
}
