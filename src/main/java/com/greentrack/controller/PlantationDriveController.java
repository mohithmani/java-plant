package com.greentrack.controller;

import com.greentrack.dto.PlantationDriveRequest;
import com.greentrack.entity.PlantationDrive;
import com.greentrack.service.PlantationDriveService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/drives")
public class PlantationDriveController {

    private final PlantationDriveService plantationDriveService;

    public PlantationDriveController(PlantationDriveService plantationDriveService) {
        this.plantationDriveService = plantationDriveService;
    }

    @PostMapping
    public PlantationDrive createDrive(
            @RequestBody PlantationDriveRequest request) {

        return plantationDriveService.createDrive(request);
    }

    @GetMapping
    public List<PlantationDrive> getAllDrives() {
        return plantationDriveService.getAllDrives();
    }

    @GetMapping("/{id}")
    public PlantationDrive getDriveById(@PathVariable Long id) {
        return plantationDriveService.getDriveById(id);
    }

    @PutMapping("/{id}")
    public PlantationDrive updateDrive(
            @PathVariable Long id,
            @RequestBody PlantationDriveRequest request) {

        return plantationDriveService.updateDrive(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteDrive(@PathVariable Long id) {
        plantationDriveService.deleteDrive(id);
    }
}
