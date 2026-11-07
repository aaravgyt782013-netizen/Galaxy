export function SectionHead({ title, id }: { title: string; id?: string }) {
  return (
    <div className="gsh-sechead">
      <h2 id={id}>{title}</h2>
      <span className="gsh-sechead-line" />
    </div>
  );
}
