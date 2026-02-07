package com.products.controller;

import com.products.dto.ProductionResult;
import com.products.service.ProductionService;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/production")
@Produces(MediaType.APPLICATION_JSON)
public class ProductionController {

    private final ProductionService productionService;

    public ProductionController(ProductionService productionService) {
        this.productionService = productionService;
    }

    @GET
    public List<ProductionResult> getAvailableProduction() {
        return productionService.calculateAvailableProduction();
    }
}