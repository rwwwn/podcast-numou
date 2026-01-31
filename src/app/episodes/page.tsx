'use client';

import EpisodesSection from '@/components/EpisodesSection';

export default function EpisodesPage() {
  return (
    <div className="py-10 md:py-14">
      {/* Header */}
      <div className="mb-6 text-right">
        {/* شارة صغيرة (حيادية) */}
        <span className="inline-block mb-2 px-3 py-1 text-xs font-medium rounded-full border text-muted-foreground border-border bg-muted/30">
          جميع حلقات بودكاست نمو
        </span>

      
       <h1 className="text-3xl md:text-5xl font-extrabold mb-2 tracking-tight">
  <span className="bg-gradient-to-l from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
    الحلقات
  </span>
</h1>

      
      </div>

      {/* Episodes */}
      <EpisodesSection
        title="المكتبة"
        subtitle="استمع لأحدث الحلقات واختر منصتك المفضلة"
      />
    </div>
  );
}
