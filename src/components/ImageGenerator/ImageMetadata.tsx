import React from "react";
import { Card } from "@/components/ui/card";
import { Clock, Maximize2 } from "lucide-react";

interface ImageMetadataProps {
  prompt?: string;
  dimensions?: string;
  generatedAt?: Date;
}

const ImageMetadata = ({
  prompt = "A beautiful landscape with mountains and a lake",
  dimensions = "1024x1024",
  generatedAt = new Date(),
}: ImageMetadataProps) => {
  return (
    <Card className="p-4 bg-background w-[700px]">
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <p className="text-sm text-muted-foreground flex-1 line-clamp-2">
            {prompt}
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Maximize2 className="h-3 w-3" />
            <span>{dimensions}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>
              {generatedAt.toLocaleDateString()}{" "}
              {generatedAt.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ImageMetadata;
