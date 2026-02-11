export interface Material {
  id: number;
  name: string;
  stockQuantity: number;
}

export type MaterialFormData = {
  name: string;
  stockQuantity: number;
};
