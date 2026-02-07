export interface Material {
  id: string;
  name: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export type MaterialFormData = {
  name: string;
  quantity: number;
};
