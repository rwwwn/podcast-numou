import { useState, useEffect } from 'react';

export interface HeroContent {
  heading: string;
  headingHighlight: string;
  subheading: string;
  buttonText: string;
  buttonLink: string;
  infoButtonText: string;
  infoButtonLink: string;
  image: string;
  badgeText: string;
}

const DEFAULT_HERO: HeroContent = {
  heading: 'قصص وتجارب تُلهمنا',
  headingHighlight: 'للنموّ',
  subheading: 'وفق رؤية تنموية طموحة نسلّط الضوء على مجالات متنوّعة في إطار ثقافي يهدف لتعزيز المعرفة والمهارات، وتلهمنا خطوات جديدة.',
  buttonText: 'شغّل آخر حلقة',
  buttonLink: '/episodes',
  infoButtonText: 'المزيد عننا',
  infoButtonLink: '/about',
  image: '/hero.png',
  badgeText: 'بودكاست نمو',
};

export function useHeroContent() {
  const [content, setContent] = useState<HeroContent>(DEFAULT_HERO);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('hero-content');
    if (stored) {
      setContent(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const updateContent = (updated: Partial<HeroContent>) => {
    const newContent = { ...content, ...updated };
    setContent(newContent);
    localStorage.setItem('hero-content', JSON.stringify(newContent));
  };

  const resetToDefault = () => {
    setContent(DEFAULT_HERO);
    localStorage.removeItem('hero-content');
  };

  return {
    content,
    updateContent,
    resetToDefault,
    loading,
  };
}
