'use client';

import EpisodesSection from '@/components/EpisodesSection';

export default function EpisodesPage() {
  return (
    <div className="py-12 md:py-20">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">الحلقات</h1>
        <p className="text-lg text-muted-foreground">جميع حلقات بودكاست نمو</p>
      </div>

      {/* Episodes using the same component */}
      <EpisodesSection 
        title="جميع الحلقات"
        subtitle="استمع إلى جميع حلقاتنا الممتازة"
      />
    </div>
  );
}
