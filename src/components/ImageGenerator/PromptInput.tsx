import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface PromptInputProps {
  value?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
}

const PromptInput = ({
  value = "",
  onChange = () => {},
  maxLength = 1000,
}: PromptInputProps) => {
  const [text, setText] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setText(newValue);
      onChange(newValue);
    }
  };

  return (
    <Card className="p-4 bg-background w-[700px]">
      <div className="space-y-2">
        <Label htmlFor="prompt" className="text-sm font-medium">
          Image Generation Prompt
        </Label>
        <Textarea
          id="prompt"
          placeholder="Describe the image you want to generate..."
          className="min-h-[120px] resize-none"
          value={text}
          onChange={handleChange}
        />
        <div className="flex justify-end">
          <span className="text-xs text-muted-foreground">
            {text.length} / {maxLength} characters
          </span>
        </div>
      </div>
    </Card>
  );
};

export default PromptInput;
