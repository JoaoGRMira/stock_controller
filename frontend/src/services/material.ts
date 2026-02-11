import { api } from "@/config/api";
import type { Material, MaterialFormData } from "@/types/material";

export const materialService = {
  findAll: async (): Promise<Material[]> => {
    const { data } = await api.get<Material[]>("/raw-materials");

    return data.map((m) => ({
      ...m,
      stockQuantity: Number(m.stockQuantity),
    }));
  },

  create: async (material: MaterialFormData): Promise<Material> => {
    const { data } = await api.post<Material>("/raw-materials", material);
    return {
      ...data,
      stockQuantity: Number(data.stockQuantity),
    };
  },

  update: async (
    id: number,
    material: MaterialFormData
  ): Promise<Material> => {
    const { data } = await api.put<Material>(
      `/raw-materials/${id}`,
      material
    );
    return {
      ...data,
      stockQuantity: Number(data.stockQuantity),
    };
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/raw-materials/${id}`);
  },
};
