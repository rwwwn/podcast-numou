'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2, Mail, Phone, Calendar } from 'lucide-react';
import { useContactSubmissions } from '@/lib/useContactSubmissions';

export function ContactSubmissionsManager() {
  const { submissions, deleteSubmission } = useContactSubmissions();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const subjectLabels: Record<string, string> = {
    partnership: 'شراكة وتعاون',
    guest: 'استضافة ضيف',
    feedback: 'ملاحظات واقتراحات',
    question: 'سؤال عام',
    other: 'أخرى',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">رسائل التواصل</h2>
        <div className="text-sm text-muted-foreground">
          {submissions.length} رسالة
        </div>
      </div>

      {submissions.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">لا توجد رسائل حالياً</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <Card
              key={submission.id}
              className="p-6 hover:shadow-lg transition-shadow"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{submission.name}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                      <a
                        href={`mailto:${submission.email}`}
                        className="flex items-center gap-1 hover:text-accent transition"
                      >
                        <Mail className="size-4" />
                        {submission.email}
                      </a>
                      {submission.phone && (
                        <a
                          href={`tel:${submission.phone}`}
                          className="flex items-center gap-1 hover:text-accent transition"
                        >
                          <Phone className="size-4" />
                          {submission.phone}
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar className="size-3" />
                      {formatDate(submission.submittedAt)}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (
                        confirm(
                          'هل تريد حذف هذه الرسالة؟'
                        )
                      ) {
                        deleteSubmission(submission.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="size-4" />
                    حذف
                  </Button>
                </div>

                {/* Subject */}
                <div>
                  <div className="text-sm font-semibold text-muted-foreground mb-1">
                    الموضوع
                  </div>
                  <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-sm font-medium">
                    {subjectLabels[submission.subject] || submission.subject}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div className="text-sm font-semibold text-muted-foreground mb-2">
                    الرسالة
                  </div>
                  <div className="bg-background/50 border border-border rounded-lg p-4 text-sm whitespace-pre-wrap break-words">
                    {submission.message}
                  </div>
                </div>

                {/* Expand/Collapse */}
                <div className="pt-2">
                  <button
                    onClick={() =>
                      setSelectedId(
                        selectedId === submission.id ? null : submission.id
                      )
                    }
                    className="text-sm text-primary hover:underline"
                  >
                    {selectedId === submission.id ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
