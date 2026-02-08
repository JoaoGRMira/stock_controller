import { useState, useMemo } from 'react';
import { Package, DollarSign, Layers, TrendingUp } from 'lucide-react';
import { StatsCard, ProductCard, ProductionSearchFilter} from '@/components/'
import { mockProducts, categories, summaryStats } from '@/data/mockProducts';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

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
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8 animate-fade-in">
          <h1 className="text-display text-foreground">Production Dashboard</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Products available for manufacturing based on current raw material inventory
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Products"
            value={summaryStats.totalProducts}
            subtitle="Ready for production"
            icon={Package}
          />
          <StatsCard
            title="Total Units"
            value={formatNumber(summaryStats.totalUnits)}
            subtitle="Across all products"
            icon={Layers}
          />
          <StatsCard
            title="Projected Value"
            value={formatCurrency(summaryStats.totalProjectedValue)}
            subtitle="Total revenue potential"
            icon={DollarSign}
          />
          <StatsCard
            title="High Production"
            value={summaryStats.highProduction}
            subtitle="Products with surplus stock"
            icon={TrendingUp}
          />
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <ProductionSearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          />
        </div>

        {/* Results count */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> of{' '}
            <span className="font-semibold text-foreground">{mockProducts.length}</span> products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;