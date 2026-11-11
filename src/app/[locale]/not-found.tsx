import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-4">
      <div className="text-center">
        <p className="text-[64px] font-semibold leading-none">404</p>
        <p className="mt-4 text-[16px]">Pagina este în lucru · Страница в разработке</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/ro" className="btn-dark">RO</Link>
          <Link href="/ru" className="btn-dark">RU</Link>
        </div>
      </div>
    </div>
  );
}
