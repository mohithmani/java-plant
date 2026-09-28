package com.greentrack.controller;

import com.greentrack.dto.VolunteerRequest;
import com.greentrack.entity.Volunteer;
import com.greentrack.service.VolunteerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/volunteers")
public class VolunteerController {

    private final VolunteerService volunteerService;

    public VolunteerController(VolunteerService volunteerService) {
        this.volunteerService = volunteerService;
    }

    @PostMapping
    public Volunteer createVolunteer(@RequestBody VolunteerRequest request) {
        return volunteerService.createVolunteer(request);
    }

    @GetMapping
    public List<Volunteer> getAllVolunteers() {
        return volunteerService.getAllVolunteers();
    }

    @GetMapping("/{id}")
    public Volunteer getVolunteerById(@PathVariable Long id) {
        return volunteerService.getVolunteerById(id);
    }

    @PutMapping("/{id}")
    public Volunteer updateVolunteer(
            @PathVariable Long id,
            @RequestBody VolunteerRequest request) {

        return volunteerService.updateVolunteer(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteVolunteer(@PathVariable Long id) {
        volunteerService.deleteVolunteer(id);
    }
}