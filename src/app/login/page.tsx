// src/app/login/page.tsx
'use client';

import { Suspense, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Lock, Mail, LogIn, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDemoInfo, setShowDemoInfo] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('الرجاء إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('صيغة البريد الإلكتروني غير صحيحة');
      return;
    }
    
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      setLoading(false);
    } else if (result?.ok) {
      // Redirect to dashboard or callback URL on successful login
      setTimeout(() => {
        router.push(callbackUrl);
      }, 500);
    }
  };

  const useDemoCredentials = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
  };

  return (
    <div className="py-12 md:py-20">
      <div className="mx-auto max-w-md">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
            <Lock className="size-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            تسجيل الدخول
          </h1>
          <p className="text-muted-foreground">
            لوحة تحكم نمو الحصرية
          </p>
        </div>

        {/* Login Form */}
        <Card className="p-8 bg-gradient-to-br from-background to-muted/20">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg flex gap-3">
              <AlertCircle className="size-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 dark:text-red-300 text-sm font-semibold">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-3.5 size-5 text-muted-foreground" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pr-10 pl-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  placeholder="your@email.com"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-3.5 size-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pr-10 pl-12 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  placeholder="كلمة المرور"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-3.5 text-muted-foreground hover:text-foreground transition"
                  aria-label={showPassword ? 'إخفاء كلمة المرور' : 'عرض كلمة المرور'}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full gap-2"
              disabled={loading}
            >
              {loading ? (
                <>جاري التحميل...</>
              ) : (
                <>
                  <LogIn className="size-4" />
                  دخول
                </>
              )}
            </Button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 pt-6 border-t border-border">
            <button
              type="button"
              onClick={() => setShowDemoInfo(!showDemoInfo)}
              className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition"
            >
              {showDemoInfo ? 'إخفاء بيانات الاختبار' : 'عرض بيانات الاختبار'}
            </button>

            {showDemoInfo && (
              <div className="mt-4 space-y-3 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-xs font-semibold text-foreground">
                  حسابات اختبار متاحة:
                </p>
                
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => useDemoCredentials('wscrtq@gmail.com', 'Rr123456')}
                    className="w-full text-left p-2 text-sm bg-background hover:bg-muted rounded transition"
                  >
                    <div className="font-mono text-xs text-primary">
                      wscrtq@gmail.com
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">
                      Rr123456
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => useDemoCredentials('admin@podcast-numou.com', 'password123')}
                    className="w-full text-left p-2 text-sm bg-background hover:bg-muted rounded transition"
                  >
                    <div className="font-mono text-xs text-primary">
                      admin@podcast-numou.com
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">
                      password123
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Footer Link */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          العودة إلى{' '}
          <Link href="/" className="text-primary hover:underline font-semibold">
            الصفحة الرئيسية
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">جاري التحميل...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}