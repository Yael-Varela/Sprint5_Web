package com.exampleback.demo.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.exampleback.demo.dto.MetricResponseDTO;
import com.exampleback.demo.model.DeveloperMetric;
import com.exampleback.demo.repository.DeveloperMetricRepository;

@Service
public class MetricsService {

    private final DeveloperMetricRepository repository;

    public MetricsService(DeveloperMetricRepository repository) {
        this.repository = repository;
    }

    public List<MetricResponseDTO> getMetricData(String metric) {
        List<DeveloperMetric> metrics = repository.findAll();

        return metrics.stream()
            .map(m -> {
                MetricResponseDTO dto = new MetricResponseDTO();
                dto.setLabel(m.getMetricDate().toString());

                switch (metric) {
                    case "commits"     -> dto.setValue(m.getCommits());
                    case "bugs"        -> dto.setValue(m.getBugsFixed());
                    case "tasks"       -> dto.setValue(m.getTasksCompleted());
                    case "storyPoints" -> dto.setValue(m.getStoryPoints());
                    default            -> dto.setValue(0);
                }

                return dto;
            })
            .toList();
    }
}