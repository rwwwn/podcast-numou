// src/components/Footer.tsx
import React from "react";
import { Logo } from "@/components/logo";
import Link from "next/link";

const navLinks = [
  { title: "الرئيسية", href: "/" },
  { title: "الحلقات", href: "/episodes" },
  { title: "الفريق",   href: "/team" },
  { title: "تواصل",    href: "/contact" },
  { title: "المدونة",  href: "/blog" },
];

export default function FooterSection() {
  return (
    <footer className="mt-16 border-t bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Link href="/" aria-label="العودة للصفحة الرئيسية" className="block">
            <Logo className="h-6 w-auto" />
          </Link>
        </div>

        {/* Nav */}
        <nav aria-label="روابط التذييل" className="mb-6">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.title}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Socials */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-muted-foreground">
          <SocialLink href="https://x.com/numoupodcast?s=21" label="X / تويتر" icon="x" />
          <SocialLink href="https://www.tiktok.com/@numoupodcast?lang=en&is_from_webapp=1&sender_device=mobile&sender_web_id=7553236672571491857" label="TikTok" icon="tiktok" />
          <SocialLink href="https://www.instagram.com/numoupodcast?igsh=ejRvMTllajdlaHc0" label="Instagram" icon="instagram" />
          <SocialLink href="https://www.linkedin.com/company/numoucast/" label="LinkedIn" icon="linkedin" />
          <SocialLink href="mailto:Numoupodcast@gmail.com" label="Email" icon="mail" />
         
        </div>

        {/* Bottom line */}
        <div className="text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} بودكاست نمو — جميع الحقوق محفوظة</p>
          {/* تمت إزالة سطر: للاستفسارات صفحة التواصل */}
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: "x" | "linkedin" | "instagram" | "tiktok" | "mail";
}) {
  const icons: Record<string, React.ReactNode> = {
    x: (
      <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z" />
      </svg>
    ),
    linkedin: (
      <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
      </svg>
    ),
    instagram: (
      <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5" />
      </svg>
    ),
    youtube: (
      <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M23.5 6.2s-.2-1.6-.8-2.3c-.8-.8-1.6-.8-2-1C17.8 2.3 12 2.3 12 2.3s-5.8 0-8.7.6c-.4.1-1.2.2-2 1C.7 4.6.5 6.2.5 6.2S.3 8.1.3 10v1.9c0 1.9.2 3.8.2 3.8s.2 1.6.8 2.3c.8.8 1.9.8 2.3.9 1.7.2 7.4.6 7.4.6s5.8 0 8.7-.6c.4-.1 1.2-.2 2-1 .6-.7.8-2.3.8-2.3s.2-1.9.2-3.8V10c0-1.9-.2-3.8-.2-3.8M9.8 14.4V7.6l6.2 3.4z" />
      </svg>
    ),
    tiktok: (
      <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3c-1.88.09-3.24-1.48-3.24-1.48z" />
      </svg>
    ),
    mail: (
      <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 4l-8 5L4 8V6l8 5l8-5z" />
      </svg>
    ),
  };

  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="text-muted-foreground hover:text-accent transition-colors"
      title={label}
    >
      {icons[icon]}
    </Link>
  );
}
