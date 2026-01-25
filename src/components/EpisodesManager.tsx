'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { useEpisodes, Episode } from '@/lib/useEpisodes';
import EpisodeCard from '@/components/EpisodeCard';

export function EpisodesManager() {
  const { episodes, addEpisode, updateEpisode, deleteEpisode } = useEpisodes();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Episode, 'id'>>({
    title: '',
    summary: '',
    cover: '',
    date: new Date().toISOString().split('T')[0],
    duration: '',
    soundcloud: '',
    youtube: '',
    spotify: '',
    apple: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.summary?.trim()) {
      alert('الرجاء ملء العنوان والملخص');
      return;
    }

    if (editingId) {
      updateEpisode(editingId, formData);
      setEditingId(null);
    } else {
      addEpisode(formData);
    }

    setFormData({
      title: '',
      summary: '',
      cover: '',
      date: new Date().toISOString().split('T')[0],
      duration: '',
      soundcloud: '',
      youtube: '',
      spotify: '',
      apple: '',
    });
    setShowForm(false);
  };

  const handleEdit = (episode: Episode) => {
    setFormData({
      title: episode.title,
      summary: episode.summary || '',
      cover: episode.cover || '',
      date: episode.date || new Date().toISOString().split('T')[0],
      duration: episode.duration || '',
      soundcloud: episode.soundcloud || '',
      youtube: episode.youtube || '',
      spotify: episode.spotify || '',
      apple: episode.apple || '',
    });
    setEditingId(episode.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: '',
      summary: '',
      cover: '',
      date: new Date().toISOString().split('T')[0],
      duration: '',
      soundcloud: '',
      youtube: '',
      spotify: '',
      apple: '',
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-1">إدارة الحلقات</h2>
          <p className="text-muted-foreground">أضف وعدّل وحذف الحلقات</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} size="lg" className="gap-2">
            <Plus className="size-5" />
            حلقة جديدة
          </Button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <Card className="p-6 bg-gradient-to-br from-background to-muted/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">
              {editingId ? 'تعديل الحلقة' : 'إضافة حلقة جديدة'}
            </h3>
            <button
              onClick={handleCancel}
              className="text-muted-foreground hover:text-foreground transition"
            >
              <X className="size-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                عنوان الحلقة *
              </label>
              <input
                type="text"
                placeholder="مثال: الحياة المهنية.. لعبة أم خطة؟"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              />
            </div>

            {/* Summary */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                الملخص *
              </label>
              <textarea
                placeholder="ملخص قصير عن الحلقة..."
                value={formData.summary || ''}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
                rows={3}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none"
              />
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                صورة الغلاف (رابط URL)
              </label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.cover || ''}
                onChange={(e) =>
                  setFormData({ ...formData, cover: e.target.value })
                }
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              />
            </div>

            {/* Date and Duration */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  تاريخ الحلقة
                </label>
                <input
                  type="date"
                  value={formData.date || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  المدة (مثال: 18:32)
                </label>
                <input
                  type="text"
                  placeholder="MM:SS"
                  value={formData.duration || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>
            </div>

            {/* Platform Links */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">روابط المنصات</h4>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-1">
                  SoundCloud
                </label>
                <input
                  type="url"
                  placeholder="https://soundcloud.com/..."
                  value={formData.soundcloud || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, soundcloud: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-1">
                  Spotify
                </label>
                <input
                  type="url"
                  placeholder="https://open.spotify.com/episode/..."
                  value={formData.spotify || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, spotify: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-1">
                  Apple Podcasts
                </label>
                <input
                  type="url"
                  placeholder="https://podcasts.apple.com/..."
                  value={formData.apple || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, apple: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-1">
                  YouTube
                </label>
                <input
                  type="url"
                  placeholder="https://youtu.be/..."
                  value={formData.youtube || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, youtube: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" size="lg" className="flex-1">
                {editingId ? 'تحديث الحلقة' : 'إضافة الحلقة'}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleCancel}
                className="flex-1"
              >
                إلغاء
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Episodes Display */}
      {episodes.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-lg text-muted-foreground">لا توجد حلقات حالياً</p>
          <Button
            onClick={() => setShowForm(true)}
            className="mt-4 gap-2"
          >
            <Plus className="size-4" />
            أضف الحلقة الأولى
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">
              الحلقات ({episodes.length})
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {episodes.map((episode) => (
                <div key={episode.id} className="relative group">
                  <EpisodeCard episode={episode} />
                  {/* Edit/Delete Buttons Overlay */}
                  <div className="absolute top-2 right-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(episode)}
                      className="flex-1 gap-1 bg-background/80 backdrop-blur"
                    >
                      <Edit2 className="size-4" />
                      تعديل
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (confirm('هل أنت متأكد من حذف هذه الحلقة؟')) {
                          deleteEpisode(episode.id);
                        }
                      }}
                      className="flex-1 gap-1 bg-background/80 backdrop-blur text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50"
                    >
                      <Trash2 className="size-4" />
                      حذف
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
