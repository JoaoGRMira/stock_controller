package com.products.service;

import com.products.domain.Product;
import com.products.domain.ProductRawMaterial;
import com.products.domain.RawMaterial;
import com.products.repository.ProductRawMaterialRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;
import jakarta.ws.rs.WebApplicationException;

@ApplicationScoped
public class ProductRawMaterialService {

    private final ProductRawMaterialRepository assocRepo;

    public ProductRawMaterialService(ProductRawMaterialRepository assocRepo) {
        this.assocRepo = assocRepo;
    }

    public List<ProductRawMaterial> findByProduct(Long productId) {
        return assocRepo.findByProductId(productId);
    }

    @Transactional
    public ProductRawMaterial create(
        Product product,
        RawMaterial rawMaterial,
        BigDecimal quantity
    ) {
        ProductRawMaterial prm = new ProductRawMaterial();
        prm.product = product;
        prm.rawMaterial = rawMaterial;
        prm.requiredQuantity = quantity;

        assocRepo.persist(prm);
        return prm;
    }

    @Transactional
    public void delete(Long productId, Long id) {
        ProductRawMaterial prm = assocRepo.findById(id);

        if (prm == null || !prm.product.id.equals(productId)) {
            throw new WebApplicationException("Association not found", 404);
        }

        assocRepo.delete(prm);
    }
}
