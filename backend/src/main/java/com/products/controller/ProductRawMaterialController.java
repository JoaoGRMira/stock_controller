package com.products.controller;

import com.products.domain.Product;
import com.products.domain.ProductRawMaterial;
import com.products.domain.RawMaterial;
import com.products.dto.CreateProductRawMaterialDTO;
import com.products.service.ProductRawMaterialService;
import com.products.service.ProductService;
import com.products.service.RawMaterialService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
import jakarta.ws.rs.NotFoundException;

@Path("/products/{productId}/raw-materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductRawMaterialController {

    private final ProductRawMaterialService prmService;
    private final ProductService productService;
    private final RawMaterialService rawMaterialService;

    public ProductRawMaterialController(
        ProductRawMaterialService prmService,
        ProductService productService,
        RawMaterialService rawMaterialService
    ) {
        this.prmService = prmService;
        this.productService = productService;
        this.rawMaterialService = rawMaterialService;
    }

    @GET
    public List<ProductRawMaterial> listByProduct(@PathParam("productId") Long productId) {
        return prmService.findByProduct(productId);
    }

    @POST
    public ProductRawMaterial add(
        @PathParam("productId") Long productId,
        CreateProductRawMaterialDTO dto
    ) {
        Product product = productService.findById(productId)
            .orElseThrow(() -> new NotFoundException("Product not found"));

        RawMaterial rawMaterial = rawMaterialService.findById(dto.rawMaterialId)
            .orElseThrow(() -> new NotFoundException("Raw material not found"));


        return prmService.create(product, rawMaterial, dto.requiredQuantity);
    }

    @DELETE
    @Path("/{id}")
    public void remove(
        @PathParam("productId") Long productId,
        @PathParam("id") Long id
    ) {
        prmService.delete(productId, id);
    }
}
