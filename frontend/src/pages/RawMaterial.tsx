import { useState } from "react";
import { Plus, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/inventory/SearchBar";
import { MaterialsTable } from "@/components/inventory/MaterialTable";
import { MaterialFormDialog } from "@/components/inventory/MaterialFormDialog";
import { DeleteConfirmDialog } from "@/components/inventory/DeleteConfirmDialog";
import { useMaterials } from "@/hooks/useMaterials";
import { Material, MaterialFormData } from "@/types/material";

const RawMaterial = () => {
  const {
    materials,
    searchQuery,
    setSearchQuery,
    addMaterial,
    updateMaterial,
    deleteMaterial,
  } = useMaterials();

  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  const handleAddNew = () => {
    setSelectedMaterial(null);
    setFormDialogOpen(true);
  };

  const handleEdit = (material: Material) => {
    setSelectedMaterial(material);
    setFormDialogOpen(true);
  };

  const handleDelete = (material: Material) => {
    setSelectedMaterial(material);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = (data: MaterialFormData) => {
    if (selectedMaterial) {
      updateMaterial(selectedMaterial.id, data);
    } else {
      addMaterial(data);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedMaterial) {
      deleteMaterial(selectedMaterial.id);
      setDeleteDialogOpen(false);
      setSelectedMaterial(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Package2 className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Raw Materials
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage your inventory of raw materials and track stock levels.
          </p>
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <Button onClick={handleAddNew} className="gap-2 shrink-0">
            <Plus className="h-4 w-4" />
            Add Material
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-3 mb-6 animate-fade-in">
          <div className="rounded-lg border bg-card p-4 shadow-soft">
            <p className="text-sm font-medium text-muted-foreground">Total Materials</p>
            <p className="text-2xl font-bold text-foreground">{materials.length}</p>
          </div>
          <div className="rounded-lg border bg-card p-4 shadow-soft">
            <p className="text-sm font-medium text-muted-foreground">Total Stock</p>
            <p className="text-2xl font-bold text-foreground">
              {materials.reduce((sum, m) => sum + m.quantity, 0).toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4 shadow-soft">
            <p className="text-sm font-medium text-muted-foreground">Low Stock Items</p>
            <p className="text-2xl font-bold text-destructive">
              {materials.filter((m) => m.quantity <= 10).length}
            </p>
          </div>
        </div>

        {/* Table */}
        <MaterialsTable
          materials={materials}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Dialogs */}
        <MaterialFormDialog
          open={formDialogOpen}
          onOpenChange={setFormDialogOpen}
          material={selectedMaterial}
          onSubmit={handleFormSubmit}
        />

        <DeleteConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          material={selectedMaterial}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
};

export default RawMaterial;
