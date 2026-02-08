import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { materialService } from "@/services/material";
import type { Material, MaterialFormData } from "@/types/material";

export function useMaterials() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");

  // 📦 Fetch materials
  const { data: materials = [], isLoading } = useQuery({
    queryKey: ["materials"],
    queryFn: materialService.findAll,
  });

  // 🔍 Frontend filter
  const filteredMaterials = useMemo(() => {
    if (!searchQuery.trim()) return materials;

    const query = searchQuery.toLowerCase();
    return materials.filter((m) =>
      m.name.toLowerCase().includes(query)
    );
  }, [materials, searchQuery]);

  // ➕ Create
  const createMutation = useMutation({
    mutationFn: (data: MaterialFormData) =>
      materialService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
  });

  // ✏️ Update
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: MaterialFormData;
    }) => materialService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
  });

  // 🗑️ Delete
  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      materialService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
  });

  return {
    materials: filteredMaterials,
    isLoading,

    searchQuery,
    setSearchQuery,

    addMaterial: createMutation.mutate,
    updateMaterial: (id: number, data: MaterialFormData) =>
      updateMutation.mutate({ id, data }),
    deleteMaterial: deleteMutation.mutate,
  };
}
