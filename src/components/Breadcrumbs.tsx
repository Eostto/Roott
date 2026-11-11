import Link from "next/link";

export default function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="breadcrumb" className="mx-auto mb-10 mt-5 max-w-[1256px] px-4">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] font-light leading-[14px] text-[#42454a]">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>→</span>}
            {it.href ? (
              <Link href={it.href} className="hover:text-black">
                {it.label}
              </Link>
            ) : (
              <span className="text-black">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
