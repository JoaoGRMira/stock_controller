package com.products.dto;

import java.math.BigDecimal;

public class ProductionResult {

    public Long productId;
    public String productName;
    public BigDecimal quantityProduced;
    public BigDecimal totalValue;

    public ProductionResult(Long productId, String productName,
                            BigDecimal quantityProduced, BigDecimal totalValue) {
        this.productId = productId;
        this.productName = productName;
        this.quantityProduced = quantityProduced;
        this.totalValue = totalValue;
    }
}