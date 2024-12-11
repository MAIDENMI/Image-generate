import React from "react";
import PromptPanel from "./ImageGenerator/PromptPanel";
import OutputPanel from "./ImageGenerator/OutputPanel";
import { generateImage } from "@/lib/stability";

interface HomeProps {}

const Home = ({}: HomeProps) => {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generatedImage, setGeneratedImage] = React.useState({
    url: "",
    prompt: "",
    dimensions: "1024x1024",
    generatedAt: new Date(),
  });
  const [error, setError] = React.useState("");
  const [isSaved, setIsSaved] = React.useState(false);

  const handleGenerate = async (prompt: string, dimensions: string) => {
    setIsGenerating(true);
    setError("");

    try {
      const imageUrl = await generateImage(prompt, dimensions);
      setGeneratedImage({
        url: imageUrl,
        prompt,
        dimensions,
        generatedAt: new Date(),
      });
    } catch (err: any) {
      console.error("Error in handleGenerate:", err);
      setError(err?.message || "Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage.url) {
      window.open(generatedImage.url, "_blank");
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="min-h-screen w-full bg-background p-6">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
          <PromptPanel
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />

          <OutputPanel
            imageUrl={generatedImage.url}
            isLoading={isGenerating}
            error={error}
            dimensions={generatedImage.dimensions}
            prompt={generatedImage.prompt}
            generatedAt={generatedImage.generatedAt}
            onDownload={handleDownload}
            onSave={handleSave}
            isSaved={isSaved}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
