export interface RawMaterial {
  id: string;
  name: string;
  unit: string;
  availableStock: number;
  costPerUnit: number;
}

export interface MaterialAssociation {
  id: string;
  materialId: string;
  materialName: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  category: string;
  status: 'active' | 'draft' | 'discontinued';
  materials: MaterialAssociation[];
}
