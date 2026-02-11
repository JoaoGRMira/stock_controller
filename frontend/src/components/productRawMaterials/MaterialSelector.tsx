import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, AlertCircle } from "lucide-react";
import {
  RawMaterial,
  ProductRawMaterial,
  CreateProductRawMaterialDTO,
} from "@/types/inventory";

interface MaterialSelectorProps {
  materials: RawMaterial[];
  existingAssociations: ProductRawMaterial[];
  onAdd: (dto: CreateProductRawMaterialDTO) => void;
}

export function MaterialSelector({
  materials,
  existingAssociations,
  onAdd,
}: MaterialSelectorProps) {
  const [selectedMaterialId, setSelectedMaterialId] =
    useState<number | null>(null);
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  const availableMaterials = materials.filter(
    (m) =>
      !existingAssociations.some(
        (a) => a.rawMaterial.id === m.id
      )
  );

  const selectedMaterial = materials.find(
    (m) => m.id === selectedMaterialId
  );

  const handleAdd = () => {
    setError("");

    if (!selectedMaterialId) {
      setError("Please select a raw material");
      return;
    }

    const requiredQuantity = Number(quantity);
    if (isNaN(requiredQuantity) || requiredQuantity <= 0) {
      setError("Please enter a valid quantity greater than 0");
      return;
    }

    onAdd({
      rawMaterialId: selectedMaterialId,
      requiredQuantity,
    });

    setSelectedMaterialId(null);
    setQuantity("");
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-[1fr,auto,auto]">
        <div className="space-y-2">
          <Label>Raw Material</Label>

          <Select
            value={selectedMaterialId?.toString() ?? ""}
            onValueChange={(value) =>
              setSelectedMaterialId(Number(value))
            }
          >
            <SelectTrigger className="input-focus bg-background">
              <SelectValue placeholder="Select a material..." />
            </SelectTrigger>

            <SelectContent>
              {availableMaterials.map((material) => (
                <SelectItem
                  key={material.id}
                  value={material.id.toString()}
                >
                  <div className="flex justify-between gap-4">
                    <span>{material.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {material.stockQuantity} in stock
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Required Quantity</Label>
          <Input
            type="number"
            min="0.01"
            step="0.01"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="flex items-end">
          <Button onClick={handleAdd} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Material
          </Button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  );
}
