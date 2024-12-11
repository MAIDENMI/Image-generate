import React from "react";
import { Card } from "@/components/ui/card";
import ImageDisplay from "./ImageDisplay";
import ImageActions from "./ImageActions";
import ImageMetadata from "./ImageMetadata";

interface OutputPanelProps {
  imageUrl?: string;
  isLoading?: boolean;
  error?: string;
  dimensions?: string;
  prompt?: string;
  generatedAt?: Date;
  onDownload?: () => void;
  onSave?: () => void;
  isSaved?: boolean;
}

const OutputPanel = ({
  imageUrl = "https://dummyimage.com/1024x1024/e2e8f0/64748b&text=AI+Generated+Image",
  isLoading = false,
  error = "",
  dimensions = "1024x1024",
  prompt = "A beautiful landscape with mountains and a lake",
  generatedAt = new Date(),
  onDownload = () => {},
  onSave = () => {},
  isSaved = false,
}: OutputPanelProps) => {
  const hasImage = !isLoading && !error && imageUrl;

  return (
    <Card className="h-full w-[756px] bg-background p-6 flex flex-col gap-6">
      <div className="flex-1 flex flex-col gap-6">
        <h2 className="text-2xl font-semibold">Generated Image</h2>

        <ImageDisplay
          imageUrl={imageUrl}
          isLoading={isLoading}
          error={error}
          dimensions={dimensions}
        />

        <ImageActions
          onDownload={onDownload}
          onSave={onSave}
          isSaved={isSaved}
          disabled={!hasImage}
        />

        <ImageMetadata
          prompt={prompt}
          dimensions={dimensions}
          generatedAt={generatedAt}
        />
      </div>
    </Card>
  );
};

export default OutputPanel;
