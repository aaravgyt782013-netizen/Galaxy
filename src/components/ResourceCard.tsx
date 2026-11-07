import Link from "next/link";
import { coverStyle, resourceHref, snippetFor, type Resource } from "@/data/resources";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function shortDate(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return `${MONTHS[(m ?? 1) - 1]} ${d}, ${y}`;
}

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="post-wrapper">
      <div className="labels-outer-container">
        <div className="labels-container">
          <span className="byline post-labels">
            {resource.labels.map((label) => (
              <Link
                key={label}
                href={`/category/${resource.category}`}
                rel="tag"
              >
                {label}
              </Link>
            ))}
          </span>
        </div>
      </div>

      <div className="slide">
        <div className="snippet-thumbnail-container">
          <Link
            className="snippet-thumbnail"
            href={resourceHref(resource.slug)}
            style={coverStyle(resource)}
            aria-label={resource.title}
            title={resource.title}
          />
        </div>

        <div className="post">
          <h2 className="post-title">
            <Link href={resourceHref(resource.slug)}>{resource.title}</Link>
          </h2>
          <p className="post-snippet">{snippetFor(resource)}</p>
        </div>
      </div>

      <div className="gsh-card-footer">
        <span className="gsh-card-meta">{shortDate(resource.date)}</span>
        <Link className="gsh-get-btn" href={resourceHref(resource.slug)}>
          GET IT NOW
        </Link>
      </div>
    </article>
  );
}
