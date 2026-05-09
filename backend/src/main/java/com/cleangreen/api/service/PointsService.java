package com.cleangreen.api.service;

import com.cleangreen.api.model.Household;
import com.cleangreen.api.model.PointsLog;
import com.cleangreen.api.model.Society;
import com.cleangreen.api.repository.HouseholdRepository;
import com.cleangreen.api.repository.PointsLogRepository;
import com.cleangreen.api.repository.SocietyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PointsService {

    @Autowired
    private HouseholdRepository householdRepository;

    @Autowired
    private PointsLogRepository pointsLogRepository;

    @Autowired
    private SocietyRepository societyRepository;

    @Transactional
    public void submitPointsRequest(Long householdId, Integer points, String category, String reason) {
        Household household = householdRepository.findById(householdId)
                .orElseThrow(() -> new RuntimeException("Household not found"));

        PointsLog log = new PointsLog();
        log.setHousehold(household);
        log.setPoints(points);
        log.setCategory(category);
        log.setReason(reason);
        log.setStatus("PENDING");
        pointsLogRepository.save(log);
        
        // Note: We don't update scores here. We wait for admin approval.
    }

    @Transactional
    public void approvePoints(Long logId) {
        PointsLog log = pointsLogRepository.findById(logId)
                .orElseThrow(() -> new RuntimeException("Log entry not found"));

        if (!"PENDING".equals(log.getStatus())) {
            throw new RuntimeException("Log is already " + log.getStatus());
        }

        // 1. Update status
        log.setStatus("APPROVED");
        pointsLogRepository.save(log);

        // 2. Update Household points
        Household household = log.getHousehold();
        household.setCurrentPoints(household.getCurrentPoints() + log.getPoints());
        household.setLifetimePoints(household.getLifetimePoints() + Math.max(0, log.getPoints()));
        householdRepository.save(household);

        // 3. Propagate to Society level
        Society society = household.getSociety();
        if (society != null) {
            society.setTotalScore(society.getTotalScore() + log.getPoints());
            societyRepository.save(society);
        }
    }

    @Transactional
    public void rejectPoints(Long logId) {
        PointsLog log = pointsLogRepository.findById(logId)
                .orElseThrow(() -> new RuntimeException("Log entry not found"));
        log.setStatus("REJECTED");
        pointsLogRepository.save(log);
    }
}
