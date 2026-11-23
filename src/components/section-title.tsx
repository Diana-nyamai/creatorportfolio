import { Flower, Spark } from "./art";

export function SectionTitle({ id, note, title, mark = "flower", description }: {
  id: string; note?: string; title: string; mark?: "flower" | "spark" | "heart"; description?: string;
}) {
  return (
    <div className="section-intro">
      {note && <p className="section-note"><Spark /> {note}</p>}
      <h2 id={id} className="section-title">{title}{" "}
        {mark === "flower" ? <Flower /> : mark === "spark" ? <Spark /> : <span aria-hidden="true">♡</span>}
      </h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
