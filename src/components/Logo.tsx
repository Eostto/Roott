/* eslint-disable @next/next/no-img-element */
/** Logo ROOTT (descărcat de scripts/download-images.mjs în /public/images/roott/logo.svg). */
export default function Logo({ className = "h-[50px] w-[52px]" }: { className?: string }) {
  return <img src="/images/roott/logo.svg" alt="ROOTT" className={className} />;
}
