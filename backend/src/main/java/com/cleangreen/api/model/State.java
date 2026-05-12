package com.cleangreen.api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "states")
@Data
public class State {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Long totalScore = 0L;

    @OneToMany(mappedBy = "state")
    private List<District> districts;
}
