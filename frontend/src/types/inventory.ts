export interface RawMaterial {
  id: number;
  name: string;
  stockQuantity: number;
}
export interface ProductRawMaterial {
  id: number;
  requiredQuantity: number;
  rawMaterial: RawMaterial;
}

export interface CreateProductRawMaterialDTO {
  rawMaterialId: number;
  requiredQuantity: number;
}