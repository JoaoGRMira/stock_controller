import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/product";
import type { Product, CreateProductDTO } from "@/types/product";

export function useProducts() {
  const queryClient = useQueryClient();

  // 🔎 Search state
  const [searchQuery, setSearchQuery] = useState("");

  // 📦 Fetch products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: productService.findAll,
  });

  // 🔍 Frontend filtering
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;

    const query = searchQuery.toLowerCase();

    return products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  // ➕ Create
  const createMutation = useMutation({
    mutationFn: (data: CreateProductDTO) =>
      productService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // ✏️ Update
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: CreateProductDTO;
    }) => productService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // 🗑️ Delete
  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      productService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    // data
    products: filteredProducts,
    totalCount: products.length,
    isLoading,

    // search
    searchQuery,
    setSearchQuery,

    // actions
    addProduct: createMutation.mutate,
    updateProduct: (id: number, data: CreateProductDTO) =>
      updateMutation.mutate({ id, data }),
    deleteProduct: deleteMutation.mutate,
  };
}
