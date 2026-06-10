import { useEffect, useState } from "react";
import MetricCard from "./MetricCard";
import MetricsChart from "./MetricsChart";
import { getMetricData } from "../services/metricsService";
import "./Dashboard.css";

const METRICS = [
    {key: "commits", label: "Commits"},
    {key: "bugs", label: "Bugs solved"},
];

function Dashboard() {

    const [currentMetric, setCurrentMetric] = useState(METRICS[0]);
    const [data, setData] = useState([]);

    useEffect(() => {
        loadData(currentMetric.key);
    }, [currentMetric]);

    const loadData = async (metric) => {
        try {
        const result = await getMetricData(metric);
        setData(result);
        } catch (error) {
        console.error(error);
        }
    };

    const total = data.reduce(
        (sum, item) => sum + item.value,
        0
    );

    const promedio =
        data.length > 0
        ? (total / data.length).toFixed(1)
        : 0;

    const maximo =
        data.length > 0
        ? Math.max(...data.map(x => x.value))
        : 0;
    
       return (
        <div className="dashboard">
            <h1>Dashboard de Métricas</h1>
            <div className="dashboard-cards">
                <MetricCard title={`Total ${currentMetric.label}`} value={total} />
                <MetricCard title="Promedio Diario" value={promedio}/>
                <MetricCard title="Máximo" value={maximo}/>
            </div>

            <div className="buttons">
                {METRICS.map(i => (
                    <button
                        key = {i.key}
                        className= {"metric-btn"}
                        onClick={() => setCurrentMetric(i)}
                    >
                        {i.label}
                    </button>
                ))}
            </div>
            <MetricsChart
                data={data}
                label={currentMetric.label}
            />
        </div>
    );
};

export default Dashboard;