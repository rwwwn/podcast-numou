'use client';

import EpisodesSection from '@/components/EpisodesSection';

export default function EpisodesPage() {
  return (
    <div className="py-10 md:py-14">
      {/* Header */}
      <div className="mb-6 text-right">
        {/* شارة صغيرة */}
        <span className="inline-block mb-2 px-3 py-1 text-xs font-medium rounded-full border text-primary border-primary/30 bg-primary/5">
          جميع حلقات بودكاست نمو
        </span>

        {/* عنوان مميز بتدرّج */}
        <h1 className="text-3xl md:text-5xl font-extrabold mb-2 tracking-tight">
          <span className="bg-gradient-to-l from-primary to-emerald-500 bg-clip-text text-transparent">
            الحلقات
          </span>
        </h1>

        {/* وصف مميز وخفيف */}
        <p className="inline-block text-sm md:text-base text-muted-foreground bg-muted/30 rounded-lg px-3 py-2">
          استمع لأحدث الحلقات واختر منصّتك المفضلة
        </p>
      </div>

      {/* Episodes */}
      <EpisodesSection
        title="المكتبة"
        subtitle="استمع لأحدث الحلقات واختر منصتك المفضلة"
      />
    </div>
  );
}
