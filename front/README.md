# Análisis del Frontend
```text
┌───────────────────┐
│    Backend API    │
└─────────┬─────────┘
          │ JSON
          ▼
┌───────────────────┐
│ metricsService.js │
│  (axios)          │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│  Dashboard.jsx    │
│  useState/        │
│  useEffect        │
└────┬──────────┬───┘
     │          │
     ▼          ▼
┌─────────┐ ┌──────────────┐
│Metric   │ │ MetricsChart │
│Card.jsx │ │    .jsx      │
└─────────┘ └──────────────┘
```

## Estructura de Carpetas

El resumen de la estructura del proyecto es la siguiente (solo elementos lógicos relevantes para la implementación):

```text
front/productivity-dashboard/src
├── App.jsx               → Root
├── App.css
├── main.jsx             
├── index.css
├── component/
│   ├── Dashboard.jsx     → Coordina el estado y los componentes.
│   ├── Dashboard.css
│   ├── MetricCard.jsx    → Formato de las tarjetas (reutilizable) para mostrar indicadores individuales.
│   ├── MetricCard.css
│   ├── MetricsChart.jsx  → Formato de gráficas (reutilizable).
│   └── MetricsChart.css
└── services/
    └── metricsService.js → Comunicación con el backend vía axios.

```

### Flujo de datos
```text
Backend API
      |
      ▼
metricService.js -> Realiza la petición HTTP con axios.
      |
      ▼
Dashboard.jsx   -> Maneja estado y coordina los componentes.
    │
    ├──▶ MetricCard.jsx    -> Muestra total, promedio y máximo de determinada metrica.
    └──▶ MetricsChart.jsx  -> Renderiza la gráfica de determinada métrica.

```


### Errores originales del código
- Los componentes de MetricCard y MetricChart originalmente estaban definidos dentro de Dashboard.jsx, teniendo múltiples componentes en un mismo archivo, lo que dificultaba la reutilización de código y la legibilidad.

- Toda la lógica de dashboard, por ende, tenía una mezcla de cálculos con la construcción de las tarjetas, gráficas y su renderizado.

- El CSS estaba también incluido en Dashboard.jsx junto a la lógica de componentes; al no estar separado por componentes, dificultaba la reutilización y legibilidad.

- Si bien no es un error, originalmente la gráfica solo mostraba los commits, entonces definimos como área de mejora el que la gráfica se pudiese actualizar a mostrar bugs encontrados en su lugar.

- Además, el frontend real se encuentra en productivity-dashboard, no directamente en la carpeta "front"


### Responsabilidad de los componentes

metricService.js: Centraliza las llamadas HTTP al backend. Cualquier componente que necesite datos los importa desde aquí. 

Dashboard.jsx: Es el coordinador que se encarga de mantener el estado de los datos obtenidos desde la API, calcular los indicadores (total, max, promedio) y pasar esa información a los componentes hijos. Aquí se contienen los botones de las métricas (commit o bugs); el que el usuario seleccione se vuelve la métrica activa y actual, lo que dispara automáticamente una petición al backend que actualice los componentes.

MetricCard.jsx: Componente reutilizable que muestre un indicador individual con un título y un valor. Se usa 3 veces para mostrar el total, promedio y máximo de la métrica seleccionada por el usuario.

MetricsChart.jsx: Componente reutilizable que se encarga de renderizar la gráfica. Recibe los datos y con ello puede representar cualquier métrica sin necesidad de crear más archivos o componentes para cada gráfica.

### Mejoras
- Se separó el antiguo dashboard con múltiples componentes en dos archivos de los componentes de MetricCard y MetricsChart, volviéndolos independientes, reutilizables y con su propio CSS.

- Dashboard ahora solo coordina y calcula.

- Se creo un selector de métricas con botones que actualiza la gráfica y las tarjetas para mostrar la información de los commits o bugs hechos por los desarrolladores.