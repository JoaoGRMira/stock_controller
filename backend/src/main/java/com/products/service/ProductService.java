package com.products.service;

import com.products.domain.Product;
import com.products.repository.ProductRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class ProductService {

    private final ProductRepository productRepo;

    public ProductService(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }

    public List<Product> listAll() {
        return productRepo.listAll();
    }

    @Transactional
    public Product create(Product product) {
        productRepo.persist(product);
        return product;
    }

    @Transactional
    public void delete(Long id) {
        productRepo.deleteById(id);
    }
}