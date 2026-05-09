package com.cleangreen.api.controller;

import com.cleangreen.api.model.Household;
import com.cleangreen.api.model.Society;
import com.cleangreen.api.repository.HouseholdRepository;
import com.cleangreen.api.repository.SocietyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboards")
@CrossOrigin(origins = "*") // For development
public class LeaderboardController {

    @Autowired
    private HouseholdRepository householdRepository;

    @Autowired
    private SocietyRepository societyRepository;

    @GetMapping("/households")
    public List<Household> getTopHouseholds(@RequestParam(required = false) Long societyId) {
        if (societyId != null) {
            return householdRepository.findTop10BySocietyIdOrderByCurrentPointsDesc(societyId);
        }
        return householdRepository.findTop50ByOrderByCurrentPointsDesc();
    }

    @GetMapping("/societies")
    public List<Society> getTopSocieties(@RequestParam(required = false) Long districtId) {
        if (districtId != null) {
            return societyRepository.findTop10ByDistrictIdOrderByTotalScoreDesc(districtId);
        }
        return societyRepository.findTop20ByOrderByTotalScoreDesc();
    }
    
    // Additional endpoints for District and State would be added here
}
