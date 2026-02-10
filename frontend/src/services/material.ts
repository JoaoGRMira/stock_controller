import { api } from "@/config/api";
import type { Material, MaterialFormData } from "@/types/material";

export const materialService = {
  findAll: async (): Promise<Material[]> => {
    const { data } = await api.get<Material[]>("/raw-materials");
    return data;
  },

  create: async (material: MaterialFormData): Promise<Material> => {
    const { data } = await api.post<Material>("/raw-materials", material);
    return data;
  },

  update: async (
    id: number,
    material: MaterialFormData
  ): Promise<Material> => {
    const { data } = await api.put<Material>(
      `/raw-materials/${id}`,
      material
    );
    return data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/raw-materials/${id}`);
  },
};
