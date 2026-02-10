import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { productionService } from "@/services/production";
import {
  ProductionProduct,
  ProductionResult,
  ProductionLevel,
} from "@/types/production";

function resolveProductionLevel(
  qty: number,
  maxQty: number
): ProductionLevel {
  const ratio = qty / maxQty;

  if (ratio >= 0.66) return "high";
  if (ratio >= 0.33) return "medium";
  return "low";
}

export function useProduction() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data = [], isLoading } = useQuery({
    queryKey: ["production"],
    queryFn: productionService.findAll,
  });

  // 🔄 Map backend → view model
  const products: ProductionProduct[] = useMemo(() => {
    if (!data.length) return [];

    const maxQty = Math.max(
      ...data.map((p) => Number(p.quantityProduced))
    );

    return data.map((item: ProductionResult) => {
      const quantity = Number(item.quantityProduced);
      const totalValue = Number(item.totalValue);
      const unitPrice =
        quantity > 0 ? totalValue / quantity : 0;

      return {
        id: item.productId,
        name: item.productName,
        quantityProducible: quantity,
        projectedValue: totalValue,
        unitPrice,
        productionLevel: resolveProductionLevel(
          quantity,
          maxQty
        ),
      };
    });
  }, [data]);

  // 🔍 Frontend search
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;

    const query = searchTerm.toLowerCase();
    return products.filter((p) =>
      p.name.toLowerCase().includes(query)
    );
  }, [products, searchTerm]);

  // 📊 Stats
  const summaryStats = useMemo(() => {
    const totalUnits = products.reduce(
      (acc, p) => acc + p.quantityProducible,
      0
    );

    const totalProjectedValue = products.reduce(
      (acc, p) => acc + p.projectedValue,
      0
    );

    const highProduction = products.filter(
      (p) => p.productionLevel === "high"
    ).length;

    return {
      totalProducts: products.length,
      totalUnits,
      totalProjectedValue,
      highProduction,
    };
  }, [products]);

  return {
    products: filteredProducts,
    isLoading,
    searchTerm,
    setSearchTerm,
    summaryStats,
  };
}
