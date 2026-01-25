import { useState, useEffect } from 'react';

export interface AboutContent {
  title: string;
  description: string;
  content: string;
  image: string;
}

const DEFAULT_ABOUT: AboutContent = {
  title: 'تعرّف على نمو',
  description: 'بودكاست يجمع بين الإلهام والمعرفة، نستضيف فيه شخصيات ملهمة لمشاركة قصصهم وتجاربهم التي تساعدنا على النمو والتطور',
  content: 'نمو هو بودكاست متخصص في نقل القصص الملهمة والتجارب الحقيقية من شخصيات متميزة في مختلف المجالات. نؤمن أن التعلم من تجارب الآخرين هو أحد أفضل الطرق للنمو الشخصي والمهني.',
  image: '/about-hero.png',
};

export function useAboutContent() {
  const [content, setContent] = useState<AboutContent>(DEFAULT_ABOUT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('about-content');
    if (stored) {
      setContent(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const updateContent = (updated: Partial<AboutContent>) => {
    const newContent = { ...content, ...updated };
    setContent(newContent);
    localStorage.setItem('about-content', JSON.stringify(newContent));
  };

  const resetToDefault = () => {
    setContent(DEFAULT_ABOUT);
    localStorage.removeItem('about-content');
  };

  return {
    content,
    updateContent,
    resetToDefault,
    loading,
  };
}
