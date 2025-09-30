import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lightbulb, Target, UsersRound, BadgeCheck } from "lucide-react";

export default function AboutNumou() {
  return (
    <section
      id="about-numou"
      className="relative isolate py-16 md:py-24"
      aria-labelledby="about-heading"
    >
      {/* لمعان خفيف في الخلفية */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sun/50 blur-3xl" />
        <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-teal/40 blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        {/* الصورة */}
        <div className="order-last lg:order-first lg:col-span-5">
          <div
            className="
              relative overflow-hidden rounded-3xl border
              bg-white/30 shadow-lg backdrop-blur-xl
              border-white/50 dark:bg-white/5 dark:border-white/10
              supports-[backdrop-filter]:bg-white/20
            "
          >
            <Image
              src="/about-cover.jpg" // ضعي الصورة هنا (public/images/about-cover.jpg)
              alt="بودكاست نمو"
              width={900}
              height={700}
              className="h-full w-full object-cover"
              priority
            />
            {/* شارة التأسيس */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-2xl bg-background/80 px-4 py-2 text-xs shadow-sm ring-1 ring-border">
              <span className="text-muted-foreground">تأسس عام</span>
              <span className="font-bold">2023</span>
            </div>
          </div>
        </div>

        {/* النص */}
        <div className="lg:col-span-7">
          <h2 id="about-heading" className="text-3xl font-extrabold md:text-4xl">
            تعرّف على <span className="word-gradient">نمو</span>
          </h2>

          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            وفق رؤية تنموية طموحة يسعى بودكاست <strong>“نمو”</strong> لتسليط الضوء على مختلف المجالات
            في أطرٍ ثقافية تسعى لتحقيق النموّ المعرفي. نبحث عن ضيوف من خلفيات وتجارب متنوّعة،
            ليسوا فقط خبراء في مجالاتهم، بل أصحاب تأثير يصل للجمهور ويضيف قيمة حقيقية للنقاش.
          </p>

          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            في بودكاست <strong>“نمو”</strong> نوفّر محتوى يساعد المستمعين على تعزيز مهاراتهم الإدارية،
            وتحسين أدائهم في بيئة العمل، وتحقيق التطوّر المهني. كل حلقة هدفها تضيف لك خطوة جديدة
            في رحلة <span className="word-gradient">النموّ</span>.
          </p>

          {/* نقاط سريعة */}
          <ul className="mt-6 space-y-3 text-sm leading-7">
            <li className="flex items-start gap-2">
              <Target className="mt-0.5 size-4 text-primary" />
              <span>
                <strong>الهدف:</strong> مساحة عربية أصيلة تعزّز الوعي والمهارات حول رؤية 2030 وريادة الأعمال وتحسين الذات.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <UsersRound className="mt-0.5 size-4 text-primary" />
              <span>
                <strong>تنوع الضيوف:</strong> أصوات متعدّدة من مراحل مختلفة—تجارب حقيقية تعطيك زوايا جديدة.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Lightbulb className="mt-0.5 size-4 text-primary" />
              <span>
                <strong>قيمة عملية:</strong> نصائح، مسارات، وأفكار قابلة للتطبيق تساعدك في حياتك المهنية والشخصية.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <BadgeCheck className="mt-0.5 size-4 text-primary" />
              <span>
                <strong>مبادرة طلابية:</strong> انطلقت من جامعة الاميرة نورة بروح التطوّع والتعلّم المستمر.
              </span>
            </li>
          </ul>

          {/* أزرار */}
          <div className="mt-7 flex flex-wrap items-center justify-start gap-3">
            <Button asChild size="lg">
              <Link href="/episodes">استمع للحلقات</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">المزيد عن نمو</Link>
            </Button>
          </div>

         
        
         
        </div>
      </div>
    </section>
  );
}