const STABILITY_API_KEY = import.meta.env.VITE_STABILITY_API_KEY;

/**
 * Generates one or more images using the Stability AI API
 * @param prompt - The text description of the image to generate
 * @param size - Desired image dimensions (e.g., "1024x1024")
 * @param samples - Number of image variations to generate (default: 1)
 * @returns Promise<string[]> - Array of base64 encoded image URLs
 */
export async function generateImage(
  prompt: string,
  size: string,
  samples: number = 1,
) {
  try {
    // Log the request parameters for debugging
    console.log("Sending request to Stability AI with:", {
      prompt,
      size,
      samples,
    });

    // Make API request to Stability AI
    const response = await fetch(
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${STABILITY_API_KEY}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          text_prompts: [{ text: prompt, weight: 1 }],
          cfg_scale: 7, // Controls how closely the image follows the prompt
          height: parseInt(size.split("x")[0]),
          width: parseInt(size.split("x")[0]),
          samples, // Number of images to generate
          steps: 50, // Higher values = higher quality but slower
        }),
      },
    );

    // Handle API errors
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to generate image");
    }

    const result = await response.json();

    // Validate response format
    if (!result.artifacts || !Array.isArray(result.artifacts)) {
      throw new Error("Invalid response format from Stability AI");
    }

    // Convert base64 images to data URLs
    const images = result.artifacts.map(
      (artifact: any) => `data:image/png;base64,${artifact.base64}`,
    );

    // Ensure at least one image was generated
    if (images.length === 0) {
      throw new Error("No images were generated");
    }

    return images;
  } catch (error) {
    console.error("Error generating image:", error);
    if (error instanceof Error) {
      throw new Error(`Stability AI Error: ${error.message}`);
    }
    throw new Error("Failed to generate image. Please try again.");
  }
}