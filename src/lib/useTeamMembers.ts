import { useState, useEffect } from 'react';

export type TeamCategory = 'المؤسسيين' | 'لجنة الانتاج والتوزيع' | 'لجنة الشؤون الداخلية' | 'لجنة الشؤون الخارجية' | 'الاعلام';

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  category: TeamCategory;
  image?: string;
  whatsapp?: string;
  linkedin?: string;
  github?: string;
}

export const TEAM_CATEGORIES: TeamCategory[] = [
  'المؤسسيين',
  'لجنة الانتاج والتوزيع',
  'لجنة الشؤون الداخلية',
  'لجنة الشؤون الخارجية',
  'الاعلام'
];

export function useTeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem('podcast-team');
    if (stored) {
      setMembers(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const saveMembers = (mems: TeamMember[]) => {
    setMembers(mems);
    localStorage.setItem('podcast-team', JSON.stringify(mems));
  };

  const addMember = (member: Omit<TeamMember, 'id'>) => {
    const newMember: TeamMember = {
      ...member,
      id: Date.now().toString(),
    };
    saveMembers([newMember, ...members]);
    return newMember;
  };

  const updateMember = (id: string, updated: Partial<TeamMember>) => {
    const newMembers = members.map((mem) =>
      mem.id === id ? { ...mem, ...updated } : mem
    );
    saveMembers(newMembers);
  };

  const deleteMember = (id: string) => {
    const newMembers = members.filter((mem) => mem.id !== id);
    saveMembers(newMembers);
  };

  const getMembersByCategory = (category: TeamCategory) => {
    return members.filter((mem) => mem.category === category);
  };

  return {
    members,
    addMember,
    updateMember,
    deleteMember,
    loading,
    getMembersByCategory,
  };
}
