import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productRawMaterialService } from "@/services/productRawMaterial";
import { CreateProductRawMaterialDTO } from "@/types/inventory";

export function useProductMaterials(productId: number) {
  const queryClient = useQueryClient();

  const queryKey = ["product-raw-materials", productId];

  const { data = [], isLoading } = useQuery({
    queryKey,
    queryFn: () =>
      productRawMaterialService.findByProduct(productId),
    enabled: !!productId,
  });

  const addMutation = useMutation({
    mutationFn: (payload: CreateProductRawMaterialDTO) =>
      productRawMaterialService.create(productId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id: number) =>
      productRawMaterialService.remove(productId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    associations: data,
    isLoading,

    addMaterial: addMutation.mutate,
    removeMaterial: removeMutation.mutate,
  };
}
