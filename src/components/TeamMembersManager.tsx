'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { TeamMember, useTeamMembers } from '@/lib/useTeamMembers';

export function TeamMembersManager() {
  const { members, addMember, updateMember, deleteMember } = useTeamMembers();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<TeamMember, 'id'>>({
    name: '',
    role: '',
    image: '',
    bio: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      updateMember(editingId, formData);
      setEditingId(null);
    } else {
      addMember(formData);
    }

    setFormData({
      name: '',
      role: '',
      image: '',
      bio: '',
    });
    setShowForm(false);
  };

  const handleEdit = (member: TeamMember) => {
    setFormData({
      name: member.name,
      role: member.role,
      image: member.image || '',
      bio: member.bio || '',
    });
    setEditingId(member.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      role: '',
      image: '',
      bio: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">أعضاء الفريق</h2>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="size-4" />
            عضو جديد
          </Button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <Card className="p-6 bg-muted/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {editingId ? 'تعديل العضو' : 'إضافة عضو جديد'}
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
              placeholder="الاسم"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />

            <input
              type="text"
              placeholder="الوظيفة"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />

            <textarea
              placeholder="النبذة الشخصية"
              value={formData.bio || ''}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />

            <input
              type="url"
              placeholder="رابط الصورة"
              value={formData.image || ''}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
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

      {/* Members List */}
      <div className="space-y-4">
        {members.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">لا يوجد أعضاء فريق حالياً</p>
          </Card>
        ) : (
          members.map((member) => (
            <Card key={member.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-sm text-accent mb-2 font-semibold">
                    {member.role}
                  </p>
                  {member.bio && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {member.bio}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(member)}
                    className="gap-2"
                  >
                    <Edit2 className="size-4" />
                    تعديل
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteMember(member.id)}
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
