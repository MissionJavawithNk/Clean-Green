package com.cleangreen.api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "points_logs")
@Data
public class PointsLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "household_id")
    private Household household;

    private Integer points;
    private String category; // SEGREGATION, DISPOSAL, RECYCLING, REPORTING, PENALTY
    private String reason;
    private String status = "PENDING"; // PENDING, APPROVED, REJECTED
    private LocalDateTime createdAt = LocalDateTime.now();
}
