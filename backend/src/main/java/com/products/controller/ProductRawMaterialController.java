package com.products.controller;

import com.products.domain.ProductRawMaterial;
import com.products.service.ProductRawMaterialService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/product-raw-materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductRawMaterialController {

    private final ProductRawMaterialService prmService;

    public ProductRawMaterialController(ProductRawMaterialService prmService) {
        this.prmService = prmService;
    }

    @GET
    public List<ProductRawMaterial> getAll() {
        return prmService.listAll();
    }

    @POST
    public ProductRawMaterial create(ProductRawMaterial prm) {
        return prmService.create(prm);
    }
}