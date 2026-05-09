package com.cleangreen.api.repository;

import com.cleangreen.api.model.PointsLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PointsLogRepository extends JpaRepository<PointsLog, Long> {
    List<PointsLog> findByHouseholdIdOrderByCreatedAtDesc(Long householdId);
    List<PointsLog> findByStatusOrderByCreatedAtDesc(String status);
}
