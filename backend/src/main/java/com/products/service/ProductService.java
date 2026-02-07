package com.products.service;

import com.products.domain.Product;
import com.products.repository.ProductRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class ProductService {

    private final ProductRepository productRepo;

    public ProductService(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }

    public List<Product> listAll() {
        return productRepo.listAll();
    }

    public Optional<Product> findById(Long id) {
        return Optional.ofNullable(productRepo.findById(id));
    }

    @Transactional
    public Product create(Product product) {
        productRepo.persist(product);
        return product;
    }

    @Transactional
    public Product update(Product product) {
        productRepo.getEntityManager().merge(product);
        return product;
    }

    @Transactional
    public void delete(Long id) {
        productRepo.deleteById(id);
    }
}