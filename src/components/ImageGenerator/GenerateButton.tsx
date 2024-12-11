import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface GenerateButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const GenerateButton = ({
  onClick = () => {},
  isLoading = false,
  disabled = false,
}: GenerateButtonProps) => {
  return (
    <Card className="p-4 bg-background w-[700px]">
      <Button
        className="w-full h-10 flex items-center justify-center gap-2"
        onClick={onClick}
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          "Generate Image"
        )}
      </Button>
    </Card>
  );
};

export default GenerateButton;
