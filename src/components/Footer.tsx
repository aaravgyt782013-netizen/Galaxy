import Link from "next/link";
import { Logo } from "./Logo";
import { FOOTER_LINKS, FOOTER_TAGS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer id="footer">
      <div className="gsh-footer-inner">
        <div className="gsh-footer-top">
          <div className="gsh-footer-brand">
            <Logo className="gsh-footer-logo" />
            <h3>
              Poke <b>Studio</b>
            </h3>
            <p>{SITE.tagline}</p>
          </div>

          <div className="gsh-footer-col">
            <h4>Categories</h4>
            <ul>
              {FOOTER_LINKS.categories.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="gsh-footer-col">
            <h4>Quick Links</h4>
            <ul>
              {FOOTER_LINKS.quick.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="gsh-footer-col">
            <h4>Follow</h4>
            <ul>
              {FOOTER_LINKS.follow.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer nofollow">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="gsh-footer-divider" />

        <div className="gsh-footer-bottom">
          <p className="gsh-footer-copy">
            © {new Date().getFullYear()} <b>Poke Studio</b>. All rights reserved.
          </p>
          <div className="gsh-footer-tags">
            {FOOTER_TAGS.map((tag) => (
              <span className="gsh-footer-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
