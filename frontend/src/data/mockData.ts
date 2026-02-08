import { RawMaterial, Product } from '@/types/inventory';

export const mockRawMaterials: RawMaterial[] = [
  { id: 'rm-001', name: 'Steel Sheet (1mm)', unit: 'kg', availableStock: 500, costPerUnit: 2.50 },
  { id: 'rm-002', name: 'Aluminum Bar', unit: 'kg', availableStock: 320, costPerUnit: 4.20 },
  { id: 'rm-003', name: 'Copper Wire (2mm)', unit: 'm', availableStock: 1000, costPerUnit: 1.80 },
  { id: 'rm-004', name: 'Plastic Pellets (ABS)', unit: 'kg', availableStock: 800, costPerUnit: 1.20 },
  { id: 'rm-005', name: 'Rubber Gasket', unit: 'pcs', availableStock: 2500, costPerUnit: 0.35 },
  { id: 'rm-006', name: 'Circuit Board (PCB)', unit: 'pcs', availableStock: 150, costPerUnit: 12.00 },
  { id: 'rm-007', name: 'LED Module', unit: 'pcs', availableStock: 600, costPerUnit: 3.50 },
  { id: 'rm-008', name: 'Adhesive (Industrial)', unit: 'L', availableStock: 45, costPerUnit: 25.00 },
  { id: 'rm-009', name: 'Stainless Steel Bolts M6', unit: 'pcs', availableStock: 5000, costPerUnit: 0.15 },
  { id: 'rm-010', name: 'Glass Panel (Tempered)', unit: 'pcs', availableStock: 80, costPerUnit: 45.00 },
];

export const mockProduct: Product = {
  id: 'prod-001',
  name: 'Industrial Control Panel X200',
  sku: 'ICP-X200-2024',
  description: 'High-performance industrial control panel with integrated display and modular I/O system.',
  category: 'Control Systems',
  status: 'active',
  materials: [
    { id: 'ma-001', materialId: 'rm-001', materialName: 'Steel Sheet (1mm)', quantity: 2.5, unit: 'kg', costPerUnit: 2.50 },
    { id: 'ma-002', materialId: 'rm-006', materialName: 'Circuit Board (PCB)', quantity: 3, unit: 'pcs', costPerUnit: 12.00 },
    { id: 'ma-003', materialId: 'rm-007', materialName: 'LED Module', quantity: 8, unit: 'pcs', costPerUnit: 3.50 },
  ],
};
