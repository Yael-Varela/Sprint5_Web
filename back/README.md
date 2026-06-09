# Análisis del Backend

```text
┌───────────────────┐
│      Frontend     │
└─────────┬─────────┘
          │ HTTP
          V
┌───────────────────┐
│ MetricsController │
└─────────┬─────────┘
          │
          V
┌───────────────────┐
│   MetricsService  │
└─────────┬─────────┘
          │
          V
┌───────────────────┐
│   DeveloperMetric │
│     Repository    │
└─────────┬─────────┘
          │
          V
┌───────────────────┐
│ Datos en Memoria  │
└───────────────────┘
```

## Estructura de Carpetas

El resumen de la estructura lógica del backend es:

```txt
back/
├── pom.xml
├── README.md
└── src
├── main
│ ├── java/com/exampleback/demo
│ │ ├── config
│ │ ├── controller
│ │ ├── dto
│ │ ├── model
│ │ ├── repository
│ │ ├── service
│ │ └── DemoApplication.java
│ └── resources
│ └── application.properties
└── test
```

### Descripción

Carpeta Descripción
controller Exposición de endpoints REST
service Lógica de negocio
repository Acceso a datos
dto Objetos de transferencia
model Representación de datos del dominio
config Seguridad y CORS

### PROS

- Separación clara entre Controller, Service y Repository.
- Uso de DTOs para desacoplar el frontend del modelo interno.
- Configuración de CORS separada en una clase dedicada.
- Configuración de seguridad desacoplada del resto de la aplicación.
- Arquitectura fácil de seguir para proyectos pequeños.

### CONS

- Existe una clase MetricResponseDTO duplicada.
- El Repository no utiliza una base de datos real.
- Hay DTOs definidos que no se utilizan.
- No existe validación de parámetros de entrada.
- La seguridad está completamente abierta.
- Se utilizan Strings para representar tipos de métricas.

## Función de las Capas

### Controller

Archivo:

```text
controller/
└── MetricsController.java
```

Responsabilidades:

- Exponer endpoints REST.
- Recibir solicitudes HTTP.
- Delegar la lógica al Service.

### Service

Archivo:

```txt
service/
└── MetricsService.java
```

Responsabilidades:

- Obtener información del Repository.
- Transformar entidades a DTOs.
- Determinar qué métrica se debe devolver.

### Repository

Archivo:

```txt
repository/
└── DeveloperMetricRepository.java
```

Responsabilidades:

- Proveer acceso a datos.

Actualmente devuelve:

```java
return List.of(...)
```

funciona como una fuente de datos simulada, pero es deseable que esté conectado con una DB real.

### DTO

Archivos:

```text
dto/
├── MetricRequestDTO.java
└── MetricResponseDTO.java
```

Responsabilidades:

- Transportar información entre capas.
- Evitar exponer directamente el modelo.

DTO:

```text
{
label,
value
}
```

### Model

Archivo:

```text
model/
└── DeveloperMetric.java
```

Representa:

developerName
metricDate
commits
bugsFixed
tasksCompleted
storyPoints

## Flujo de una Petición

Ejemplo:

```text

GET /metrics/commits

      Frontend
        │
        V
    MetricsController
        │
        V
    MetricsService
        │
        V
DeveloperMetricRepository
        │
        V
    DeveloperMetric
        │
        V
    MetricResponseDTO
        │
        V
      JSON
        │
        V
    Frontend
```

A pesar de todas los pasos que tiene el flujo, es intuitivo, facil de seguir y, sobre todo, escalable.

## Configuración de Seguridad

Archivo:

```txt
config/
└── SecurityConfig.java
```

Configuración actual:

```java
.authorizeHttpRequests(auth ->
auth.anyRequest().permitAll()
)
```

Características:

- Todas las rutas son públicas.
- No existe autenticación.
- No existe autorización.
- CSRF deshabilitado.

```java
csrf.disable()
```

### Observación

Esta configuración es adecuada para desarrollo local, pero no sería recomendable en producción.

## Configuración CORS

Archivo:

```txt
config/
└── CorsConfig.java
```

Origen permitido:
http://localhost:5173

Métodos permitidos:

GET
POST
PUT
DELETE
OPTIONS

### PROS

- Configuración Aislada.
- Fácil de modificar.

### CONS

- Origen hardcodeado (potenciales problemas de deploy)

## Peculiaridades

Clase DTO duplicada

```text
dto/MetricResponseDTO.java

repository/MetricResponseDTO.java
```

Además, los DTOs deberían existir únicamente dentro de:

```txt
dto/
```

### MetricRequestDTO no utilizado

MetricRequestDTO
Es dead code.

### Repository simulado

```java
return List.of(...)
```

devuelve información hardcodeada.

No existe una DB con datos persistentes.

### Uso de Strings para tipos de métricas

```java
switch(metric)
```

depende de valores de string específicos:

```java
"commits"
"bugs"
"tasks"
"storyPoints"
```

Esto puede ser manejado con una clase ENUM, lo que haría que typos en el estado fuesen detectados por el mismo compilador de java.

### Pobre debugging de método GET

Cualquier error en el método GET por http corre:

```java
dto.setValue(0);
```

Un sistema más explícito con sus funcionalidades debería devolver un error.

## Recomendaciones

Eliminar clases duplicadas

```text
dto/
└── MetricResponseDTO.java
```

Debe ser la única definición.

### Implementar persistencia real

Conectar con una DB usando potencialmente Spring Data JPA.

### Uso de Enum

Reemplazar:

```java
String metric
```

por la declaración de una clase ENUM.

### Seguridad

Replantear los contenidos de Security.config.java en caso de que se busque que el código salga en algún momento de su fase de desarollo.
