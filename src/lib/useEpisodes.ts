import { useState, useEffect } from 'react';

export interface Episode {
  id: string;
  title: string;
  summary?: string;
  cover?: string;
  date?: string;     // ISO format
  duration?: string; // "18:32" format
  soundcloud?: string;
  youtube?: string;
  spotify?: string;
  apple?: string;
}

export function useEpisodes() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem('podcast-episodes');
    if (stored) {
      try {
        setEpisodes(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load episodes:', error);
      }
    }
    setLoading(false);
  }, []);

  const saveEpisodes = (eps: Episode[]) => {
    setEpisodes(eps);
    localStorage.setItem('podcast-episodes', JSON.stringify(eps));
  };

  const addEpisode = (episode: Omit<Episode, 'id'>) => {
    const newEpisode: Episode = {
      ...episode,
      id: Date.now().toString(),
    };
    saveEpisodes([newEpisode, ...episodes]);
    return newEpisode;
  };

  const updateEpisode = (id: string, updated: Partial<Episode>) => {
    const newEpisodes = episodes.map((ep) =>
      ep.id === id ? { ...ep, ...updated } : ep
    );
    saveEpisodes(newEpisodes);
  };

  const deleteEpisode = (id: string) => {
    const newEpisodes = episodes.filter((ep) => ep.id !== id);
    saveEpisodes(newEpisodes);
  };

  return {
    episodes,
    addEpisode,
    updateEpisode,
    deleteEpisode,
    loading,
  };
}
