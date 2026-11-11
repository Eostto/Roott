// Descarcă pozele de pe roott.ru în public/images/roott/
// Rulare (din folderul proiectului):  node scripts/download-images.mjs
import { mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const BASE = "https://roott.ru";
const OUT = path.join(process.cwd(), "public", "images", "roott");

const files = {
  // logo + iconițe
  "logo.svg": "/local/templates/trate/assets/img/65f716197d0abeb5b1192f1e_Logo.svg",
  "icon-arrow-circle.svg": "/local/templates/trate/assets/img/660159ffb6380b3916996627_ArrowCircleRight.svg",
  "icon-telegram-footer.svg": "/local/templates/trate/assets/img/telegram-icon-footer.svg",
  "icon-whatsapp-footer.svg": "/local/templates/trate/assets/img/whatsapp-icon-footer.svg",
  "icon-search.svg": "/local/templates/trate/assets/img/seatch-icon.svg",
  "icon-arrow.svg": "/local/templates/trate/assets/img/arrow-icon.svg",
  "social-tg.svg": "/local/templates/trate/assets/img/social/tg.svg",
  "social-yt.svg": "/local/templates/trate/assets/img/social/yt.svg",
  "social-ig.svg": "/local/templates/trate/assets/img/social/ig.svg",
  "social-vk.svg": "/local/templates/trate/assets/img/social/vk.svg",

  // banda cu produse (implant + text)
  "product-r.png": "/upload/iblock/230/iqc8wrzw2uacgokt179lxgextk5l2p22.png",
  "product-r-txt.png": "/upload/iblock/85d/zkpta2eu9xx3h8iwci79ta0nguhxpe9j.png",
  "product-m.png": "/upload/iblock/429/qorh5a2hwynrsmkvtiie40etz2owne3c.png",
  "product-m-txt.png": "/upload/iblock/6e1/74w3jfyrh1uu409niwy0od86vj7tma51.png",
  "product-p.png": "/upload/iblock/813/9kh05eagk0ra2bm14asibamtj3n17r3m.png",
  "product-p-txt.png": "/upload/iblock/450/gfrc8cw8dxz68kk3y4qxsbtq9ffxj86l.png",
  "product-c.png": "/upload/iblock/4d4/ouhp5grvbufc124ku5fpwsq6vwducsfd.png",
  "product-c-txt.png": "/upload/iblock/455/1blsgp84ss7dda49ed1chgq5q4wwvqr7.png",
  "product-cs.png": "/upload/iblock/1e1/etqmbo1gd5cvojl1umq7dw7h8r9g2nvg.png",
  "product-cs-txt.png": "/upload/iblock/833/zc84orei14z9inap22jnw6ce6jjxmjco.png",
  "product-b.png": "/upload/iblock/e5b/n09r2cr5y8g9r8j0q3z219xmeullj57u.png",
  "product-b-txt.png": "/upload/iblock/7b3/8ch51s1d45eakvcf48xb6ro9ekzesxqi.png",
  "product-bs.png": "/upload/iblock/57b/zmbx2pdiwfagxhzpasj4mggz5yrus4ki.png",
  "product-bs-txt.png": "/upload/iblock/0fe/fl2z9j6njzpjb0t3mcdkhtyioqt8cyuy.png",

  // bannere
  "hero-dealer.jpg": "/images/dealer-banner.jpg",
  "hero-system.jpg": "/upload/iblock/278/0jt2uk3ku58shbr91w2o4ok1vuupj73l.jpg",
  "system-bg.svg": "/images/home-banner-bg.svg",
  "system.webp": "/images/home-banner.webp",
  "feature-training.jpg": "/upload/iblock/166/wh6461nvlckg0b87kd0t5wn7dx2tfhpa.jpg",
  "feature-lab.jpg": "/upload/iblock/062/inr12akhxyp2w6oose3ctrwgkcc82dqb.jpg",
  "feature-advantages.png": "/upload/iblock/88c/7gaguxijfdyi2tjcpffljx3op6ckgv5n.png",
  "contact.png": "/local/templates/trate/assets/img/ewfwef3241efw.png",

  // promoții
  "promo-1.jpg": "/upload/iblock/ded/b9oe4qsm6935qkvi3xs9s5bawas6o7sz.jpg",
  "promo-2.jpg": "/upload/iblock/793/ekr2eklwlalkgrfgc2gvdy423g322g86.jpg",
  "promo-3.jpg": "/upload/iblock/067/wq0a4byffn6f8t5q0i5gvc6d4wughfm6.jpg",
  "promo-4.jpg": "/upload/iblock/733/b1vbv2vbg5m3r8qc6gsqv9c9powlglfy.jpg",
  "promo-5.jpg": "/upload/iblock/466/7cmajey1rdkb2ndus5say23aszdgvss7.jpg",

  // noutăți + articole
  "news-1.jpg": "/upload/iblock/00c/8c3c53e6yl05f4itmrae5xwvmz2jxpv8.jpg",
  "news-2.jpg": "/upload/iblock/e7f/lv3fljqrmq5vqiar4sum7hdc8o8xhgfj.jpg",
  "news-3.jpg": "/upload/iblock/ce7/n9qjz2ezz16ge4c8tpb1cw7kf71gsgva.jpg",
  "news-4.jpg": "/upload/iblock/19b/huch86iyzk2t7q6ozw4pa317qufiytsa.jpg",
  "article-1.jpg": "/upload/iblock/26a/89c2p9n4gbdw3riy7cm8r3ttdx2u91mv.jpg",
  "article-2.jpg": "/upload/iblock/c19/t63l23l9qbspcobwh2ep4to626whbulv.jpg",
  "article-3.jpg": "/upload/iblock/070/jl13pedaf37l3g6r9uv0qp2fcwpbgu67.jpg",
};

await mkdir(OUT, { recursive: true });
let ok = 0;
let failed = 0;

for (const [name, url] of Object.entries(files)) {
  const dest = path.join(OUT, name);
  try {
    if ((await stat(dest).catch(() => null))?.size) {
      ok++;
      continue; // deja descărcat
    }
    const res = await fetch(BASE + url, {
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh) roott.md-setup", Referer: BASE + "/" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    ok++;
    console.log("✓", name);
  } catch (e) {
    failed++;
    console.log("✗", name, "-", e.message);
  }
}

console.log(`\nGata: ${ok} poze în public/images/roott${failed ? `, ${failed} eșuate (rulați din nou)` : ""}.`);
