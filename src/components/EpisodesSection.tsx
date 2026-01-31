// src/components/EpisodesSection.tsx
'use client';

import { useEffect, useState } from 'react';
import EpisodeCard, { Episode } from '@/components/EpisodeCard';
import { useEpisodes } from '@/lib/useEpisodes';

/** بيانات افتراضية مختصرة */
const defaultEpisodesData: Episode[] = [
  {
    id: 'career-game',
    title: 'الحياة المهنية .. لعبة أم خطة؟',
    summary:
      'التغيّر كقيمة لا كأزمة، وكيف نصيغ مسارًا مهنيًا واعيًا مع د. أمجد الجنباز.',
    youtube: 'https://youtu.be/E1XT1mp3aIY',
    soundcloud: 'https://on.soundcloud.com/VRp0bnhzxle2ER7PzF',
    spotify: 'https://open.spotify.com/',
    apple: 'https://podcasts.apple.com/',
    cover: '/EpisodeIMG.png',
  },
  {
    id: 'soft-skills',
    title: 'المهارات الناعمة في سوق العمل',
    summary:
      'أهمية المهارات الناعمة في التواصل والقيادة وحل المشكلات وتأثيرها على النجاح الوظيفي.',
    youtube: 'https://youtu.be/cmGXwhVqT00',
    soundcloud: 'https://on.soundcloud.com/vOGWlhMUpZdT8BPB8D',
    spotify: 'https://open.spotify.com/',
    apple: 'https://podcasts.apple.com/',
    cover: '/EpisodeIMG.png',
  },
  
  {
    id: 'life-quality',
    title: 'جودة الحياة',
    summary:
      'أثر جودة الحياة على الأفراد والمجتمعات ومحاور تحسينها مع د. أبعاد الزومال.',
    youtube: 'https://youtu.be/U9jYfy-1U3Q?si=lq9fRbt04bnTsA20',
    soundcloud: 'https://on.soundcloud.com/VRp0bnhzxle2ER7PzF',
    spotify:
      'https://open.spotify.com/episode/4pdMdNpN7b4LBDgFMfPadY?si=cagxb-sUTJmgjp8gixrYIA',
    apple:
      'https://podcasts.apple.com/sa/podcast/%D8%A7%D9%84%D8%AD%D9%8A%D8%A7%D8%A9-%D8%A7%D9%84%D9%85%D9%87%D9%86%D9%8A%D8%A9-%D9%84%D8%B9%D8%A8%D8%A9-%D8%A7%D9%85-%D8%AE%D8%B7%D8%A9/id1778013710?i=1000703507071',
    cover: '/EpisodeIMG.png',
  },
];

export default function EpisodesSection({
  episodes: externalEpisodes,
  title = 'المكتبة',
  subtitle = 'استمع لأحدث الحلقات واختر منصتك المفضلة',
}: {
  episodes?: Episode[];
  title?: string;
  subtitle?: string;
}) {
  const { episodes: userEpisodes = [] } = useEpisodes?.() ?? { episodes: [] };

  // منع اختلاف SSR/CSR
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // الأولوية: props > hook بعد mount > الافتراضي
  const baseEpisodes =
    (externalEpisodes && externalEpisodes.length > 0 && externalEpisodes) ||
    (mounted && userEpisodes.length > 0 && userEpisodes) ||
    defaultEpisodesData;

  // فلتر بسيط
  const [filter, setFilter] = useState<'latest' | 'popular'>('latest');
  const ordered =
    filter === 'latest' ? [...baseEpisodes] : [...baseEpisodes].reverse();

  // المميّزة + الباقي
  const [featured, ...rest] = ordered;

  return (
    <section id="latest-episodes" className="py-6 md:py-8 text-right">
      {/* رأس القسم */}
      <div className="mb-2 md:mb-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs md:text-sm font-semibold text-primary">
              {title}
            </p>
            <h2 className="text-base md:text-lg font-extrabold leading-tight mt-1">
              {subtitle}
            </h2>
          </div>

          {/* الفلاتر — مضغوطة */}
          {baseEpisodes.length > 1 && (
            <div className="flex gap-2 text-xs">
              <button
                className={`px-3 py-1.5 rounded-md transition ${
                  filter === 'latest'
                    ? 'bg-primary text-primary-foreground'
                    : 'border hover:bg-accent/30'
                }`}
                onClick={() => setFilter('latest')}
              >
                الأحدث
              </button>
              <button
                className={`px-3 py-1.5 rounded-md transition ${
                  filter === 'popular'
                    ? 'bg-primary text-primary-foreground'
                    : 'border hover:bg-accent/30'
                }`}
                onClick={() => setFilter('popular')}
              >
                الأكثر استماعاً
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ===== الحلقة المميّزة — بالوسط ونزلناها شوي ===== */}
      {featured && (
        <div className="w-full flex justify-center mt-8 md:mt-10">
          <div
            className="
              rounded-2xl border border-primary/20 bg-accent/10
              p-2 md:p-3
              w-full max-w-[680px]
              /* تكبير بصري خفيف: بين small و medium */
              [transform:scale(1.05)]
              md:[transform:scale(1.06)]
              origin-center
            "
          >
            <EpisodeCard episode={featured} size="small" />
          </div>
        </div>
      )}

      {/* ===== باقي الحلقات — أسفل المميّزة وبالوسط ===== */}
      {rest.length > 0 && (
        <div
          className="
            mt-7
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4
            justify-items-center
          "
        >
          {rest.map((ep) => (
            <div key={ep.id} className="w-full max-w-[340px]">
              <EpisodeCard episode={ep} size="small" />
            </div>
          ))}
        </div>
      )}

      {/* فاصل بسيط */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        حلقات قادمة — Coming Soon
      </div>
    </section>
  );
}
