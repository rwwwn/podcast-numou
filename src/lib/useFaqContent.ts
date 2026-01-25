import { useState, useEffect } from 'react';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    id: '1',
    question: 'ما هو بودكاست نمو؟',
    answer: 'بودكاست نمو هو منصة لنقل القصص الملهمة والتجارب الحقيقية من شخصيات متميزة في مختلف المجالات.',
  },
  {
    id: '2',
    question: 'كيف يمكنني الاستماع إلى الحلقات؟',
    answer: 'يمكنك الاستماع إلى الحلقات من خلال تطبيقات البودكاست مثل Spotify أو Apple Podcasts أو SoundCloud.',
  },
  {
    id: '3',
    question: 'هل يمكنني أن أصبح ضيفاً؟',
    answer: 'بالتأكيد! تواصل معنا من خلال صفحة التواصل وأخبرنا عن قصتك.',
  },
];

export function useFaqContent() {
  const [faqs, setFaqs] = useState<FaqItem[]>(DEFAULT_FAQS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('faq-content');
    if (stored) {
      setFaqs(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const saveFaqs = (newFaqs: FaqItem[]) => {
    setFaqs(newFaqs);
    localStorage.setItem('faq-content', JSON.stringify(newFaqs));
  };

  const addFaq = (faq: Omit<FaqItem, 'id'>) => {
    const newFaq: FaqItem = {
      ...faq,
      id: Date.now().toString(),
    };
    saveFaqs([...faqs, newFaq]);
    return newFaq;
  };

  const updateFaq = (id: string, updated: Partial<FaqItem>) => {
    const newFaqs = faqs.map((f) => (f.id === id ? { ...f, ...updated } : f));
    saveFaqs(newFaqs);
  };

  const deleteFaq = (id: string) => {
    const newFaqs = faqs.filter((f) => f.id !== id);
    saveFaqs(newFaqs);
  };

  const resetToDefault = () => {
    setFaqs(DEFAULT_FAQS);
    localStorage.removeItem('faq-content');
  };

  return {
    faqs,
    addFaq,
    updateFaq,
    deleteFaq,
    resetToDefault,
    loading,
  };
}
