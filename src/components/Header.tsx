'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';
import { ModeToggle } from './ModeToggle';

const menuItems = [
  { name: 'الرئيسية', href: '/' },
  { name: 'الحلقات', href: '/episodes' },
  { name: 'الفريق',   href: '/team' },
  { name: 'تواصل',    href: '/contact' },
];

export const HeroHeader = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className="relative z-50">
      <nav
        data-state={menuOpen ? 'active' : undefined}
        className="fixed top-0 inset-x-0 z-50 bg-background/50 border-b backdrop-blur-3xl"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* top bar */}
          <div className="flex items-center justify-between py-3 md:py-4">
            
            {/* RIGHT side: logo + links */}
            <div className="flex items-center gap-8">
              {/* Logo */}
              <Link href="/" aria-label="home" className="flex items-center">
                <Logo />
              </Link>

              {/* Nav links */}
              <ul className="hidden lg:flex items-center gap-6 text-sm">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="transition text-muted-foreground hover:text-accent-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* LEFT side: نشرة نمو + login + dark mode */}
            <div className="hidden lg:flex items-center gap-3">
              <Button asChild variant="outline" size="sm">
                <Link href="/login">تسجيل دخول</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/blog">نشرة نمو</Link>
              </Button>
              <ModeToggle />
            </div>

            {/* mobile toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              className="lg:hidden p-2 -m-2"
            >
              {menuOpen ? <X className="size-6"/>  : <Menu className="size-6" />} 
            </button>
          </div>
        </div>

        {/* mobile panel */}
        {menuOpen && (
          <div className="lg:hidden border-t bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 space-y-4">
              <ul className="space-y-4 text-base">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-1 text-foreground/90 hover:text-accent-foreground transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3">
                <Button asChild variant="outline" size="sm">
                  <Link href="/login" onClick={() => setMenuOpen(false)}>تسجيل دخول</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/blog" onClick={() => setMenuOpen(false)}>نشرة نمو</Link>
                </Button>
                <ModeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* spacer */}
      <div className="h-16 md:h-[4.5rem]" />
    </header>
  );
};