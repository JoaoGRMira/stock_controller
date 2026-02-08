import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, AlertCircle } from 'lucide-react';
import { RawMaterial, MaterialAssociation } from '@/types/inventory';

interface MaterialSelectorProps {
  materials: RawMaterial[];
  existingAssociations: MaterialAssociation[];
  onAdd: (materialId: string, quantity: number) => void;
}

export function MaterialSelector({
  materials,
  existingAssociations,
  onAdd,
}: MaterialSelectorProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [error, setError] = useState<string>('');

  const availableMaterials = materials.filter(
    (m) => !existingAssociations.some((a) => a.materialId === m.id)
  );

  const selectedMaterialData = materials.find((m) => m.id === selectedMaterial);

  const handleAdd = () => {
    setError('');

    if (!selectedMaterial) {
      setError('Please select a raw material');
      return;
    }

    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty <= 0) {
      setError('Please enter a valid quantity greater than 0');
      return;
    }

    onAdd(selectedMaterial, qty);
    setSelectedMaterial('');
    setQuantity('');
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-[1fr,auto,auto]">
        <div className="space-y-2">
          <Label htmlFor="material-select" className="text-sm font-medium">
            Raw Material
          </Label>
          <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
            <SelectTrigger id="material-select" className="input-focus bg-background">
              <SelectValue placeholder="Select a material..." />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border shadow-lg z-50">
              {availableMaterials.length === 0 ? (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  All materials have been added
                </div>
              ) : (
                availableMaterials.map((material) => (
                  <SelectItem key={material.id} value={material.id}>
                    <div className="flex items-center justify-between gap-4">
                      <span>{material.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {material.availableStock} {material.unit} available
                      </span>
                    </div>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity-input" className="text-sm font-medium">
            Quantity {selectedMaterialData && `(${selectedMaterialData.unit})`}
          </Label>
          <Input
            id="quantity-input"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0.00"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="input-focus w-full sm:w-32 bg-background"
          />
        </div>

        <div className="flex items-end">
          <Button
            onClick={handleAdd}
            disabled={availableMaterials.length === 0}
            className="gap-2 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Add Material
          </Button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive animate-fade-in">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {selectedMaterialData && quantity && parseFloat(quantity) > 0 && (
        <div className="rounded-lg bg-muted/50 px-4 py-3 text-sm animate-fade-in">
          <span className="text-muted-foreground">Estimated cost: </span>
          <span className="font-semibold">
            ${(selectedMaterialData.costPerUnit * parseFloat(quantity)).toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
}
