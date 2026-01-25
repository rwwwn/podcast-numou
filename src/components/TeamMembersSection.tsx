'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTeamMembers, TEAM_CATEGORIES, TeamCategory } from '@/lib/useTeamMembers';
import { MessageCircle, Linkedin, Github } from 'lucide-react';

export function TeamMembersSection() {
  const { members, loading } = useTeamMembers();
  const [activeCategory, setActiveCategory] = useState<TeamCategory | 'all'>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getMembersByCategory = (category: TeamCategory) => {
    return members.filter((m) => m.category === category);
  };

  const renderSocialIcons = (member: typeof members[0]) => (
    <div className="flex gap-3 justify-center">
      {member.whatsapp && (
        <a
          href={`https://wa.me/${member.whatsapp.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-lg bg-white/10 hover:bg-green-500/20 border border-white/10 hover:border-green-500/40 transition-all duration-300 hover:scale-110 hover:shadow-lg"
          title="WhatsApp"
        >
          <MessageCircle className="size-5 text-green-600 dark:text-green-400" />
        </a>
      )}
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-lg bg-white/10 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/40 transition-all duration-300 hover:scale-110 hover:shadow-lg"
          title="LinkedIn"
        >
          <Linkedin className="size-5 text-blue-600 dark:text-blue-400" />
        </a>
      )}
      {member.github && (
        <a
          href={member.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-lg bg-white/10 hover:bg-slate-500/20 border border-white/10 hover:border-slate-500/40 transition-all duration-300 hover:scale-110 hover:shadow-lg"
          title="GitHub"
        >
          <Github className="size-5 text-slate-700 dark:text-slate-300" />
        </a>
      )}
    </div>
  );

  const renderCard = (member: typeof members[0]) => (
    <div key={member.id} className="group relative">
      <div 
        className="relative h-full backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        {member.image && (
          <div className="mb-5 relative h-48 w-full rounded-xl overflow-hidden border border-white/10">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <h3 className="text-xl font-bold text-foreground mb-1 text-center">
          {member.name}
        </h3>

        <p className="text-sm text-muted-foreground text-center mb-6 font-medium">
          {member.position}
        </p>

        {renderSocialIcons(member)}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Tabs with Glass Frame */}
      <div 
        className="mb-12 p-4 rounded-2xl backdrop-blur-xl border flex flex-wrap gap-3 justify-center"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* View All Button */}
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
            activeCategory === 'all'
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/40 scale-105'
              : 'bg-background/40 hover:bg-background/60 text-foreground border border-border/50 hover:border-border hover:shadow-md'
          }`}
        >
          الكل
        </button>

        {TEAM_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              activeCategory === category
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/40 scale-105'
                : 'bg-background/40 hover:bg-background/60 text-foreground border border-border/50 hover:border-border hover:shadow-md'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Members View */}
      {activeCategory === 'all' ? (
        // View All Categories
        <div className="space-y-16">
          {TEAM_CATEGORIES.map((category) => {
            const categoryMembers = getMembersByCategory(category);
            if (categoryMembers.length === 0) return null;

            return (
              <div key={category}>
                {/* Category Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">{category}</h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
                </div>

                {/* Category Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {categoryMembers.map((member) => renderCard(member))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // View Single Category
        (() => {
          const categoryMembers = getMembersByCategory(activeCategory as TeamCategory);
          
          if (categoryMembers.length === 0) {
            return (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">لا توجد أعضاء في هذه الفئة حالياً</p>
              </div>
            );
          }

          return (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">{activeCategory}</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {categoryMembers.map((member) => renderCard(member))}
              </div>
            </div>
          );
        })()
      )}
    </div>
  );
}
