import "./MetricsChart.css";

import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale, 
    LinearScale,
    PointElement,
    LineElement,
    Title, 
    Tooltip, 
    Legend, 
    Filler
}   from "chart.js";


ChartJS.register(
    CategoryScale, 
    LinearScale,
    PointElement, 
    LineElement,
    Title, 
    Tooltip, 
    Legend, 
    Filler
);

function MetricsChart({ data }) {
    const chartData = {
        labels: data.map(item => item.label),
        datasets: [{
            label: "Commits",
            data: data.map(item => item.value),
            borderColor: "#2563eb",
            backgroundColor: "rgba(37,99,235,0.2)",
            fill: true,
            tension: 0.4
        }]
    };

    const options = {
        responsive: true,
        plugins: { legend: { position: "top" } }
    };

    return (
        <div className="chart-container">
            <h2>Evolución de Commits</h2>
            <Line data={chartData} options={options} />
        </div>
    );
}

export default MetricsChart;