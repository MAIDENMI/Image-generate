import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface DimensionSelectorProps {
  value?: StabilityDimension;
  onChange?: (value: StabilityDimension) => void;
}

const DimensionSelector = ({
  value = "1024x1024",
  onChange = () => {},
}: DimensionSelectorProps) => {
  return (
    <Card className="p-4 bg-background w-[700px]">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Image Dimensions</Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select dimensions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1024x1024">1024 x 1024 (Square)</SelectItem>
            <SelectItem value="1152x896">1152 x 896 (Landscape)</SelectItem>
            <SelectItem value="1216x832">1216 x 832 (Landscape)</SelectItem>
            <SelectItem value="1344x768">1344 x 768 (Landscape)</SelectItem>
            <SelectItem value="1536x640">1536 x 640 (Landscape)</SelectItem>
            <SelectItem value="640x1536">640 x 1536 (Portrait)</SelectItem>
            <SelectItem value="768x1344">768 x 1344 (Portrait)</SelectItem>
            <SelectItem value="832x1216">832 x 1216 (Portrait)</SelectItem>
            <SelectItem value="896x1152">896 x 1152 (Portrait)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
};

export default DimensionSelector;
