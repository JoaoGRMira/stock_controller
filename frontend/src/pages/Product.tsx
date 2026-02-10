import { useState } from "react";
import { Plus, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductTable, ProductForm, ProductSearchFilter, DeleteProductConfirmDialog} from "@/components";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/product";
import { toast } from "@/hooks/use-toast";

const Products = () => {
  const {
    products,
    totalCount,
    searchQuery,
    setSearchQuery,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleAddProduct = (data: Omit<Product, "id">) => {
    addProduct(data);
    toast({
      title: "Product added",
      description: `"${data.name}" has been added to your inventory.`,
    });
  };

  const handleEditProduct = (data: Omit<Product, "id">) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
      toast({
        title: "Product updated",
        description: `"${data.name}" has been updated.`,
      });
      setEditingProduct(null);
    }
  };

  const handleDeleteClick = (id: number) => {
    const product = products.find((p) => p.id === id);

    if (product) {
      setProductToDelete(product);
      setDeleteDialogOpen(true);
    }
  };


  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      toast({
        title: "Product deleted",
        description: `"${productToDelete.name}" has been removed from your inventory.`,
      });
      setProductToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleFormClose = (open: boolean) => {
    setFormOpen(open);
    if (!open) {
      setEditingProduct(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Package className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Product Inventory
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage your products and keep track of your inventory.
          </p>
        </div>

        {/* Stats Card */}
        <div className="grid gap-4 mb-6">
          <div className="rounded-lg border bg-card p-4 shadow-card">
            <div className="text-sm font-medium text-muted-foreground">
              Total Products
            </div>
            <div className="text-2xl font-bold">{totalCount}</div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <ProductSearchFilter value={searchQuery} onChange={setSearchQuery} />
          <Button onClick={() => setFormOpen(true)} className="sm:ml-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Products Table */}
        <ProductTable
          products={products}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />

        {/* Results count */}
        {searchQuery && (
          <p className="text-sm text-muted-foreground mt-4">
            Showing {products.length} of {totalCount} products
          </p>
        )}

        {/* Product Form Modal */}
        <ProductForm
          open={formOpen}
          onOpenChange={handleFormClose}
          onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
          product={editingProduct}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteProductConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
          productName={productToDelete?.name}
        />
      </div>
    </div>
  );
};

export default Products;
