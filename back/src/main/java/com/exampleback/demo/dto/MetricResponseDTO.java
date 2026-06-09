package com.exampleback.demo.dto;

public class MetricResponseDTO {

    private String label; //It's a weird name for the date
    private Integer value;

    public MetricResponseDTO() {}

    public MetricResponseDTO(String label, Integer value) {
        this.label = label;
        this.value = value;
    }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
    public Integer getValue() { return value; }
    public void setValue(Integer value) { this.value = value; }
}