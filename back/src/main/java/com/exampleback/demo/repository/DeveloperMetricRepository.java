package com.exampleback.demo.repository;

import com.exampleback.demo.model.DeveloperMetric;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeveloperMetricRepository
        extends JpaRepository<DeveloperMetric, Long> {
}