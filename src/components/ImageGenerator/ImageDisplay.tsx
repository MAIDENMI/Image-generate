import React from "react";
import { Card } from "@/components/ui/card";
import { Loader2, ImageOff } from "lucide-react";

interface ImageDisplayProps {
  imageUrl?: string;
  isLoading?: boolean;
  error?: string;
  dimensions?: string;
}

const ImageDisplay = ({
  imageUrl = "https://dummyimage.com/1024x1024/e2e8f0/64748b&text=AI+Generated+Image",
  isLoading = false,
  error = "",
  dimensions = "1024x1024",
}: ImageDisplayProps) => {
  const [width, height] = dimensions.split("x").map(Number);

  return (
    <Card className="w-[700px] h-[700px] bg-background flex items-center justify-center overflow-hidden">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
          <Loader2 className="h-12 w-12 animate-spin" />
          <p>Generating your image...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center gap-4 text-destructive">
          <ImageOff className="h-12 w-12" />
          <p>{error}</p>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <img
            src={imageUrl}
            alt="AI Generated"
            className="object-contain w-full h-full"
            style={{
              maxWidth: width,
              maxHeight: height,
              margin: "auto",
            }}
          />
        </div>
      )}
    </Card>
  );
};

export default ImageDisplay;
