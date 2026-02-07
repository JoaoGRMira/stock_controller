package com.products.service;

import com.products.domain.RawMaterial;
import com.products.repository.RawMaterialRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class RawMaterialService {

    private final RawMaterialRepository rawMaterialRepo;

    public RawMaterialService(RawMaterialRepository rawMaterialRepo) {
        this.rawMaterialRepo = rawMaterialRepo;
    }

    public List<RawMaterial> listAll() {
        return rawMaterialRepo.listAll();
    }

    public Optional<RawMaterial> findById(Long id) {
        return Optional.ofNullable(rawMaterialRepo.findById(id));
    }

    @Transactional
    public RawMaterial create(RawMaterial rawMaterial) {
        rawMaterialRepo.persist(rawMaterial);
        return rawMaterial;
    }

    @Transactional
    public RawMaterial update(RawMaterial rawMaterial) {
        rawMaterialRepo.getEntityManager().merge(rawMaterial);
        return rawMaterial;
    }

    @Transactional
    public void delete(Long id) {
        rawMaterialRepo.deleteById(id);
    }
}