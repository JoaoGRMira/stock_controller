import { Layers } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MaterialSelector } from "./MaterialSelector";
import { MaterialList } from "./MaterialList";
import {
  RawMaterial,
  ProductRawMaterial,
  CreateProductRawMaterialDTO,
} from "@/types/inventory";

interface RawMaterialsSectionProps {
  associations: ProductRawMaterial[];
  availableMaterials: RawMaterial[];
  onAdd: (dto: CreateProductRawMaterialDTO) => void;
  onRemove: (id: number) => void;
}

export function RawMaterialsSection({
  associations,
  availableMaterials,
  onAdd,
  onRemove,
}: RawMaterialsSectionProps) {
  const { toast } = useToast();

  return (
    <div className="glass-card rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Layers className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Raw Materials</h2>
          <p className="text-sm text-muted-foreground">
            Associate raw materials required for this product
          </p>
        </div>
      </div>

      <MaterialSelector
        materials={availableMaterials}
        existingAssociations={associations}
        onAdd={(dto) => {
          onAdd(dto);
          toast({ title: "Material added" });
        }}
      />

      <MaterialList
        associations={associations}
        onRemove={onRemove}
      />
    </div>
  );
}
