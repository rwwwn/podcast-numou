'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      {/* زر التبديل */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          aria-label="تبديل المظهر"
        >
          {/* أيقونات متحركة */}
          <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">تبديل المظهر</span>
        </Button>
      </DropdownMenuTrigger>

      {/* القائمة المنسدلة */}
      <DropdownMenuContent
        align="center"     // تمركز تحت الزر
        side="bottom"      // تحت، وليس لليسار
        sideOffset={10}    // مسافة بسيطة تحت الهيدر
        className="z-[60] rtl:text-right"
      >
        <DropdownMenuItem onClick={() => setTheme('light')}>
          فاتح
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          داكن
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          حسب النظام
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
