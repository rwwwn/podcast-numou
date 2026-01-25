'use client';

import { TeamMembersSection } from '@/components/TeamMembersSection';

export default function TeamPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">تعرف على فريق نمو</h1>
        <p className="text-lg text-muted-foreground">فريق متخصص مكرس لتطوير وتطورك المهني</p>
      </div>
      <TeamMembersSection />
    </div>
  );
}