import { useState, useEffect } from 'react';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export function useContactSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem('contact-submissions');
    if (stored) {
      setSubmissions(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const saveSubmissions = (subs: ContactSubmission[]) => {
    setSubmissions(subs);
    localStorage.setItem('contact-submissions', JSON.stringify(subs));
  };

  const addSubmission = (submission: Omit<ContactSubmission, 'id' | 'submittedAt'>) => {
    const newSubmission: ContactSubmission = {
      ...submission,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
    };
    saveSubmissions([newSubmission, ...submissions]);
    return newSubmission;
  };

  const deleteSubmission = (id: string) => {
    const newSubmissions = submissions.filter((sub) => sub.id !== id);
    saveSubmissions(newSubmissions);
  };

  return {
    submissions,
    addSubmission,
    deleteSubmission,
    loading,
  };
}
