package com.cleangreen.api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "societies")
@Data
public class Society {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;

    @ManyToOne
    @JoinColumn(name = "district_id")
    private District district;

    private Long totalScore = 0L;

    @OneToMany(mappedBy = "society")
    private List<Household> households;
}
