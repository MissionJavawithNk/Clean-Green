package com.cleangreen.api.controller;

import com.cleangreen.api.model.Household;
import com.cleangreen.api.model.PointsLog;
import com.cleangreen.api.repository.HouseholdRepository;
import com.cleangreen.api.repository.PointsLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private HouseholdRepository householdRepository;

    @Autowired
    private PointsLogRepository pointsLogRepository;

    @GetMapping("/{id}/profile")
    public Household getHouseholdProfile(@PathVariable Long id) {
        return householdRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Household not found"));
    }

    @GetMapping("/{id}/history")
    public List<PointsLog> getPointHistory(@PathVariable Long id) {
        return pointsLogRepository.findByHouseholdIdOrderByCreatedAtDesc(id);
    }
}
