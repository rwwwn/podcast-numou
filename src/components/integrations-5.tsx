// src/components/integrations-5.tsx (أو نفس اسم ملفك)
import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function IntegrationsSection() {
  return (
    <section>
      <div className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          {/* الدوائر */}
          <div className="aspect-16/10 group relative mx-auto flex max-w-[22rem] items-center justify-between sm:max-w-sm">
            {/* الحلقة الخارجية (توهّج عند الهوفر) */}
            <div
              role="presentation"
              className="bg-linear-to-b border-foreground/5 absolute inset-0 z-10 aspect-square animate-spin items-center justify-center rounded-full border-t from-[#35757F]/20 to-transparent to-25% opacity-0 duration-[3.5s] group-hover:opacity-100"
            />
            {/* الحلقة الداخلية */}
            <div
              role="presentation"
              className="bg-linear-to-b border-foreground/5 absolute inset-16 z-10 aspect-square scale-90 animate-spin items-center justify-center rounded-full border-t from-[#E2A674]/20 to-transparent to-25% opacity-0 duration-[3.5s] group-hover:opacity-100"
            />

            {/* الحلقات الثابتة */}
            <div className="bg-linear-to-b from-muted-foreground/15 absolute inset-0 flex aspect-square items-center justify-center rounded-full border-t to-transparent to-25%">
              <IntegrationCard className="-translate-x-1/6 absolute left-0 top-1/4 -translate-y-1/4">
                <img src="/youtube-icon.png" alt="YouTube" width={20} height={20} />
              </IntegrationCard>
              <IntegrationCard className="absolute top-0 -translate-y-1/2">
                <img src="/apple-pod.png" alt="Apple Podcasts" width={20} height={20} />
              </IntegrationCard>
              <IntegrationCard className="translate-x-1/6 absolute right-0 top-1/4 -translate-y-1/4">
                <img src="/Spotify_icon.svg.png" alt="Spotify" width={20} height={20} />
              </IntegrationCard>
            </div>

            <div className="bg-linear-to-b from-muted-foreground/15 absolute inset-16 flex aspect-square scale-90 items-center justify-center rounded-full border-t to-transparent to-25%">
              <IntegrationCard className="absolute top-0 -translate-y-1/2">
                <img src="/soundcloud-logo.png" alt="SoundCloud" width={20} height={20} />
              </IntegrationCard>
              <IntegrationCard className="absolute left-0 top-1/4 -translate-x-1/4 -translate-y-1/4">
                <img src="/apple-pod.png" alt="نمو" width={20} height={20} />
              </IntegrationCard>
              <IntegrationCard className="absolute right-0 top-1/4 -translate-y-1/4 translate-x-1/4">
                <img src="/youtube-icon.png" alt="Favicon" width={20} height={20} />
              </IntegrationCard>
            </div>

            {/* الشعار في الوسط */}
            <div className="absolute inset-x-0 bottom-0 mx-auto my-2 flex w-fit justify-center gap-2">
              <div className="bg-muted relative z-20 rounded-full border p-1">
                <IntegrationCard
                  className="size-16 border-black/20 shadow-xl shadow-black/10 dark:border-white/25 dark:bg-background dark:shadow-white/15"
                  isCenter
                >
                  <Logo className="text-[#35757F]" />
                </IntegrationCard>
              </div>
            </div>
          </div>

          {/* النص + الزر — بدون أي خلفية/بوكس */}
          <div className="relative z-20 mx-auto mt-12 max-w-lg space-y-6 text-center">
            <h2 className="text-balance text-3xl font-semibold md:text-4xl">
              استمع عبر منصّتك المفضّلة
            </h2>
            <p className="text-muted-foreground">
              بودكاست <strong>نمو</strong> متاح على مختلف التطبيقات. ابدأ من هنا واختر المنصّة الأنسب لك.
            </p>

            <Button variant="outline" size="sm" asChild>
              <Link href="/episodes">كل الحلقات</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

const IntegrationCard = ({
  children,
  className,
  isCenter = false,
}: {
  children: React.ReactNode
  className?: string
  isCenter?: boolean
}) => {
  return (
    <div
      className={cn(
        "relative z-30 flex size-12 rounded-full border bg-white shadow-sm shadow-black/5 dark:bg-white/5 dark:backdrop-blur-md",
        className
      )}
    >
      <div className={cn("m-auto size-fit *:size-5", isCenter && "*:size-8")}>{children}</div>
    </div>
  )
}