'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useHeroContent, HeroContent } from '@/lib/useHeroContent';
import { X } from 'lucide-react';

export function HeroContentManager() {
  const { content, updateContent, resetToDefault } = useHeroContent();
  const [showForm, setShowForm] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof HeroContent, value: string) => {
    updateContent({ [field]: value } as Partial<HeroContent>);
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة الصفحة الرئيسية</h2>
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
            <h3 className="text-lg font-semibold">تحرير محتوى الصفحة الرئيسية</h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Heading */}
            <div>
              <label className="block text-sm font-semibold mb-1">العنوان الرئيسي</label>
              <input
                type="text"
                value={content.heading}
                onChange={(e) => handleChange('heading', e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Heading Highlight */}
            <div>
              <label className="block text-sm font-semibold mb-1">الكلمة المميزة في العنوان</label>
              <input
                type="text"
                value={content.headingHighlight}
                onChange={(e) => handleChange('headingHighlight', e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Subheading */}
            <div>
              <label className="block text-sm font-semibold mb-1">الوصف</label>
              <textarea
                value={content.subheading}
                onChange={(e) => handleChange('subheading', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>

            {/* Button Text */}
            <div>
              <label className="block text-sm font-semibold mb-1">نص الزر الأول</label>
              <input
                type="text"
                value={content.buttonText}
                onChange={(e) => handleChange('buttonText', e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Button Link */}
            <div>
              <label className="block text-sm font-semibold mb-1">رابط الزر الأول</label>
              <input
                type="text"
                value={content.buttonLink}
                onChange={(e) => handleChange('buttonLink', e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="/episodes"
              />
            </div>

            {/* Info Button Text */}
            <div>
              <label className="block text-sm font-semibold mb-1">نص الزر الثاني</label>
              <input
                type="text"
                value={content.infoButtonText}
                onChange={(e) => handleChange('infoButtonText', e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Info Button Link */}
            <div>
              <label className="block text-sm font-semibold mb-1">رابط الزر الثاني</label>
              <input
                type="text"
                value={content.infoButtonLink}
                onChange={(e) => handleChange('infoButtonLink', e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="/about"
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

            {/* Badge Text */}
            <div>
              <label className="block text-sm font-semibold mb-1">نص الشارة</label>
              <input
                type="text"
                value={content.badgeText}
                onChange={(e) => handleChange('badgeText', e.target.value)}
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
            <p className="text-sm text-muted-foreground">العنوان</p>
            <p className="text-2xl font-bold">
              {content.heading} <span className="text-orange-500">{content.headingHighlight}</span>
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">الوصف</p>
            <p className="text-sm">{content.subheading}</p>
          </div>
          <div className="flex gap-2">
            <div className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">
              {content.buttonText}
            </div>
            <div className="px-4 py-2 border border-border rounded-lg text-sm">
              {content.infoButtonText}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
