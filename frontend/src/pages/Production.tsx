import { Package, DollarSign, Layers, TrendingUp } from "lucide-react";
import {
  StatsCard,
  ProductCard,
  ProductionSearchFilter,
} from "@/components";
import { useProduction } from "@/hooks/useProduction";

const Production = () => {
  const {
    products,
    isLoading,
    searchTerm,
    setSearchTerm,
    summaryStats,
  } = useProduction();

  if (isLoading) {
    return <div className="p-8">Loading production...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-display">Production Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Available production based on raw material stock
          </p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Products"
            value={summaryStats.totalProducts}
            icon={Package}
          />
          <StatsCard
            title="Total Units"
            value={summaryStats.totalUnits}
            icon={Layers}
          />
          <StatsCard
            title="Projected Value"
            value={summaryStats.totalProjectedValue}
            icon={DollarSign}
          />
          <StatsCard
            title="High Production"
            value={summaryStats.highProduction}
            icon={TrendingUp}
          />
        </div>

        {/* Search */}
        <div className="mb-6">
          <ProductionSearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory=""
            onCategoryChange={() => {}}
            categories={[]}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              No products available for production
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Production;
