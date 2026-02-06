package com.products.service;

import com.products.domain.Product;
import com.products.domain.ProductRawMaterial;
import com.products.domain.RawMaterial;
import com.products.repository.ProductRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@ApplicationScoped
public class ProductionService {

    private final ProductRepository productRepo;

    public ProductionService(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }

    public List<ProductionResult> calculateAvailableProduction() {

        // 1) Load products ordered
        List<Product> products =
            productRepo.find("ORDER BY price DESC").list();

        // 2) Create mutable stock
        Map<Long, BigDecimal> stock = new HashMap<>();
        products.stream()
            .flatMap(p -> p.rawMaterials.stream())
            .map(ProductRawMaterial::rawMaterial)
            .distinct()
            .forEach(rm -> stock.put(rm.id, rm.stockQuantity));

        List<ProductionResult> results = new ArrayList<>();

        // 3) Calculate
        for (Product product : products) {

            boolean canProduce = true;
            BigDecimal maxQty = null;

            // Check all raw materials
            for (ProductRawMaterial prm : product.rawMaterials) {

                BigDecimal available = stock.get(prm.rawMaterial.id);
                BigDecimal possible = available.divide(prm.requiredQuantity, 2, BigDecimal.ROUND_DOWN);

                if (possible.compareTo(BigDecimal.ZERO) <= 0) {
                    canProduce = false;
                    break;
                }

                if (maxQty == null || possible.compareTo(maxQty) < 0) {
                    maxQty = possible;
                }
            }

            if (!canProduce || maxQty == null) continue;

            // Deduct stock for each raw material
            for (ProductRawMaterial prm : product.rawMaterials) {
                BigDecimal used = prm.requiredQuantity.multiply(maxQty);
                BigDecimal newStock = stock.get(prm.rawMaterial.id).subtract(used);
                stock.put(prm.rawMaterial.id, newStock);
            }

            results.add(new ProductionResult(
                product.id,
                product.name,
                maxQty,
                product.price.multiply(maxQty)
            ));
        }

        return results;
    }
}