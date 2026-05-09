package com.cleangreen.api.repository;

import com.cleangreen.api.model.Household;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HouseholdRepository extends JpaRepository<Household, Long> {
    
    // Get top households within a specific society
    List<Household> findTop10BySocietyIdOrderByCurrentPointsDesc(Long societyId);
    
    // Get global household rankings
    List<Household> findTop50ByOrderByCurrentPointsDesc();
}
