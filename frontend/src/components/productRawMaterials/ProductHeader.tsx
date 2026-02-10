import { Badge } from '@/components/ui/badge';
import { Package, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';

interface ProductHeaderProps {
  product: Product;
}

export function ProductHeader({ product }: ProductHeaderProps) {
  return (
    <div className="glass-card rounded-xl p-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
            <Package className="h-7 w-7" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">
              {product.name}
            </h1>

            <p className="text-sm text-muted-foreground">
              Price:{' '}
              <span className="font-medium text-foreground">
                ${product.price.toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        <Button variant="outline" size="sm" className="gap-2">
          <Edit2 className="h-4 w-4" />
          Edit Product
        </Button>
      </div>
    </div>
  );
}
