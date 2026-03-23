import type { MetricContent } from "../../types/site";

export function MetricsSection({ metrics }: { metrics: MetricContent[] }) {
  return (
    <section className="metrics-strip">
      {metrics.map((metric) => (
        <div key={metric.label} className="metric-item">
          <span className="metric-value">{metric.value}</span>
          <span className="metric-label">{metric.label}</span>
        </div>
      ))}
    </section>
  );
}
