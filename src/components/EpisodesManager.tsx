'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { Episode, useEpisodes } from '@/lib/useEpisodes';

export function EpisodesManager() {
  const { episodes, addEpisode, updateEpisode, deleteEpisode } = useEpisodes();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Episode, 'id'>>({
    title: '',
    description: '',
    duration: 0,
    date: new Date().toISOString().split('T')[0],
    image: '',
    spotifyUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      updateEpisode(editingId, formData);
      setEditingId(null);
    } else {
      addEpisode(formData);
    }

    setFormData({
      title: '',
      description: '',
      duration: 0,
      date: new Date().toISOString().split('T')[0],
      image: '',
      spotifyUrl: '',
    });
    setShowForm(false);
  };

  const handleEdit = (episode: Episode) => {
    setFormData({
      title: episode.title,
      description: episode.description,
      duration: episode.duration,
      date: episode.date,
      image: episode.image || '',
      spotifyUrl: episode.spotifyUrl || '',
    });
    setEditingId(episode.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      duration: 0,
      date: new Date().toISOString().split('T')[0],
      image: '',
      spotifyUrl: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">الحلقات</h2>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="size-4" />
            حلقة جديدة
          </Button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <Card className="p-6 bg-muted/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {editingId ? 'تعديل الحلقة' : 'إضافة حلقة جديدة'}
            </h3>
            <button
              onClick={handleCancel}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="size-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="عنوان الحلقة"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />

            <textarea
              placeholder="وصف الحلقة"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />

            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />

            <input
              type="number"
              placeholder="مدة الحلقة (دقيقة)"
              value={formData.duration}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  duration: parseInt(e.target.value) || 0,
                })
              }
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />

            <input
              type="url"
              placeholder="رابط صورة الحلقة (اختياري)"
              value={formData.image || ''}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />

            <input
              type="url"
              placeholder="رابط Spotify (اختياري)"
              value={formData.spotifyUrl || ''}
              onChange={(e) =>
                setFormData({ ...formData, spotifyUrl: e.target.value })
              }
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                {editingId ? 'تحديث' : 'إضافة'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1"
              >
                إلغاء
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Episodes List */}
      <div className="space-y-4">
        {episodes.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">لا توجد حلقات حالياً</p>
          </Card>
        ) : (
          episodes.map((episode) => (
            <Card key={episode.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{episode.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {episode.description}
                  </p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>📅 {episode.date}</span>
                    <span>⏱️ {episode.duration} دقيقة</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(episode)}
                    className="gap-2"
                  >
                    <Edit2 className="size-4" />
                    تعديل
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteEpisode(episode.id)}
                    className="gap-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="size-4" />
                    حذف
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
