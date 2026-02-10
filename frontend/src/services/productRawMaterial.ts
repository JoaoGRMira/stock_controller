import { api } from "@/config/api";
import {
  ProductRawMaterial,
  CreateProductRawMaterialDTO,
} from "@/types/inventory";

export const productRawMaterialService = {
  findByProduct: async (
    productId: number
  ): Promise<ProductRawMaterial[]> => {
    const { data } = await api.get<ProductRawMaterial[]>(
      `/products/${productId}/raw-materials`
    );
    return data;
  },

  create: async (
    productId: number,
    payload: CreateProductRawMaterialDTO
  ): Promise<ProductRawMaterial> => {
    const { data } = await api.post<ProductRawMaterial>(
      `/products/${productId}/raw-materials`,
      payload
    );
    return data;
  },

  remove: async (
    productId: number,
    id: number
  ): Promise<void> => {
    await api.delete(
      `/products/${productId}/raw-materials/${id}`
    );
  },
};