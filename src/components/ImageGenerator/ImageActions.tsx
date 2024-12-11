import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Heart } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface ImageActionsProps {
  onDownload?: () => void;
  onSave?: () => void;
  isSaved?: boolean;
  disabled?: boolean;
}

const ImageActions = ({
  onDownload = () => {},
  onSave = () => {},
  isSaved = false,
  disabled = false,
}: ImageActionsProps) => {
  return (
    <Card className="p-4 bg-background w-[700px]">
      <div className="flex justify-end gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onDownload}
                disabled={disabled}
              >
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download Image</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isSaved ? "default" : "outline"}
                size="icon"
                onClick={onSave}
                disabled={disabled}
              >
                <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isSaved ? "Remove from Favorites" : "Save to Favorites"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Card>
  );
};

export default ImageActions;
