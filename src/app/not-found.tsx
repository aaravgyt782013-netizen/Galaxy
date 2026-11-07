import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page_body item-view" id="main">
      <div className="main-container">
        <div className="post-wrapper" style={{ textAlign: "center" }}>
          <h1 className="post-title">404 — Resource not found</h1>
          <p style={{ color: "var(--muted)", margin: "1rem 0 1.5rem" }}>
            That page has moved or never existed. Browse the library instead.
          </p>
          <div className="gsh-hero-btns" style={{ justifyContent: "center" }}>
            <Link className="gsh-btn" href="/">
              Back home
            </Link>
            <Link className="gsh-btn ghost" href="/category/plugin">
              Browse plugins
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
