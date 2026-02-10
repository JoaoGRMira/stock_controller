import { api } from "@/config/api";
import { ProductionResult } from "@/types/production";

export const productionService = {
  findAll: async (): Promise<ProductionResult[]> => {
    const { data } = await api.get<ProductionResult[]>("/production");
    return data;
  },
};
