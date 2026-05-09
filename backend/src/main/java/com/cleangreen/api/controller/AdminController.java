package com.cleangreen.api.controller;

import com.cleangreen.api.model.PointsLog;
import com.cleangreen.api.repository.PointsLogRepository;
import com.cleangreen.api.service.PointsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private PointsLogRepository pointsLogRepository;

    @Autowired
    private PointsService pointsService;

    @GetMapping("/pending")
    public List<PointsLog> getPendingReports() {
        return pointsLogRepository.findByStatusOrderByCreatedAtDesc("PENDING");
    }

    @PostMapping("/approve/{id}")
    public ResponseEntity<String> approveReport(@PathVariable Long id) {
        try {
            pointsService.approvePoints(id);
            return ResponseEntity.ok("Report approved and points awarded");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/reject/{id}")
    public ResponseEntity<String> rejectReport(@PathVariable Long id) {
        try {
            pointsService.rejectPoints(id);
            return ResponseEntity.ok("Report rejected");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
