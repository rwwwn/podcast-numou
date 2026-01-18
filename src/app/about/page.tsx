import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Target, Users, Lightbulb, Award } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          تعرّف على{" "}
          <span className="inline bg-clip-text text-transparent bg-gradient-to-tr from-primary to-teal-4 dark:from-sun dark:to-rose-3">
            نمو
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          بودكاست يجمع بين الإلهام والمعرفة، نستضيف فيه شخصيات ملهمة لمشاركة
          قصصهم وتجاربهم التي تساعدنا على النمو والتطور
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <Card className="p-8 bg-gradient-to-br from-primary/5 to-teal-4/5 dark:from-primary/10 dark:to-teal/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Target className="size-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">رؤيتنا</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            نطمح لأن نكون المنصة الأولى للمحتوى الصوتي الملهم في المملكة،
            نساهم في نشر الوعي وتبادل الخبرات بين الأجيال من خلال قصص حقيقية
            وتجارب ملهمة تحفّز على التطوير والنمو المستمر.
          </p>
        </Card>

        <Card className="p-8 bg-gradient-to-br from-accent/10 to-sun-3/10 dark:from-accent/10 dark:to-sun/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-accent/10 rounded-full">
              <Lightbulb className="size-6 text-accent" />
            </div>
            <h2 className="text-2xl font-bold">رسالتنا</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            نسعى لتقديم محتوى ثري يجمع بين المعرفة والإلهام، من خلال استضافة
            شخصيات متميزة ومشاركة تجاربهم في مختلف المجالات، لنساهم في بناء
            مجتمع واعٍ ومتطور يسعى دائماً نحو التميز والنمو.
          </p>
        </Card>
      </div>

      {/* What Makes Us Different */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          ما الذي يميّز نمو؟
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow flex flex-col items-center justify-center min-h-48">
            <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
              <Users className="size-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">ضيوف متميزون</h3>
            <p className="text-muted-foreground">
              نستضيف شخصيات ملهمة من مختلف المجالات لمشاركة خبراتهم وتجاربهم
              الحقيقية
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow flex flex-col items-center justify-center min-h-48">
            <div className="inline-flex p-4 bg-accent/10 rounded-full mb-4">
              <Lightbulb className="size-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-3">محتوى متنوع</h3>
            <p className="text-muted-foreground">
              نغطي مواضيع متعددة من ريادة الأعمال، التطوير الذاتي، التقنية،
              والإبداع
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow flex flex-col items-center justify-center min-h-48">
            <div className="inline-flex p-4 bg-sun/20 rounded-full mb-4">
              <Award className="size-8 text-sun-2" />
            </div>
            <h3 className="text-xl font-bold mb-3">جودة عالية</h3>
            <p className="text-muted-foreground">
              نحرص على تقديم محتوى احترافي بجودة إنتاج عالية وأسلوب سلس وممتع
            </p>
          </Card>
        </div>
      </div>

      {/* Story Section */}
      <Card className="p-8 md:p-12 mb-16 bg-gradient-to-br from-background to-muted/20">
        <h2 className="text-3xl font-bold mb-6 text-center">قصتنا</h2>
        <div className="prose prose-lg dark:prose-invert mx-auto text-muted-foreground space-y-4">
          <p>
            انطلق بودكاست نمو من فكرة بسيطة: كيف يمكننا أن نتعلم من تجارب الآخرين
            ونستفيد من خبراتهم؟ بدأنا رحلتنا بهدف واضح، وهو خلق منصة تجمع بين
            الإلهام والمعرفة العملية.
          </p>
          <p>
            من خلال حلقاتنا، نسعى لتقديم محتوى يلامس واقع المستمعين ويساعدهم على
            اكتشاف طرق جديدة للتطور والنمو في حياتهم المهنية والشخصية. نؤمن بأن
            كل قصة نجاح تحمل دروساً قيمة يمكن أن تُحدث فرقاً في حياة الآخرين.
          </p>
          <p>
            اليوم، نفخر بمجتمع متنامٍ من المستمعين الذين يشاركوننا شغف التعلم
            والتطوير المستمر، ونواصل رحلتنا في تقديم محتوى ملهم يضيف قيمة
            حقيقية.
          </p>
        </div>
      </Card>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">ابدأ رحلتك مع نمو</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          استمع إلى حلقاتنا واكتشف قصص ملهمة ستساعدك على النمو والتطور
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/episodes">تصفح الحلقات</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">تواصل معنا</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
