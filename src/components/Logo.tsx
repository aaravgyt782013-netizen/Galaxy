export function Logo({ className = "gsh-logo" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 60"
      role="img"
      aria-label="Galaxy Setup Pro"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* isometric block: top / left / right faces */}
      <polygon className="cb-t" points="32,2 60,17 32,32 4,17" />
      <polygon className="cb-l" points="4,17 32,32 32,58 4,43" />
      <polygon className="cb-r" points="60,17 60,43 32,58 32,32" />
      {/* sparkle */}
      <polygon
        className="cb-st"
        points="50,6 52.4,11.6 58,14 52.4,16.4 50,22 47.6,16.4 42,14 47.6,11.6"
      />
    </svg>
  );
}
