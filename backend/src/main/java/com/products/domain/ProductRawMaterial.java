package com.products.domain;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(
    name = "product_raw_material",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"product_id", "raw_material_id"})
    }
)
public class ProductRawMaterial extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id")
    public Product product;

    @ManyToOne(optional = false)
    @JoinColumn(name = "raw_material_id")
    public RawMaterial rawMaterial;

    @Column(name = "required_quantity", nullable = false, precision = 12, scale = 2)
    public BigDecimal requiredQuantity;
}