# Prueba Juan Gutierrez Palvi

Reporte ejecutivo de métricas.

# Cómo correr el proyecto.

```bash
npm install
npm run dev
```

Abrir http://localhost:5173

# Decisiones técnicas.

- **Vite:**  setup mínimo, HMR rápido, tipos sin overhead.
- **Tailwind CSS:**  utilidades directas en el componente, sin CSS separado teniendo en cuenta el tiempo.
- **Recharts:**  declarativo y suficiente para este scope.
- **Sin estado global:**  useState + hooks propios es suficiente para este proyecto.
- **`useAlerts`**  lógica de alertas separada del renderingl. Usa el campo `direction` del JSON para determinar si una tendencia es buena o mala sin hardcodear el dominio.
- **`useDataset`**  única fuente para el dataset activo. Todos los componentes consumen de ahí, lo que hace que cambiar de dataset sea instantáneo y consistente.

# Features pendientes.

- **Selector de período** — hoy está fijo en 7 días. permitir elegir semana, mes o rango personalizable.
- **Comparación lado a lado** — ver dos datasets simultáneamente para realizar comparaciones.
- **Drill-down por métrica** — click en una KPI card para ver el detalle completo con estadísticas.