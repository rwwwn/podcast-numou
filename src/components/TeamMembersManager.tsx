'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { TeamMember, useTeamMembers, TEAM_CATEGORIES, TeamCategory } from '@/lib/useTeamMembers';

export function TeamMembersManager() {
  const { members, addMember, updateMember, deleteMember } = useTeamMembers();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<TeamMember, 'id'>>({
    name: '',
    position: '',
    category: 'المؤسسيين',
    image: '',
    whatsapp: '',
    linkedin: '',
    github: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.position.trim()) {
      alert('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    if (editingId) {
      updateMember(editingId, formData);
      setEditingId(null);
    } else {
      addMember(formData);
    }

    setFormData({
      name: '',
      position: '',
      category: 'المؤسسيين',
      image: '',
      whatsapp: '',
      linkedin: '',
      github: '',
    });
    setShowForm(false);
  };

  const handleEdit = (member: TeamMember) => {
    setFormData({
      name: member.name,
      position: member.position,
      category: member.category,
      image: member.image || '',
      whatsapp: member.whatsapp || '',
      linkedin: member.linkedin || '',
      github: member.github || '',
    });
    setEditingId(member.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      position: '',
      category: 'المؤسسيين',
      image: '',
      whatsapp: '',
      linkedin: '',
      github: '',
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
            {/* Name */}
            <input
              type="text"
              placeholder="الاسم *"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />

            {/* Position */}
            <input
              type="text"
              placeholder="الموضع الوظيفي *"
              value={formData.position}
              onChange={(e) =>
                setFormData({ ...formData, position: e.target.value })
              }
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />

            {/* Category */}
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value as TeamCategory })
              }
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {TEAM_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Image URL */}
            <input
              type="url"
              placeholder="رابط الصورة"
              value={formData.image || ''}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />

            {/* WhatsApp */}
            <input
              type="tel"
              placeholder="رقم الهاتف (WhatsApp) - مثال: +966501234567"
              value={formData.whatsapp || ''}
              onChange={(e) =>
                setFormData({ ...formData, whatsapp: e.target.value })
              }
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />

            {/* LinkedIn */}
            <input
              type="url"
              placeholder="رابط LinkedIn - مثال: https://linkedin.com/in/username"
              value={formData.linkedin || ''}
              onChange={(e) =>
                setFormData({ ...formData, linkedin: e.target.value })
              }
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />

            {/* GitHub */}
            <input
              type="url"
              placeholder="رابط GitHub - مثال: https://github.com/username"
              value={formData.github || ''}
              onChange={(e) =>
                setFormData({ ...formData, github: e.target.value })
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
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-sm text-accent mb-1 font-semibold">
                    {member.position}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2 bg-muted px-2 py-1 rounded inline-block">
                    {member.category}
                  </p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    {member.whatsapp && <p>📱 {member.whatsapp}</p>}
                    {member.linkedin && <p>🔗 LinkedIn: {member.linkedin}</p>}
                    {member.github && <p>⚙️ GitHub: {member.github}</p>}
                  </div>
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
                    onClick={() => {
                      if (confirm('هل تريد حذف هذا العضو؟')) {
                        deleteMember(member.id);
                      }
                    }}
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
