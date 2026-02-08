import { Badge } from '@/components/ui/badge';
import { Package, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/inventory';

interface ProductHeaderProps {
  product: Product;
}

const statusColors = {
  active: 'bg-success/10 text-success border-success/20',
  draft: 'bg-warning/10 text-warning border-warning/20',
  discontinued: 'bg-muted text-muted-foreground border-border',
};

export function ProductHeader({ product }: ProductHeaderProps) {
  return (
    <div className="glass-card rounded-xl p-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
            <Package className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight">{product.name}</h1>
              <Badge variant="outline" className={statusColors[product.status]}>
                {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="font-medium">{product.sku}</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>{product.category}</span>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              {product.description}
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
