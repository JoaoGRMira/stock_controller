import { useState } from 'react';
import { MaterialSelector } from './MaterialSelector';
import { MaterialList } from './MaterialList';
import { RawMaterial, MaterialAssociation } from '@/types/inventory';
import { useToast } from '@/hooks/use-toast';
import { Layers } from 'lucide-react';

interface RawMaterialsSectionProps {
  initialAssociations: MaterialAssociation[];
  availableMaterials: RawMaterial[];
}

export function RawMaterialsSection({
  initialAssociations,
  availableMaterials,
}: RawMaterialsSectionProps) {
  const [associations, setAssociations] = useState<MaterialAssociation[]>(initialAssociations);
  const { toast } = useToast();

  const handleAddMaterial = (materialId: string, quantity: number) => {
    const material = availableMaterials.find((m) => m.id === materialId);
    if (!material) return;

    const newAssociation: MaterialAssociation = {
      id: `ma-${Date.now()}`,
      materialId: material.id,
      materialName: material.name,
      quantity,
      unit: material.unit,
      costPerUnit: material.costPerUnit,
    };

    setAssociations((prev) => [...prev, newAssociation]);

    toast({
      title: 'Material Added',
      description: `${material.name} (${quantity} ${material.unit}) has been associated with this product.`,
    });
  };

  const handleRemoveMaterial = (id: string) => {
    const association = associations.find((a) => a.id === id);
    if (!association) return;

    setAssociations((prev) => prev.filter((a) => a.id !== id));

    toast({
      title: 'Material Removed',
      description: `${association.materialName} has been removed from this product.`,
      variant: 'destructive',
    });
  };

  return (
    <div className="glass-card rounded-xl p-6 space-y-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
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

      <div className="border-t border-border pt-6">
        <MaterialSelector
          materials={availableMaterials}
          existingAssociations={associations}
          onAdd={handleAddMaterial}
        />
      </div>

      <div className="border-t border-border pt-6">
        <MaterialList associations={associations} onRemove={handleRemoveMaterial} />
      </div>
    </div>
  );
}
