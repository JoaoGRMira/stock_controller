import { ProductHeader, RawMaterialsSection } from '@/components';
import { mockProduct, mockRawMaterials } from '@/data/mockData';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProductRawMaterial = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 animate-fade-in">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground -ml-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <ProductHeader product={mockProduct} />
          
          <RawMaterialsSection
            initialAssociations={mockProduct.materials}
            availableMaterials={mockRawMaterials}
          />
        </div>

        {/* Save Actions */}
        <div className="mt-8 flex items-center justify-end gap-3 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductRawMaterial;
