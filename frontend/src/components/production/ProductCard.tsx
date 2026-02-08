import { Badge } from '@/components/ui/badge';
import { Package, TrendingUp } from 'lucide-react';
import { Product } from '@/data/mockProducts';

interface ProductCardProps {
  product: Product;
  index: number;
}

const levelConfig = {
  high: { badge: 'default' as const, label: 'High Stock' },
  medium: { badge: 'secondary' as const, label: 'Medium Stock' },
  low: { badge: 'destructive' as const, label: 'Low Stock' },
};

export function ProductCard({ product, index }: ProductCardProps) {
  const config = levelConfig[product.productionLevel];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div 
      className="bg-card rounded-lg p-5 card-shadow-lg border border-border/50 hover:border-accent/30 transition-all duration-200 animate-fade-in group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-secondary group-hover:bg-accent/10 transition-colors">
            <Package className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
        </div>
        <Badge variant={config.badge}>{config.label}</Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-label">Producible</p>
          <p className="text-2xl font-bold text-foreground tabular-nums">
            {formatNumber(product.quantityProducible)}
          </p>
          <p className="text-xs text-muted-foreground">units available</p>
        </div>
        <div className="space-y-1">
          <p className="text-label">Projected Value</p>
          <p className="text-2xl font-bold text-accent tabular-nums">
            {formatCurrency(product.projectedValue)}
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            {formatCurrency(product.unitPrice)}/unit
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border/50">
        <p className="text-xs text-muted-foreground">
          Raw Materials: {product.rawMaterials.join(', ')}
        </p>
      </div>
    </div>
  );
}
