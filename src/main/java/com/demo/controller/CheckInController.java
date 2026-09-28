package com.greentrack.controller;

import com.greentrack.dto.CheckInRequest;
import com.greentrack.entity.CheckIn;
import com.greentrack.service.CheckInService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/check-ins")
public class CheckInController {

    private final CheckInService checkInService;

    public CheckInController(CheckInService checkInService) {
        this.checkInService = checkInService;
    }

    @PostMapping
    public CheckIn createCheckIn(@RequestBody CheckInRequest request) {
        return checkInService.createCheckIn(request);
    }

    @GetMapping
    public List<CheckIn> getAllCheckIns() {
        return checkInService.getAllCheckIns();
    }

    @GetMapping("/{id}")
    public CheckIn getCheckInById(@PathVariable Long id) {
        return checkInService.getCheckInById(id);
    }

    @PutMapping("/{id}")
    public CheckIn updateCheckIn(
            @PathVariable Long id,
            @RequestBody CheckInRequest request) {

        return checkInService.updateCheckIn(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteCheckIn(@PathVariable Long id) {
        checkInService.deleteCheckIn(id);
    }
}