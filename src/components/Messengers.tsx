import { MESSENGERS } from "@/lib/company";

/** Iconițe WhatsApp / Telegram pentru numărul de telefon. */
export default function Messengers({ size = 22, light = false, className = "" }: { size?: number; light?: boolean; className?: string }) {
  const color = light ? "#fff" : "#2d2d2d";
  return (
    <span className={`${className || "inline-flex"} items-center gap-2`}>
      {MESSENGERS.map((m) => (
        <a key={m.name} href={m.href} target="_blank" rel="noopener noreferrer" title={m.name} aria-label={m.name} className="transition-opacity hover:opacity-60">
          {m.name === "WhatsApp" ? (
            <svg width={size} height={size} viewBox="0 0 32 32" fill={color} aria-hidden>
              <path d="M16 2.7C8.7 2.7 2.8 8.6 2.8 15.9c0 2.3.6 4.6 1.8 6.6L2.7 29.3l7-1.8c1.9 1.1 4.1 1.6 6.3 1.6 7.3 0 13.2-5.9 13.2-13.2S23.3 2.7 16 2.7zm0 24.1c-2 0-3.9-.5-5.6-1.5l-.4-.2-4.2 1.1 1.1-4.1-.3-.4c-1.1-1.8-1.7-3.8-1.7-5.9 0-6 4.9-10.9 11-10.9s10.9 4.9 10.9 10.9-4.9 11-10.8 11zm6-8.2c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.7-1.7-1-.9-1.7-2-1.9-2.3-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.6.1-.2 0-.4 0-.6-.1-.2-.8-1.8-1-2.5-.3-.7-.5-.6-.8-.6h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5.1.8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 2-.8 2.2-1.6.3-.8.3-1.5.2-1.6-.1-.1-.3-.2-.6-.3z" />
            </svg>
          ) : (
            <svg width={size} height={size} viewBox="0 0 32 32" fill={color} aria-hidden>
              <path d="M16 2.7C8.7 2.7 2.7 8.7 2.7 16S8.7 29.3 16 29.3 29.3 23.3 29.3 16 23.3 2.7 16 2.7zm6.5 9.1-2.2 10.3c-.2.7-.6.9-1.2.6l-3.3-2.4-1.6 1.5c-.2.2-.3.3-.7.3l.2-3.4 6.1-5.5c.3-.2-.1-.4-.4-.2l-7.5 4.7-3.2-1c-.7-.2-.7-.7.1-1l12.6-4.9c.6-.2 1.1.1.9 1z" />
            </svg>
          )}
        </a>
      ))}
    </span>
  );
}
