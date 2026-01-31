ponents/EpisodesSection.tsx
'use client';

import { useEffect, useState } from 'react';
import EpisodeCard, { Episode } from "@/components/EpisodeCard";
import { useEpisodes } from '@/lib/useEpisodes';

const defaultEpisodesData: Episode[] = [
  // (يمين) تجربة جديدة
  {
    id: "e1",
    title: "تجربة جديدة: من هنا نبدأ",
    summary: "من أين بدأ بودكاست نمو؟ قصتنا، أهدافنا، وما الذي نقدّمه للمستمع.",
    cover: "/EpisodeIMG.png",
    soundcloud: "https://on.soundcloud.com/VFgc8VuInHHS3Mpl5r",
    apple: "https://podcasts.apple.com/sa/podcast/%D8%AA%D8%AC%D8%B1%D8%A8%D8%A9-%D8%AC%D8%AF%D9%8A%D8%AF%D8%A9-%D9%85%D9%86-%D9%87%D9%86%D8%A7-%D9%86%D8%A8%D8%AF%D8%A3/id1778013710?i=1000676325381",
  },

  // (وسط) الحلقة الأولى
  {
    id: "e2",
    title: "الحلقة الأولى: المهارات الناعمة في سوق العمل",
    summary: "ليش المهارات الناعمة تصنع فرقًا؟ وكيف نطوّرها ونستخدمها في مواقف حقيقية.",
    cover: "/EpisodeIMG.png",
    soundcloud: "https://on.soundcloud.com/vOGWlhMUpZdT8BPB8D",
    apple: "https://podcasts.apple.com/sa/podcast/%D8%A7%D9%84%D9%85%D9%87%D8%A7%D8%B1%D8%A7%D8%AA-%D8%A7%D9%84%D9%86%D8%A7%D8%B9%D9%85%D8%A9-%D9%81%D9%8A-%D8%B3%D9%88%D9%82-%D8%A7%D9%84%D8%B9%D9%85%D9%84/id1778013710?i=1000676518783",
    youtube: "https://youtu.be/cmGXwhVqT00?si=gorfLH-0Ee8qN9-e",
    spotify: "https://open.spotify.com/episode/5znkESmkpPT8HVZ2gGmed2?si=CFddISmTTF-wG3ylEr_Qqw",
  },

  // (يسار) الحياة المهنية
  {
    id: "e3",
    title: "الحياة المهنية.. لعبة أم خطة؟",
    summary: "نقاش عملي حول بناء مسار مهني واعٍ: صدفة أم تخطيط؟ وكيف نبدأ بخطوات واضحة.",
    cover: "/EpisodeIMG.png",
    soundcloud: "https://on.soundcloud.com/VRp0bnhzxle2ER7PzF",
    apple: "https://podcasts.apple.com/sa/podcast/%D8%A7%D9%84%D8%AD%D9%8A%D8%A7%D8%A9-%D8%A7%D9%84%D9%85%D9%87%D9%86%D9%8A%D8%A9-%D9%84%D8%B9%D8%A8%D8%A9-%D8%A7%D9%85-%D8%AE%D8%B7%D8%A9/id1778013710?i=1000703507071",
    youtube: "https://youtu.be/E1XT1mp3aIY",
    spotify: "https://open.spotify.com/episode/4pdMdNpN7b4LBDgFMfPadY?si=cagxb-sUTJmgjp8gixrYIA",
  },
];

export default function EpisodesSection({
  episodes: externalEpisodes,
  title = "أحدث الحلقات",
  subtitle = "لمحة سريعة عن الإصدارات.",
}: {
  episodes?: Episode[];
  title?: string;
  subtitle?: string;
}) {
  const { episodes: userEpisodes } = useEpisodes();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use external episodes if provided, otherwise use user episodes or defaults
  const displayEpisodes = externalEpisodes 
    ? externalEpisodes 
    : mounted && userEpisodes.length > 0 
    ? userEpisodes 
    : defaultEpisodesData;

  return (
    <section id="latest-episodes" className="py-14 md:py-20">
      <div className="mb-6">
        <p className="text-sm font-semibold text-primary">المكتبة</p>
        <h2 className="text-2xl md:text-3xl font-extrabold">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayEpisodes.map((ep) => (
          <EpisodeCard key={ep.id} episode={ep} />
        ))}
      </div>
    </section>
  );
}
