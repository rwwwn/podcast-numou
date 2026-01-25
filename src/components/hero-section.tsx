// src/components/hero-section.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="py-14 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* النص */}
        <div className="text-center lg:text-right">
          {/* شارة */}
          <span
            className="
              inline-flex items-center gap-2 rounded-full border
              px-3.5 py-1.5 text-[13px] md:text-sm font-semibold
              bg-white/60 text-foreground/85 backdrop-blur ring-1 ring-white/40
              supports-[backdrop-filter]:bg-white/40
              dark:bg-white/10 dark:text-foreground dark:ring-white/15
            "
          >
            <span className="inline-block size-1.5 rounded-full bg-primary" />
            بودكاست نمو
          </span>

          {/* العنوان */}
<h1 className="mt-4 text-balance text-4xl font-extrabold leading-tight md:text-5xl">
  قصص وتجارب تُلهمنا{" "}
  <span
    className="
      inline bg-clip-text text-transparent
      bg-gradient-to-tr from-orange-400 to-orange-600
      dark:from-orange-300 dark:to-orange-500
    "
  >
    للنموّ
  </span>
  — من الجامعة وإليها
</h1>

          {/* الوصف */}
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-muted-foreground lg:mx-0">
            وفق رؤية تنموية طموحة نسلّط الضوء على مجالات متنوّعة في إطار ثقافي
            يهدف لتعزيز المعرفة والمهارات، وتلهمنا خطوات جديدة.
          </p>

          {/* الأزرار */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-end">
            <Button asChild size="lg" className="gap-2">
              <Link href="/episodes">
                <Play className="size-4" />
                استمع الآن
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/about">
                <Info className="size-4" />
                تعرّف على نمو
              </Link>
            </Button>
          </div>

          {/* المنصات (chips زجاجية مع هوفر برتقالي) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-end">
            <Platform
              href="https://open.spotify.com/episode/4pdMdNpN7b4LBDgFMfPadY?si=lW7157DrQ1K7_D3ObaEtNg"
              label="Spotify"
              src="/Spotify_icon.svg.png"
            />
            <Platform
              href="https://podcasts.apple.com/sa/podcast/podcast-numou-%D8%A8%D9%88%D8%AF%D9%83%D8%A7%D8%B3%D8%AA-%D9%86%D9%85%D9%88/id1778013710"
              label="Apple Podcasts"
              src="/apple-pod.png"
            />
            <Platform
              href="https://youtube.com/@numoupodcast?si=r0VFaqvNgC1RYwd8"
              label="YouTube"
              src="/youtube-icon.png"
            />
            <Platform
              href="https://m.soundcloud.com/podcast-numou?utm_source=mobi&utm_campaign=social_sharing"
              label="SoundCloud"
              src="/soundcloud-logo.png"
            />
          </div>
        </div>

        {/* صورة الغلاف (بطاقة زجاجية محسّنة) */}
        <div className="order-first lg:order-last">
          <div
            className="
              group relative mx-auto w-full max-w-2xl rounded-3xl
              bg-white/30 p-1 shadow-lg ring-1 ring-white/50
              backdrop-blur-xl transition
              hover:shadow-xl hover:drop-shadow
              dark:bg-white/5 dark:ring-white/10
              supports-[backdrop-filter]:bg-white/20
            "
          >
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/60 to-transparent opacity-70 mix-blend-overlay dark:from-white/15" />
            <div className="overflow-hidden rounded-[calc(theme(borderRadius.3xl)-4px)]">
              <Image
                src="/hero-cover.jpg"
                alt="غلاف بودكاست نمو"
                width={1120}
                height={430}
                className="h-full w-full transform object-cover transition duration-300 group-hover:scale-[1.02]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** شريحة منصة زجاجية */
function Platform({
  href,
  label,
  src,
}: {
  href: string;
  label: string;
  src: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="
        inline-flex items-center gap-2 rounded-full border px-3 py-1.5
        bg-white/60 text-sm backdrop-blur ring-1 ring-white/40
        transition will-change-transform
        hover:scale-105 hover:bg-accent hover:text-accent-foreground hover:ring-accent/40
        active:scale-95
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
        dark:bg-white/10 dark:ring-white/10
      "
      aria-label={label}
      title={label}
    >
      <Image src={src} alt={label} width={18} height={18} className="rounded-[4px]" />
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}