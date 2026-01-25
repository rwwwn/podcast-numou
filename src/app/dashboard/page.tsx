'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LogOut, User, Mail, LayoutGrid, BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { EpisodesManager } from '@/components/EpisodesManager';
import { TeamMembersManager } from '@/components/TeamMembersManager';
import { ContactSubmissionsManager } from '@/components/ContactSubmissionsManager';

type Tab = 'overview' | 'episodes' | 'team' | 'blog' | 'contact';

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
          <span className="inline bg-clip-text text-transparent bg-gradient-to-tr from-orange-400 to-orange-600 dark:from-orange-300 dark:to-orange-500">
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
        <button
          onClick={() => setActiveTab('blog')}
          className={`px-4 py-3 font-semibold transition-colors ${
            activeTab === 'blog'
              ? 'text-accent border-b-2 border-accent'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          إدارة المدونة
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`px-4 py-3 font-semibold transition-colors ${
            activeTab === 'contact'
              ? 'text-accent border-b-2 border-accent'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          رسائل التواصل
        </button>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* User Profile Card */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Account Info */}
              <Card className="p-8 bg-gradient-to-br from-background to-muted/20">
                <div>
                  <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                    <User className="size-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-6">معلومات الحساب</h2>

                  <div className="space-y-4 mb-6">
                    <div className="p-4 bg-muted/50 rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground mb-2">الاسم</p>
                      <p className="font-semibold flex items-center gap-2">
                        <User className="size-4" />
                        {session.user?.name}
                      </p>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground mb-2">
                        البريد الإلكتروني
                      </p>
                      <p className="font-semibold flex items-center gap-2 break-all">
                        <Mail className="size-4 flex-shrink-0" />
                        {session.user?.email}
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="w-full gap-2"
                  >
                    <LogOut className="size-4" />
                    تسجيل الخروج
                  </Button>
                </div>
              </Card>

              {/* Welcome Card */}
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <div>
                  <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                    <LayoutGrid className="size-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">مرحباً بك!</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    أنت الآن في لوحة التحكم الخاصة بك. يمكنك إدارة الحلقات والفريق والمدونة من هنا. استخدم التبويبات أعلاه للانتقال بين الأقسام المختلفة.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-foreground">الأقسام المتاحة:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>✓ إدارة الحلقات</li>
                      <li>✓ إدارة الفريق</li>
                      <li>✓ إدارة المدونة</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-xl font-bold mb-4">الوصول السريع</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {/* Episodes Card */}
                <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-primary/20 hover:border-primary/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="inline-flex p-3 bg-primary/10 rounded-full">
                      <LayoutGrid className="size-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold">إدارة الحلقات</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
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

                {/* Team Card */}
                <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-accent/20 hover:border-accent/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="inline-flex p-3 bg-accent/10 rounded-full">
                      <User className="size-8 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold">إدارة الفريق</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
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

                {/* Blog Card */}
                <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-sun/20 hover:border-sun/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="inline-flex p-3 bg-sun/20 rounded-full">
                      <BookOpen className="size-8 text-sun-2" />
                    </div>
                    <h3 className="text-lg font-bold">إدارة المدونة</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    أضف وعدّل وحذف منشورات المدونة
                  </p>
                  <Button
                    size="sm"
                    onClick={() => setActiveTab('blog')}
                    className="w-full"
                  >
                    اذهب الآن
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Episodes Manager Tab */}
        {activeTab === 'episodes' && <EpisodesManager />}

        {/* Team Members Manager Tab */}
        {activeTab === 'team' && <TeamMembersManager />}

        {/* Contact Submissions Tab */}
        {activeTab === 'contact' && <ContactSubmissionsManager />}

        {/* Blog Manager Tab */}
        {activeTab === 'blog' && (
          <Card className="p-8">
            <div className="text-center py-12">
              <div className="inline-flex p-4 bg-sun/20 rounded-full mb-4">
                <BookOpen className="size-12 text-sun-2" />
              </div>
              <h2 className="text-3xl font-bold mb-4">إدارة المدونة</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                قريباً سيكون بإمكانك إدارة منشورات المدونة وتعديلها وحذفها من هنا.
              </p>
              <Button disabled size="lg" className="gap-2">
                <BookOpen className="size-5" />
                سيأتي قريباً
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
