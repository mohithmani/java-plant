package com.greentrack.service;

import com.greentrack.dto.PlantationDriveRequest;
import com.greentrack.entity.PlantationDrive;
import com.greentrack.exception.ResourceNotFoundException;
import com.greentrack.repository.PlantationDriveRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlantationDriveService {

    private final PlantationDriveRepository plantationDriveRepository;

    public PlantationDriveService(
            PlantationDriveRepository plantationDriveRepository) {

        this.plantationDriveRepository = plantationDriveRepository;
    }

    public PlantationDrive createDrive(PlantationDriveRequest request) {

        PlantationDrive drive = new PlantationDrive();

        drive.setName(request.getName());
        drive.setLocation(request.getLocation());
        drive.setDriveDate(request.getDriveDate());

        return plantationDriveRepository.save(drive);
    }

    public List<PlantationDrive> getAllDrives() {
        return plantationDriveRepository.findAll();
    }

    public PlantationDrive getDriveById(Long id) {

        return plantationDriveRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Plantation drive not found"));
    }

    public PlantationDrive updateDrive(
            Long id,
            PlantationDriveRequest request) {

        PlantationDrive drive = plantationDriveRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Plantation drive not found"));

        drive.setName(request.getName());
        drive.setLocation(request.getLocation());
        drive.setDriveDate(request.getDriveDate());

        return plantationDriveRepository.save(drive);
    }

    public void deleteDrive(Long id) {

        PlantationDrive drive = plantationDriveRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Plantation drive not found"));

        plantationDriveRepository.delete(drive);
    }
}