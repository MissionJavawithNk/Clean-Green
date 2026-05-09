package com.cleangreen.api.controller;

import com.cleangreen.api.service.PointsService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/points")
@CrossOrigin(origins = "*")
public class PointsController {

    @Autowired
    private PointsService pointsService;

    @PostMapping("/log")
    public ResponseEntity<String> logActivity(@RequestBody ActivityLogRequest request) {
        try {
            pointsService.addPoints(
                request.getHouseholdId(), 
                request.getPoints(), 
                request.getCategory(), 
                request.getReason()
            );
            return ResponseEntity.ok("Points updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @Data
    public static class ActivityLogRequest {
        private Long householdId;
        private Integer points;
        private String category;
        private String reason;
    }
}
