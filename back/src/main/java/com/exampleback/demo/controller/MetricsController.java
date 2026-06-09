package com.exampleback.demo.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.exampleback.demo.dto.MetricResponseDTO;
import com.exampleback.demo.service.MetricsService;

@RestController
@RequestMapping("/metrics")
public class MetricsController {

    private final MetricsService service;

    public MetricsController(MetricsService service) {
        this.service = service;
    }

    @GetMapping("/{metric}")
    public List<MetricResponseDTO> getMetricData(
            @PathVariable String metric) {
        return service.getMetricData(metric);
    }
}