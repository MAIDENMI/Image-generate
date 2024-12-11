import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import PromptInput from "./PromptInput";
import DimensionSelector from "./DimensionSelector";
import GenerateButton from "./GenerateButton";

type StabilityDimension =
  | "1024x1024"
  | "1152x896"
  | "1216x832"
  | "1344x768"
  | "1536x640"
  | "640x1536"
  | "768x1344"
  | "832x1216"
  | "896x1152";

interface PromptPanelProps {
  onGenerate?: (prompt: string, dimensions: StabilityDimension) => void;
  isGenerating?: boolean;
}

const PromptPanel = ({
  onGenerate = () => {},
  isGenerating = false,
}: PromptPanelProps) => {
  const [prompt, setPrompt] = useState("");
  const [dimensions, setDimensions] = useState<StabilityDimension>("1024x1024");

  const handleGenerate = () => {
    onGenerate(prompt, dimensions);
  };

  return (
    <Card className="h-full w-[756px] bg-background p-6 flex flex-col gap-6">
      <div className="flex-1 flex flex-col gap-6">
        <h2 className="text-2xl font-semibold">Create AI Image</h2>

        <PromptInput value={prompt} onChange={setPrompt} maxLength={1000} />

        <DimensionSelector value={dimensions} onChange={setDimensions} />

        <GenerateButton
          onClick={handleGenerate}
          isLoading={isGenerating}
          disabled={!prompt.trim()}
        />
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Tips:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Be specific about what you want to see in the image</li>
          <li>Include details about style, lighting, and composition</li>
          <li>Use descriptive adjectives to better convey your vision</li>
        </ul>
      </div>
    </Card>
  );
};

export default PromptPanel;
