export interface Material {
  id: number;
  name: string;
  quantity: number;
}

export type MaterialFormData = {
  name: string;
  quantity: number;
};
