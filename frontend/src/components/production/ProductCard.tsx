import { Package, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProductionProduct } from "@/types/production";

interface ProductCardProps {
  product: ProductionProduct;
  index: number;
}

const levelConfig = {
  high: { badge: "default" as const, label: "High Production" },
  medium: { badge: "secondary" as const, label: "Medium Production" },
  low: { badge: "destructive" as const, label: "Low Production" },
};

export function ProductCard({ product, index }: ProductCardProps) {
  const config = levelConfig[product.productionLevel];

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  const formatNumber = (value: number) =>
    new Intl.NumberFormat("en-US").format(value);

  return (
    <div
      className="bg-card rounded-lg p-5 card-shadow-lg border border-border/50 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-secondary">
            <Package className="h-5 w-5 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground">
            {product.name}
          </h3>
        </div>
        <Badge variant={config.badge}>{config.label}</Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-label">Producible</p>
          <p className="text-2xl font-bold">
            {formatNumber(product.quantityProducible)}
          </p>
        </div>
        <div>
          <p className="text-label">Projected Value</p>
          <p className="text-2xl font-bold text-accent">
            {formatCurrency(product.projectedValue)}
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            {formatCurrency(product.unitPrice)}/unit
          </p>
        </div>
      </div>
    </div>
  );
}
