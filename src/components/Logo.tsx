export function Logo({ className = "gsh-logo" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 60"
      role="img"
      aria-label="Poke Studio"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="cb-l"
        d="M8 8h27c13 0 21 7 21 19S48 46 35 46H23v9H8V8Zm15 13v12h11c5 0 8-2 8-6s-3-6-8-6H23Z"
      />
      <path className="cb-t" d="M8 8h27c13 0 21 7 21 19l-9 5c0-8-4-11-12-11H23v12l-15 7V8Z" opacity=".95" />
      <path className="cb-r" d="M43 46h-8c13 0 21-7 21-19l-9 5c0 7-4 12-12 14l8 0Z" />
      <path className="cb-st" d="M49 3l2.2 5.8L57 11l-5.8 2.2L49 19l-2.2-5.8L41 11l5.8-2.2L49 3Z" />
    </svg>
  );
}
