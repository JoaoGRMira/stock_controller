export interface ProductionResult {
  productId: number;
  productName: string;
  quantityProduced: number;
  totalValue: number;
}

export type ProductionLevel = "high" | "medium" | "low";

export interface ProductionProduct {
  id: number;
  name: string;
  quantityProducible: number;
  projectedValue: number;
  unitPrice: number;
  productionLevel: ProductionLevel;
}
