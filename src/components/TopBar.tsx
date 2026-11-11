import type { Dictionary } from "@/i18n/get-dictionary";

export default function TopBar({ t }: { t: Dictionary["topBar"] }) {
  return (
    <div className="bg-navy p-[10px] text-center text-[12px] leading-[19px] text-white md:text-[14px]">
      {t.text}{" "}
      <a href="https://roott.dental/" target="_blank" rel="noreferrer" className="text-lime">
        {t.brand}
      </a>{" "}
      {t.suffix}
    </div>
  );
}
