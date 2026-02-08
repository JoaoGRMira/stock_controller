export interface Product {
  id: string;
  name: string;
  category: string;
  quantityProducible: number;
  unitPrice: number;
  projectedValue: number;
  productionLevel: 'high' | 'medium' | 'low';
  rawMaterials: string[];
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Steel Beam',
    category: 'Structural',
    quantityProducible: 2500,
    unitPrice: 145.00,
    projectedValue: 362500,
    productionLevel: 'high',
    rawMaterials: ['Steel', 'Carbon'],
  },
  {
    id: '2',
    name: 'Aluminum Sheet Panel',
    category: 'Materials',
    quantityProducible: 1800,
    unitPrice: 89.50,
    projectedValue: 161100,
    productionLevel: 'high',
    rawMaterials: ['Aluminum', 'Alloy Mix'],
  },
  {
    id: '3',
    name: 'Copper Wire Bundle',
    category: 'Electrical',
    quantityProducible: 450,
    unitPrice: 234.00,
    projectedValue: 105300,
    productionLevel: 'medium',
    rawMaterials: ['Copper', 'Insulation'],
  },
  {
    id: '4',
    name: 'Titanium Alloy Rod',
    category: 'Specialty',
    quantityProducible: 120,
    unitPrice: 890.00,
    projectedValue: 106800,
    productionLevel: 'low',
    rawMaterials: ['Titanium', 'Vanadium'],
  },
  {
    id: '5',
    name: 'Stainless Steel Pipe',
    category: 'Structural',
    quantityProducible: 980,
    unitPrice: 178.00,
    projectedValue: 174440,
    productionLevel: 'medium',
    rawMaterials: ['Steel', 'Chromium', 'Nickel'],
  },
  {
    id: '6',
    name: 'Bronze Fitting Set',
    category: 'Components',
    quantityProducible: 75,
    unitPrice: 156.00,
    projectedValue: 11700,
    productionLevel: 'low',
    rawMaterials: ['Bronze', 'Tin'],
  },
  {
    id: '7',
    name: 'Carbon Fiber Panel',
    category: 'Specialty',
    quantityProducible: 340,
    unitPrice: 445.00,
    projectedValue: 151300,
    productionLevel: 'medium',
    rawMaterials: ['Carbon Fiber', 'Epoxy Resin'],
  },
  {
    id: '8',
    name: 'Zinc Coated Sheet',
    category: 'Materials',
    quantityProducible: 3200,
    unitPrice: 67.00,
    projectedValue: 214400,
    productionLevel: 'high',
    rawMaterials: ['Steel', 'Zinc'],
  },
];

export const categories = ['All', 'Structural', 'Materials', 'Electrical', 'Specialty', 'Components'];

export const summaryStats = {
  totalProducts: mockProducts.length,
  totalProjectedValue: mockProducts.reduce((sum, p) => sum + p.projectedValue, 0),
  totalUnits: mockProducts.reduce((sum, p) => sum + p.quantityProducible, 0),
  highProduction: mockProducts.filter(p => p.productionLevel === 'high').length,
};
