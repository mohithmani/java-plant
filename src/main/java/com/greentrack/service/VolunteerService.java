package com.greentrack.service;

import com.greentrack.exception.ResourceNotFoundException;
import com.greentrack.dto.VolunteerRequest;
import com.greentrack.entity.Volunteer;
import com.greentrack.repository.VolunteerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VolunteerService {

    private final VolunteerRepository volunteerRepository;

    public VolunteerService(VolunteerRepository volunteerRepository) {
        this.volunteerRepository = volunteerRepository;
    }

    public Volunteer createVolunteer(VolunteerRequest request) {

        Volunteer volunteer = new Volunteer();

        volunteer.setName(request.getName());
        volunteer.setEmail(request.getEmail());

        return volunteerRepository.save(volunteer);
    }

    public List<Volunteer> getAllVolunteers() {
        return volunteerRepository.findAll();
    }

    public Volunteer getVolunteerById(Long id) {
        return volunteerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Volunteer not found"));
    }

    public Volunteer updateVolunteer(Long id, VolunteerRequest request) {

        Volunteer volunteer = volunteerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Volunteer not found"));

        volunteer.setName(request.getName());
        volunteer.setEmail(request.getEmail());

        return volunteerRepository.save(volunteer);
    }

    public void deleteVolunteer(Long id) {
        Volunteer volunteer = volunteerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Volunteer not found"));

        volunteerRepository.delete(volunteer);
    }
}
