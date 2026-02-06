package com.products.service;

import com.products.domain.Product;
import com.products.domain.ProductRawMaterial;
import com.products.dto.ProductionResult;
import com.products.repository.ProductRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

@ApplicationScoped
public class ProductionService {

    private final ProductRepository productRepo;

    public ProductionService(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }

    public List<ProductionResult> calculateAvailableProduction() {

        // 1) Load products ordered by price descending
        List<Product> products = productRepo.find("ORDER BY price DESC").list();

        // 2) Build stock map (rawMaterialId -> available quantity)
        Map<Long, BigDecimal> stock = new HashMap<>();

        for (Product product : products) {
            if (product.rawMaterials != null) {
                for (ProductRawMaterial prm : product.rawMaterials) {
                    Long rmId = prm.rawMaterial.id;
                    stock.putIfAbsent(rmId, prm.rawMaterial.stockQuantity);
                }
            }
        }

        List<ProductionResult> results = new ArrayList<>();

        // 3) For each product, compute how many can be produced
        for (Product product : products) {

            if (product.rawMaterials == null || product.rawMaterials.isEmpty()) {
                continue;
            }

            boolean canProduce = true;
            BigDecimal maxQty = null;

            for (ProductRawMaterial prm : product.rawMaterials) {

                BigDecimal available = stock.get(prm.rawMaterial.id);
                if (available == null) {
                    canProduce = false;
                    break;
                }

                BigDecimal possible = available.divide(prm.requiredQuantity, 2, RoundingMode.DOWN);

                if (possible.compareTo(BigDecimal.ZERO) <= 0) {
                    canProduce = false;
                    break;
                }

                if (maxQty == null || possible.compareTo(maxQty) < 0) {
                    maxQty = possible;
                }
            }

            if (!canProduce || maxQty == null) {
                continue;
            }

            // Deduct used stock for each raw material
            for (ProductRawMaterial prm : product.rawMaterials) {
                BigDecimal used = prm.requiredQuantity.multiply(maxQty);
                BigDecimal newAmount = stock.get(prm.rawMaterial.id).subtract(used);
                stock.put(prm.rawMaterial.id, newAmount);
            }

            ProductionResult result = new ProductionResult(
                    product.id,
                    product.name,
                    maxQty,
                    product.price.multiply(maxQty)
            );
            results.add(result);
        }

        return results;
    }
}