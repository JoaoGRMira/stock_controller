package com.products.service;

import com.products.domain.ProductRawMaterial;
import com.products.repository.ProductRawMaterialRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class ProductRawMaterialService {

    private final ProductRawMaterialRepository assocRepo;

    public ProductRawMaterialService(ProductRawMaterialRepository assocRepo) {
        this.assocRepo = assocRepo;
    }

    public List<ProductRawMaterial> listAll() {
        return assocRepo.listAll();
    }

    @Transactional
    public ProductRawMaterial create(ProductRawMaterial prm) {
        assocRepo.persist(prm);
        return prm;
    }
}