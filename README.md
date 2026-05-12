# Prueba Juan Gutierrez Palvi

Reporte ejecutivo de métricas.

# Cómo correrlo

```bash
npm install
npm run dev
```

Abrir http://localhost:5173

# Decisiones técnicas

- **Vite:**  setup mínimo, HMR rápido, tipos sin overhead
- **Tailwind CSS:**  utilidades directas en el componente, sin CSS separado
- **Recharts:**  declarativo y suficiente para este scope; evité librerías más pesadas
- **Sin estado global:**  useState + hooks propios es suficiente para una sola página
- **`useAlerts`**  lógica de alertas separada del rendering; usa el campo `direction` del JSON para determinar si una tendencia es buena o mala sin hardcodear el dominio
- **`useDataset`**  única fuente de verdad para el dataset activo; todos los componentes consumen de ahí, lo que hace que cambiar de dataset sea instantáneo y consistente

# Features pendientes

- **Selector de período** — hoy está fijo en 7/30 días; permitir elegir semana, mes o rango custom
- **Comparación lado a lado** — ver dos datasets simultáneamente para el demo
- **Drill-down por métrica** — click en una KPI card para ver el detalle completo con estadísticas
- **Win rate como métrica explícita** — hoy se muestra en alertas pero no tiene su propia card# Palvi-test
