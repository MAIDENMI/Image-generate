import React from "react";
import PromptPanel from "./ImageGenerator/PromptPanel";
import OutputPanel from "./ImageGenerator/OutputPanel";
import { generateImage } from "@/lib/stability";

interface HomeProps {}

/**
 * Main component for the AI image generation interface
 * Manages the state and coordination between input and output panels
 */
const Home = ({}: HomeProps) => {
  // State for tracking generation status and results
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generatedImages, setGeneratedImages] = React.useState<
    Array<{
      url: string;
      prompt: string;
      dimensions: string;
      generatedAt: Date;
    }>
  >([]);
  const [error, setError] = React.useState("");
  const [isSaved, setIsSaved] = React.useState(false);

  // Change this value to generate different numbers of variations
  const numberOfSamples = 1; // Try values 1-4 for different results

  /**
   * Handles the image generation process
   * @param prompt - User's text description
   * @param dimensions - Selected image size
   * @param samples - Number of variations to generate
   */
  const handleGenerate = async (
    prompt: string,
    dimensions: string,
    samples: number,
  ) => {
    setIsGenerating(true);
    setError("");

    try {
      // Generate images using Stability AI
      const imageUrls = await generateImage(prompt, dimensions, samples);
      const urlsArray = Array.isArray(imageUrls) ? imageUrls : [imageUrls];

      // Update state with generated images
      setGeneratedImages(
        urlsArray.map((url) => ({
          url,
          prompt,
          dimensions,
          generatedAt: new Date(),
        })),
      );
    } catch (err: any) {
      console.error("Error in handleGenerate:", err);
      setError(err?.message || "Failed to generate image. Please try again.");
      setGeneratedImages([]); // Clear previous images on error
    } finally {
      setIsGenerating(false);
    }
  };

  // Handlers for image actions
  const handleDownload = () => {
    if (generatedImages[0]?.url) {
      window.open(generatedImages[0].url, "_blank");
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="min-h-screen w-full bg-background p-6">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
          {/* Input section for prompt and controls */}
          <PromptPanel
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            samples={numberOfSamples}
          />

          {/* Output section for displaying generated images */}
          <div className="flex flex-col gap-6">
            {generatedImages.map((image, index) => (
              <OutputPanel
                key={index}
                imageUrl={image.url}
                isLoading={isGenerating}
                error={error}
                dimensions={image.dimensions}
                prompt={image.prompt}
                generatedAt={image.generatedAt}
                onDownload={handleDownload}
                onSave={handleSave}
                isSaved={isSaved}
              />
            ))}
            {/* Placeholder panel when no images exist */}
            {generatedImages.length === 0 && (
              <OutputPanel
                isLoading={isGenerating}
                error={error}
                onDownload={handleDownload}
                onSave={handleSave}
                isSaved={isSaved}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
