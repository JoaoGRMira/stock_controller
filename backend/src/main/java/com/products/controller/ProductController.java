package com.products.controller;

import com.products.domain.Product;
import com.products.service.ProductService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GET
    public List<Product> getAll() {
        return productService.listAll();
    }

    @GET
    @Path("/{id}")
    public Product getById(@PathParam("id") Long id) {
        return productService.findById(id)
            .orElseThrow(() -> new NotFoundException("Product not found"));
    }

    @POST
    public Product create(Product product) {
        return productService.create(product);
    }

    @PUT
    @Path("/{id}")
    public Product update(@PathParam("id") Long id, Product product) {
        product.id = id;
        return productService.update(product);
    }

    @DELETE
    @Path("/{id}")
    public void delete(@PathParam("id") Long id) {
        productService.delete(id);
    }
}