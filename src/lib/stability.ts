const STABILITY_API_KEY = import.meta.env.VITE_STABILITY_API_KEY;

export async function generateImage(prompt: string, size: string) {
  try {
    console.log("Sending request to Stability AI with:", { prompt, size });

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
          text_prompts: [
            {
              text: prompt,
              weight: 1,
            },
          ],
          cfg_scale: 7,
          height: parseInt(size.split("x")[0]),
          width: parseInt(size.split("x")[0]),
          samples: 1,
          steps: 50,
        }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to generate image");
    }

    const result = await response.json();
    return `data:image/png;base64,${result.artifacts[0].base64}`;
  } catch (error) {
    console.error("Error generating image:", error);
    if (error instanceof Error) {
      throw new Error(`Stability AI Error: ${error.message}`);
    }
    throw new Error("Failed to generate image. Please try again.");
  }
}
