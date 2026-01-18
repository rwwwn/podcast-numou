import { useState, useEffect } from 'react';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string;
  bio?: string;
}

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

  return {
    members,
    addMember,
    updateMember,
    deleteMember,
    loading,
  };
}
