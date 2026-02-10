package com.products.controller;

import com.products.domain.RawMaterial;
import com.products.service.RawMaterialService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/raw-materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RawMaterialController {

    private final RawMaterialService rawMaterialService;

    public RawMaterialController(RawMaterialService rawMaterialService) {
        this.rawMaterialService = rawMaterialService;
    }

    @GET
    public List<RawMaterial> getAll() {
        return rawMaterialService.listAll();
    }

    @GET
    @Path("/{id}")
    public RawMaterial getById(@PathParam("id") Long id) {
        return rawMaterialService.findById(id).orElseThrow(() -> new NotFoundException("Raw material not found"));
    }


    @POST
    public RawMaterial create(RawMaterial rawMaterial) {
        return rawMaterialService.create(rawMaterial);
    }

    @PUT
    @Path("/{id}")
    public RawMaterial update(@PathParam("id") Long id, RawMaterial rawMaterial) {
        rawMaterial.id = id;
        return rawMaterialService.update(rawMaterial);
    }

    @DELETE
    @Path("/{id}")
    public void delete(@PathParam("id") Long id) {
        rawMaterialService.delete(id);
    }
}