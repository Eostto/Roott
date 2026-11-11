/** Ilustrație generică de implant (provizorie, până adăugați pozele produselor). */
export default function ImplantIcon({
  color,
  className = "h-20 w-auto",
}: {
  color: string;
  className?: string;
}) {
  const id = color.replace(/[^a-z0-9]/gi, "");
  const threads = Array.from({ length: 9 }, (_, i) => 34 + i * 6.5);
  return (
    <svg viewBox="0 0 40 100" className={className} aria-hidden>
      <defs>
        <linearGradient id={`ti-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#8a8d96" />
          <stop offset=".45" stopColor="#e9eaee" />
          <stop offset="1" stopColor="#6d7079" />
        </linearGradient>
        <linearGradient id={`au-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#b8892c" />
          <stop offset=".5" stopColor="#f4d27a" />
          <stop offset="1" stopColor="#a2761f" />
        </linearGradient>
      </defs>
      {/* bont */}
      <path d="M15 4h10l2 18H13z" fill={`url(#au-${id})`} />
      <rect x="11" y="22" width="18" height="6" rx="1.5" fill={color} />
      {/* corp */}
      <path d="M12 30h16l-1.5 56L20 96l-6.5-10z" fill={`url(#ti-${id})`} />
      {threads.map((y, i) => (
        <path
          key={y}
          d={`M${10 + i * 0.25} ${y} L${30 - i * 0.25} ${y + 3}`}
          stroke="#5c5f68"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
