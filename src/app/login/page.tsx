// src/app/login/page.tsx
// src/app/login/page.tsx
import { Lock } from "lucide-react";

export default function LoginSoon() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* soft animated blobs */}
      
     

      <div className="mx-auto max-w-xl rounded-2xl border bg-background/70 backdrop-blur p-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Lock className="size-8" />
        </div>
        <h1 className="text-3xl font-bold mb-2">تسجيل الدخول</h1>
        <p className="text-muted-foreground mb-6">نعمل حاليًا على هذه الميزة. شكرًا لصبرك 💚</p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-primary"></span>
          <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:150ms]"></span>
          <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:300ms]"></span>
        </div>
      </div>
    </section>
  );
}