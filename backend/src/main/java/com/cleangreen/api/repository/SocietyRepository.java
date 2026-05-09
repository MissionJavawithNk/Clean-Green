package com.cleangreen.api.repository;

import com.cleangreen.api.model.Society;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SocietyRepository extends JpaRepository<Society, Long> {
    
    // Get top societies within a district
    List<Society> findTop10ByDistrictIdOrderByTotalScoreDesc(Long districtId);
    
    // Global society rankings
    List<Society> findTop20ByOrderByTotalScoreDesc();
}
