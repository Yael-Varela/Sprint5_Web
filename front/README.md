# Análisis del Frontend

```text
┌───────────────────────┐
│      Backend API      │
└───────────┬───────────┘
            │
            V
┌───────────────────────┐
│    metricsService     │
└───────────┬───────────┘
            │
            V
┌───────────────────────┐
│      Dashboard        │
│                       │
│  useEffect()          │
│  useState()           │
└───────┬─────────┬─────┘
        │         │
        V         V
 MetricCard    Chart.js
                  │
                  V
          Gráfica Lineal
```

## Estructura de Carpetas

El resumen de la estructura del proyecto es la siguiente (solo elementos lógicos relevantes para la implementación):

```text
front/productivity-dashboard/src
├── App.css
├── App.jsx
├── component
│   └── Dashboard.jsx
├── index.css
├── main.jsx
└── services
    └── metricsService.js
```

### Descripción

| Carpeta/Archivo | Descripción.                                |
| --------------- | ------------------------------------------- |
| components      | Componentes visuales de React               |
| Dashboard.jsx   | Dashboard principal con métricas y gráficas |
| services        | Comunicación con APIs                       |
| App.jsx         | Componente raíz                             |

### PROS

- Carpeta especifica para la lógica relacionada a obtención de información por medio de APIs.
- Existencia de carpeta de componentes externa a App.jsx.

### CONS

- Demasiadas responsabilidades lógicas dentro de Dashboard.jsx.
- Creación de múltiples componentes en un solo archivo.
- Estructura de proyecto que no es ilurstrativa al flujo de trabajo del proyecto.

### Propuesta

```text
front/productivity-dashboard/src
├── components/
│   ├── Dashboard.jsx
│   ├── MetricCard.jsx
│   └── DashboardChart.jsx
│
├── services/
│   └── metricsService.js
│
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

- Dashboard ahora solo tiene la función de coordinar otros componentes.
- Potenciales reusos de entidades visuales ahora son más obvios al desarrollador.
- Modularidad.

## Componentes Principales

### Dashboard

Componente principal encargado de:

- Obtener información desde la API.
- Administrar el estado de los datos.
- Calcular métricas agregadas.
- Construir la gráfica de evolución.
- Renderizar tarjetas de indicadores.

```jsx
function Dashboard()
```

### MetricCard

Componente reutilizable utilizado para mostrar indicadores individuales.

```jsx
function MetricCard({ title, value })
```

Responsabilidades:

- Mostrar el nombre de la métrica.
- Mostrar el valor calculado.

**Sería ampliamente recomendado definirlo en un archivo aparte**

## Manejo del Estado con Hooks

### useState

Se utiliza para almacenar los datos obtenidos desde la API.

```jsx
const [data, setData] = useState([]);
```

### useEffect

En este caso, cuando el componente se monte, el useEffect será el encargado de llamar a la función que obtendrá los datos haciendo usos de llamadas a APIs.

```jsx
useEffect(() => {
  loadData();
}, []);
```

## Consumo de APIs

El proyecto propone una capa de servicios en la que manejar exclusivamente la lógica de acceso a datos.

En este caso, importamos las funciones definidas en esta carpeta en cualquier componente desde el que necesitemos manejar/mover información.

```jsx
import { getMetricData } from "../services/metricsService";
```

### Ventajas

- Separación de responsabilidades.
- Reutilización de código.
- Mayor mantenibilidad.
- Facilidad para pruebas unitarias.

**Esta es una de las mejores parted de este código**

## Relación entre Componentes

Es muy lineal.

```jsx
<MetricCard title="Total Commits" value={total} />
```

El componente Dashboard calcula los valores y los transmite mediante props al Metric Card.

## Implementación de Gráficas y Visualizaciones

La visualización se realiza utilizando _Chart.js_

```jsx
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
```

### Construcción de datos

```jsx
const chartData = {
  labels: data.map((item) => item.label),
  datasets: [
    {
      label: "Commits",
      data: data.map((item) => item.value),
    },
  ],
};
```

### Renderizado

```jsx
<Line data={chartData} options={chartOptions} />
```

## Resumen de Posibles Mejoras

### Separar MetricCard

Se recomienda:

```text
components/
├── Dashboard.jsx
└── MetricCard.jsx
```

### Errores más desciptivos.

```jsx
console.error(error);
```

Se sucede un error, un usuario de la aplicación no tendrá retoalimentación clara, entorpeciendo la experiencia.
Se puede crear un componente que se encargue de mostrar de manera comprensiva los errores al usuario final .

### Planeación de manejo de estilos

Actualmente se utilizan estilos inline.

```jsx
style={{ ... }}
```

Se recomienda:

- CSS Modules
- Tailwind CSS
- Material UI
- Bootstrap

### Uso de TypeScript

Definir tipos para las métricas.

```tsx
interface Metric {
  label: string;
  value: number;
}
```

El flujo de datos no es muy complejo actualmente, pero typesript nos ayudará a tener un código más sostenible y facil de interpretar (e cuanto a la capa de datos se refiere).
