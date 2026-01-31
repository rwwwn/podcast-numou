// src/components/EpisodeCard.tsx
'use client';

import Image from "next/image";

export type Episode = {
  id: string;
  title: string;
  summary?: string;
  date?: string;     // ISO
  duration?: string; // "18:32"
  cover?: string;    // "/EpisodeIMG.png"
  soundcloud?: string;
  youtube?: string;
  spotify?: string;
  apple?: string;
};

const platforms = [
  { key: "spotify", label: "Spotify", icon: "/Spotify_icon.svg.png" },
  { key: "apple", label: "Apple Podcasts", icon: "/apple-pod.png" },
  { key: "youtube", label: "YouTube", icon: "/youtube-icon.png" },
  { key: "soundcloud", label: "SoundCloud", icon: "/soundcloud-logo.png" },
] as const;

// ===== الإضافة المهمة: دعم size + توسيط الصورة =====
type EpisodeCardProps = {
  episode: Episode;
  /** حجم الكرت: small (افتراضي) | medium | featured */
  size?: "small" | "medium" | "featured";
};

export default function EpisodeCard({ episode, size = "small" }: EpisodeCardProps) {
  const {
    title,
    summary,
    date,
    duration,
    cover = "/EpisodeIMG.png",
    soundcloud,
    youtube,
    spotify,
    apple,
  } = episode;

  // ترتيب أفضلية الرابط الأساسي (تقدرين تغيّرينه لو تبين)
  const primaryLink = youtube || soundcloud || spotify || apple;

  const isNew = isRecent(date, 14);

  // مقاسات ديناميكية حسب الحجم
  const coverWidth =
    size === "featured" ? 960 : size === "medium" ? 800 : 640;
  const coverHeight = Math.round(coverWidth * 0.5625); // نسبة 16:9
  const titleSize =
    size === "featured" ? "text-xl" : size === "medium" ? "text-lg" : "text-base";
  const summaryClamp =
    size === "featured" ? "line-clamp-4" : size === "medium" ? "line-clamp-4" : "line-clamp-3";

  return (
    <article
      className="
        group relative rounded-2xl border p-4 transition
        hover:-translate-y-0.5 hover:shadow-md
        hover:border-teal/40
        bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/70
        text-right
      "
    >
      {/* NEW badge */}
      {isNew && (
        <span
          className="
            absolute -top-2 -left-2 z-10 rounded-full bg-coral text-white text-[10px]
            px-2 py-1 shadow-sm
          "
        >
          جديد
        </span>
      )}

      {/* الغلاف + شارة المدّة */}
      <div className="relative mb-3 overflow-hidden rounded-xl">
        <Image
          src={cover}
          alt={title}
          width={coverWidth}
          height={coverHeight}
          // أهم سطر لتوسيط الصورة داخل الكرت
          className="aspect-video w-auto max-w-full object-cover mx-auto transition group-hover:scale-[1.01]"
          sizes={
            size === "featured"
              ? "(max-width: 1024px) 100vw, 800px"
              : "(max-width: 1024px) 100vw, 33vw"
          }
          priority={size !== "small"} // نخلي featured/medium أعلى أولوية
        />
        {duration ? (
          <span
            className="
              absolute bottom-2 right-2 rounded-full bg-black/55 px-2 py-1 text-[11px]
              text-white backdrop-blur-sm
              dark:bg-black/50
            "
          >
            {duration}
          </span>
        ) : null}
      </div>

      {/* العنوان والملخص */}
      <h3 className={`mb-1 line-clamp-2 font-semibold leading-6 ${titleSize}`}>
        {title}
      </h3>
      {summary ? (
        <p className={`${summaryClamp} text-sm leading-6 text-muted-foreground`}>
          {summary}
        </p>
      ) : null}

      {/* التاريخ */}
      {date && (
        <div className="mt-3 text-xs text-muted-foreground">
          {formatDate(date)}
        </div>
      )}

      {/* الأزرار والمنصّات */}
      <div className="mt-4 flex items-center gap-2">
        {primaryLink && (
          <a
            href={primaryLink}
            target="_blank"
            rel="noreferrer"
            className="
              rounded-md bg-primary px-3 py-2 text-xs font-medium
              text-primary-foreground transition hover:opacity-90
            "
          >
            استمع الآن
          </a>
        )}

        <div className="ms-auto flex items-center gap-2">
          {platforms.map((p) => {
            const raw = (episode as Record<string, unknown>)[p.key];
            const href = typeof raw === "string" ? raw : undefined;
            if (!href) return null;
            return (
              <a
                key={p.key}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={p.label}
                title={p.label}
                className="
                  inline-flex h-9 w-9 items-center justify-center rounded-full border
                  bg-background transition
                  hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]
                  focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50
                "
              >
                <Image src={p.icon} alt={p.label} width={18} height={18} />
              </a>
            );
          })}
        </div>
      </div>
    </article>
  );
}

/* ===== helpers ===== */
function formatDate(iso?: string) {
  if (!iso) return null;
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("ar-SA", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}
function isRecent(iso?: string, days = 14) {
  if (!iso) return false;
  const d = new Date(iso).getTime();
  const now = Date.now();
  return now - d <= days * 24 * 60 * 60 * 1000;
}
