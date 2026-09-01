import styles from "./editorial-section-heading.module.css";

interface EditorialSectionHeadingProps {
  number: string;
  title: string;
  accent: string;
  note: string;
  id: string;
}

export function EditorialSectionHeading({
  number,
  title,
  accent,
  note,
  id,
}: EditorialSectionHeadingProps) {
  return (
    <div className={styles.heading}>
      <div className={styles.number}>{number}</div>
      <div>
        <h2 className={styles.title} id={id}>
          {title}<em>{accent}</em>
        </h2>
        <p className={styles.note}>{note}</p>
      </div>
    </div>
  );
}
