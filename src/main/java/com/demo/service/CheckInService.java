package com.greentrack.service;

import com.greentrack.dto.CheckInRequest;
import com.greentrack.entity.CheckIn;
import com.greentrack.entity.CheckInStatus;
import com.greentrack.exception.ResourceNotFoundException;
import com.greentrack.repository.CheckInRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CheckInService {

    private final CheckInRepository checkInRepository;

    public CheckInService(CheckInRepository checkInRepository) {
        this.checkInRepository = checkInRepository;
    }

    public CheckIn createCheckIn(CheckInRequest request) {

        CheckIn checkIn = new CheckIn();

        checkIn.setCheckinDate(request.getCheckinDate());
        checkIn.setStatus(
                CheckInStatus.valueOf(request.getStatus().toUpperCase())
        );
        checkIn.setRemarks(request.getRemarks());

        return checkInRepository.save(checkIn);
    }

    public List<CheckIn> getAllCheckIns() {
        return checkInRepository.findAll();
    }

    public CheckIn getCheckInById(Long id) {

        return checkInRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Check-in not found"));
    }

    public CheckIn updateCheckIn(
            Long id,
            CheckInRequest request) {

        CheckIn checkIn = checkInRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Check-in not found"));

        checkIn.setCheckinDate(request.getCheckinDate());

        checkIn.setStatus(
                CheckInStatus.valueOf(request.getStatus().toUpperCase())
        );

        checkIn.setRemarks(request.getRemarks());

        return checkInRepository.save(checkIn);
    }

    public void deleteCheckIn(Long id) {

        CheckIn checkIn = checkInRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Check-in not found"));

        checkInRepository.delete(checkIn);
    }
}