# Análisis del Backend
```text
┌───────────────────┐
│      Frontend     │
└─────────┬─────────┘
          │ GET/metrics/{commits or bugs}
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
│ Base de datos H2  │
└───────────────────┘
          │
          ▼
┌───────────────────┐
│ MetricResponseDTO │
│ { label, value }  │
└─────────┬─────────┘
          │ JSON
          ▼
┌───────────────────┐
│     Frontend      │
└───────────────────┘ 
Actualiza
```

## Estructura de Carpetas

El resumen de la estructura lógica del backend es:

```text
back/
├── pom.xml -> Dependencias
└── src/
    └── main/
        ├── java/com/exampleback/demo/
        │   ├── config/
        │   │   ├── CorsConfig.java        -> Configuración de CORS
        │   │   └── SecurityConfig.java
        │   ├── controller/
        │   │   └── MetricsController.java -> Exposición de endpoints REST
        │   ├── dto/
        │   │   ├── MetricRequestDTO.java  -> Objeto de entrada
        │   │   └── MetricResponseDTO.java -> Objeto de salida hacia el frontend
        │   ├── model/
        │   │   └── DeveloperMetric.java   -> Representa la base de datos
        │   ├── repository/
        │   │   └── DeveloperMetricRepository.java -> Acceso a la base de datos
        │   ├── service/
        │   │   └── MetricsService.java    -> Lógica
        │   └── DemoApplication.java       -> Punto de entrada de la aplicación
        └── resources/
            ├── application.properties     -> Configuración de BD, JPA y servidor
            └── data.sql                   -> Datos de la base
```


### Descripción

- Controller: Recibe las peticiones HTTP del frontend y se las comunica al Sertice. No contiene lógica, solo mapea rutas y devuelve la respuesta.

- Service: Contiene la lógica. Consulta los datos en el repository y determina qué métrica devolver según el parámetro recibido, transformando la entidad a DTO antes de enviarlo al controller.

- Repository: Punto de acceso a la base de datos; además, es donde se obtienen los métodos de JPA para la consulta que se realiza en la actividad.

- Model: Representa la tabla de la base de datos. JPA lee esta clase al iniciar y genera la tabla automaticamente.

- DTO: Es donde se construye la respuesta con solo los campos necesarios (label y value), desacoplando la estructura de la base de datos de lo que el frontend consume.

- Config: Es la carpeta con las clases de configuración para acceder al backend.

### Errores originales del código base
- Había dependencias sin usar en el pom.xml, como Firebase, la cual estaba declarada, pero nunca se hacía uso de ella.

- Lombok no estaba configurado, entonces era una dependencia adicional que no realizaba nada.

- MetricResponseDTO estaba duplicado como archivo y existía afuera de la carpeta DTO (estaba en repository)

- Repository no tenía una base de datos; los datos estaban hardcodeados y no se consultaba a ninguna base de datos.

- DeveloperMetric no tenía anotaciones JPA, por lo que nunca se creaba una tabla para esta clase.

- MetricRequestDTO estaba sin usar.

- Un error menor fue que el CORS solo permitía acceso desde localhost, pero si usabas una IP local (e.j 127.0.0.1), no te permitía el acceso.

#### Mejoras implementadas
- Conexión a base de datos (H2) configurada con datos iniciales desde data.sql

- DeveloperMetric se convirtió en una entidad JPA, la cual generaba la tabla SQL automáticamente.

- Se hicieron los constructores y métodos (getters, setters) manualmente para poder compilar.

- Eliminamos las dependencias sin uso.

- Se corrigió el CORS para permitir nuestro origen del frontend.

