import type { Article, Block } from "@/data/articles";

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "p":
      return <p key={i}>{block.text}</p>;
    case "h2":
      return <h2 key={i}>{block.text}</h2>;
    case "h3":
      return <h3 key={i}>{block.text}</h3>;
    case "ul":
      return (
        <ul key={i}>
          {block.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i}>
          {block.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ol>
      );
    case "kv":
      return (
        <div className="gsh-info" key={i}>
          <h3>Resource information</h3>
          <dl className="gsh-kv">
            {block.rows.map(([k, v]) => (
              <div key={k} style={{ display: "contents" }}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      );
    case "note":
      return (
        <blockquote key={i}>
          <p>{block.text}</p>
        </blockquote>
      );
    case "quote":
      return (
        <blockquote key={i}>
          <p>{block.text}</p>
        </blockquote>
      );
    case "tagline":
      return (
        <p key={i}>
          <em>{block.text}</em>
        </p>
      );
    default:
      return null;
  }
}

export function ArticleBody({ article }: { article: Article }) {
  return <>{article.blocks.map((block, i) => renderBlock(block, i))}</>;
}
