'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LogOut, User, Mail, LayoutGrid } from 'lucide-react';
import { useEffect, useState } from 'react';
import { EpisodesManager } from '@/components/EpisodesManager';
import { TeamMembersManager } from '@/components/TeamMembersManager';

type Tab = 'overview' | 'episodes' | 'team';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleSignOut = async () => {
    await signOut({ redirect: true, redirectTo: '/' });
  };

  if (status === 'loading') {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">جاري التحميل...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="py-12 md:py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          مرحباً{' '}
          <span className="inline bg-clip-text text-transparent bg-gradient-to-tr from-primary to-teal-4 dark:from-sun dark:to-rose-3">
            {session.user?.name}
          </span>
        </h1>
        <p className="text-lg text-muted-foreground">
          لوحة تحكم مسؤول بودكاست نمو
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-8 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-3 font-semibold transition-colors ${
            activeTab === 'overview'
              ? 'text-accent border-b-2 border-accent'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          نظرة عامة
        </button>
        <button
          onClick={() => setActiveTab('episodes')}
          className={`px-4 py-3 font-semibold transition-colors ${
            activeTab === 'episodes'
              ? 'text-accent border-b-2 border-accent'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          إدارة الحلقات
        </button>
        <button
          onClick={() => setActiveTab('team')}
          className={`px-4 py-3 font-semibold transition-colors ${
            activeTab === 'team'
              ? 'text-accent border-b-2 border-accent'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          إدارة الفريق
        </button>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* User Profile Card */}
            <Card className="p-8 bg-gradient-to-br from-background to-muted/20 mb-8">
              <div className="text-center">
                <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                  <User className="size-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">معلومات الحساب</h2>

                <div className="space-y-4 text-left max-w-md mx-auto mb-6">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">الاسم</p>
                    <p className="font-semibold flex items-center gap-2">
                      <User className="size-4" />
                      {session.user?.name}
                    </p>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      البريد الإلكتروني
                    </p>
                    <p className="font-semibold flex items-center gap-2">
                      <Mail className="size-4" />
                      {session.user?.email}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="gap-2"
                >
                  <LogOut className="size-4" />
                  تسجيل الخروج
                </Button>
              </div>
            </Card>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                  <LayoutGrid className="size-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">إدارة الحلقات</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  أضف وعدّل وحذف الحلقات
                </p>
                <Button
                  size="sm"
                  onClick={() => setActiveTab('episodes')}
                  className="w-full"
                >
                  اذهب الآن
                </Button>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex p-4 bg-accent/10 rounded-full mb-4">
                  <User className="size-6 text-accent" />
                </div>
                <h3 className="font-bold mb-2">إدارة الفريق</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  أضف وعدّل وحذف أعضاء الفريق
                </p>
                <Button
                  size="sm"
                  onClick={() => setActiveTab('team')}
                  className="w-full"
                >
                  اذهب الآن
                </Button>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex p-4 bg-sun/20 rounded-full mb-4">
                  <Mail className="size-6 text-sun-2" />
                </div>
                <h3 className="font-bold mb-2">الإحصائيات</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  عرض إحصائيات البودكاست
                </p>
                <Button size="sm" disabled className="w-full">
                  قريباً
                </Button>
              </Card>
            </div>
          </div>
        )}

        {/* Episodes Manager Tab */}
        {activeTab === 'episodes' && <EpisodesManager />}

        {/* Team Members Manager Tab */}
        {activeTab === 'team' && <TeamMembersManager />}
      </div>
    </div>
  );
}
