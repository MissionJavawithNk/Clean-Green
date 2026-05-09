package com.cleangreen.api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "households")
@Data
public class Household {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String householdName;

    @ManyToOne
    @JoinColumn(name = "society_id")
    private Society society;

    private Integer currentPoints = 0;
    private Integer lifetimePoints = 0;

    private LocalDateTime createdAt = LocalDateTime.now();
}
