import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { useMaterials } from "@/hooks/useMaterials";
import { useProductMaterials } from "@/hooks/useProductRawMaterials";
import { RawMaterialsSection } from "@/components/productRawMaterials/RawMaterialsSection";
import { ProductHeader } from "@/components/productRawMaterials/ProductHeader";

const ProductRawMaterial = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const id = Number(productId);

  const { products } = useProducts();
  const product = products.find((p) => p.id === id);

  const { materials } = useMaterials();
  const { associations, addMaterial, removeMaterial } =
    useProductMaterials(id);

  if (!product) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 mb-6"
          onClick={() => navigate("/products")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Button>

        <ProductHeader product={product} />

        <RawMaterialsSection
          associations={associations}
          availableMaterials={materials}
          onAdd={addMaterial}
          onRemove={removeMaterial}
        />
      </div>
    </div>
  );
};

export default ProductRawMaterial;
