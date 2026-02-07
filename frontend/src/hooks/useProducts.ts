import { useState, useMemo } from "react";
import { Product } from "@/types/product";

const initialProducts: Product[] = [
  { id: "1", name: "Wireless Bluetooth Headphones", price: 79.99 },
  { id: "2", name: "Ergonomic Office Chair", price: 299.00 },
  { id: "3", name: "Mechanical Keyboard", price: 149.99 },
  { id: "4", name: "27-inch 4K Monitor", price: 449.00 },
  { id: "5", name: "USB-C Hub Adapter", price: 49.99 },
];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    
    const query = searchQuery.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.price.toString().includes(query)
    );
  }, [products, searchQuery]);

  const addProduct = (data: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...data,
      id: crypto.randomUUID(),
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id: string, data: Omit<Product, "id">) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...data } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return {
    products: filteredProducts,
    totalCount: products.length,
    searchQuery,
    setSearchQuery,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}
