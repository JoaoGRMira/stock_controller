import { useState, useMemo } from "react";
import { Material, MaterialFormData } from "@/types/material";

const initialMaterials: Material[] = [
  { id: "1", name: "Steel Sheet (1mm)", quantity: 250, createdAt: new Date(), updatedAt: new Date() },
  { id: "2", name: "Aluminum Rod (10mm)", quantity: 120, createdAt: new Date(), updatedAt: new Date() },
  { id: "3", name: "Copper Wire (2mm)", quantity: 500, createdAt: new Date(), updatedAt: new Date() },
  { id: "4", name: "PVC Pipe (50mm)", quantity: 75, createdAt: new Date(), updatedAt: new Date() },
  { id: "5", name: "Wood Plank (Oak)", quantity: 30, createdAt: new Date(), updatedAt: new Date() },
];

export function useMaterials() {
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMaterials = useMemo(() => {
    if (!searchQuery.trim()) return materials;
    const query = searchQuery.toLowerCase();
    return materials.filter((m) => m.name.toLowerCase().includes(query));
  }, [materials, searchQuery]);

  const addMaterial = (data: MaterialFormData) => {
    const newMaterial: Material = {
      id: crypto.randomUUID(),
      name: data.name.trim(),
      quantity: data.quantity,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setMaterials((prev) => [...prev, newMaterial]);
  };

  const updateMaterial = (id: string, data: MaterialFormData) => {
    setMaterials((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, name: data.name.trim(), quantity: data.quantity, updatedAt: new Date() }
          : m
      )
    );
  };

  const deleteMaterial = (id: string) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  };

  return {
    materials: filteredMaterials,
    searchQuery,
    setSearchQuery,
    addMaterial,
    updateMaterial,
    deleteMaterial,
  };
}
