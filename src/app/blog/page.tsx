// src/app/blog/page.tsx
import Link from "next/link";

export default function BlogIndex() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold">نشرة نمو</h1>
        <p className="text-muted-foreground mt-3">
          مساحة كتابة لأعضاء الفريق — مقالات، تجارب، وأفكار طلابية.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border p-6 text-start">
            <div className="h-32 rounded-lg bg-rose/20 mb-4" />
            <h3 className="font-semibold">أول مقال تجريبي</h3>
            <p className="text-sm text-muted-foreground">نص تمهيدي… قيد الإعداد.</p>
          </article>
          <article className="rounded-xl border p-6 text-start">
            <div className="h-32 rounded-lg bg-sun/30 mb-4" />
            <h3 className="font-semibold">قريبًا: قصص من النادي</h3>
            <p className="text-sm text-muted-foreground">سننشر هنا بشكل دوري ✨</p>
          </article>
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          هل تود/ين الكتابة؟ <Link href="/contact" className="text-primary underline-offset-4 hover:underline">راسل فريق نمو</Link>
        </p>
      </div>
    </section>
  );
}