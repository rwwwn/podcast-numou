'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAboutContent, AboutContent } from '@/lib/useAboutContent';
import { X } from 'lucide-react';

export function AboutContentManager() {
  const { content, updateContent, resetToDefault } = useAboutContent();
  const [showForm, setShowForm] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof AboutContent, value: string) => {
    updateContent({ [field]: value } as Partial<AboutContent>);
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة صفحة "تعرّف على نمو"</h2>
        <div className="flex gap-2">
          {!showForm && (
            <Button onClick={() => setShowForm(true)}>تعديل</Button>
          )}
          <Button
            variant="outline"
            onClick={resetToDefault}
            className="text-red-600"
          >
            إعادة تعيين
          </Button>
        </div>
      </div>

      {saved && (
        <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg text-center">
          <p className="text-green-700 dark:text-green-300 font-semibold">
            ✓ تم حفظ التغييرات بنجاح
          </p>
        </div>
      )}

      {showForm && (
        <Card className="p-6 bg-muted/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">تحرير محتوى "تعرّف على نمو"</h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-1">العنوان</label>
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-1">الوصف القصير</label>
              <textarea
                value={content.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold mb-1">المحتوى الكامل</label>
              <textarea
                value={content.content}
                onChange={(e) => handleChange('content', e.target.value)}
                rows={5}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-semibold mb-1">رابط الصورة</label>
              <input
                type="url"
                value={content.image}
                onChange={(e) => handleChange('image', e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} className="flex-1">
                حفظ التغييرات
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowForm(false)}
                className="flex-1"
              >
                إغلاق
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Preview */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">معاينة</h3>
        <div className="space-y-3">
          <div>
            <p className="text-2xl font-bold">{content.title}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">الوصف:</p>
            <p className="text-sm">{content.description}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">المحتوى:</p>
            <p className="text-sm line-clamp-3">{content.content}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
