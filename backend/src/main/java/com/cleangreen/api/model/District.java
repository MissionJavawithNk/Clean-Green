package com.cleangreen.api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "districts")
@Data
public class District {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "state_id")
    private State state;

    private Long totalScore = 0L;

    @OneToMany(mappedBy = "district")
    private List<Society> societies;
}
