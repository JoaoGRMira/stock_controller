import { api } from "@/config/api";
import type { Product, CreateProductDTO } from "@/types/product";

export const productService = {
  findAll: async (): Promise<Product[]> => {
    const { data } = await api.get<Product[]>("/products");
    return data;
  },

  findById: async (id: number): Promise<Product> => {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  },

  create: async (product: CreateProductDTO): Promise<Product> => {
    const { data } = await api.post<Product>("/products", product);
    return data;
  },

  update: async (
    id: number,
    product: CreateProductDTO
  ): Promise<Product> => {
    const { data } = await api.put<Product>(`/products/${id}`, product);
    return data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
