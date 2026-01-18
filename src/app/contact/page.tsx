'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      // Reset submitted state after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <div className="py-12 md:py-20">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          تواصل معنا{' '}
          <span className="inline bg-clip-text text-transparent bg-gradient-to-tr from-primary to-teal-4 dark:from-sun dark:to-rose-3">
            الآن
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          لديك سؤال أو اقتراح؟ نحن هنا للاستماع إليك. تواصل معنا من خلال النموذج أدناه أو عبر معلومات التواصل المباشرة
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {/* Contact Info Cards */}
        <Card className="p-6 text-center hover:shadow-lg transition-shadow flex flex-col items-center justify-center min-h-48">
          <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
            <Mail className="size-6 text-primary" />
          </div>
          <h3 className="font-bold mb-2">البريد الإلكتروني</h3>
          <p className="text-muted-foreground text-sm">
            <a href="mailto:Numoupodcast@gmail.com" className="hover:text-accent transition">
              Numoupodcast@gmail.com
            </a>
          </p>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-shadow flex flex-col items-center justify-center min-h-48">
          <div className="inline-flex p-4 bg-accent/10 rounded-full mb-4">
            <Phone className="size-6 text-accent" />
          </div>
          <h3 className="font-bold mb-2">الهاتف</h3>
          <p className="text-muted-foreground text-sm">
            <a href="tel:+966501234567" className="hover:text-accent transition">
              +966 50 123 4567
            </a>
          </p>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-shadow flex flex-col items-center justify-center min-h-48">
          <div className="inline-flex p-4 bg-sun/20 rounded-full mb-4">
            <MapPin className="size-6 text-sun-2" />
          </div>
          <h3 className="font-bold mb-2">المقر</h3>
          <p className="text-muted-foreground text-sm">
            الرياض، المملكة العربية السعودية
          </p>
        </Card>
      </div>

      {/* Contact Form */}
      <Card className="p-8 md:p-12 max-w-2xl mx-auto bg-gradient-to-br from-background to-muted/20">
        {submitted && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg text-center">
            <p className="text-green-700 dark:text-green-300 font-semibold">
              شكراً لك! تم استقبال رسالتك بنجاح. سنتواصل معك قريباً.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              الاسم الكامل
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              placeholder="أدخل اسمك الكامل"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              placeholder="your@email.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold mb-2">
              رقم الهاتف (اختياري)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              placeholder="+966 50 XXX XXXX"
            />
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold mb-2">
              الموضوع
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            >
              <option value="">اختر الموضوع</option>
              <option value="partnership">شراكة وتعاون</option>
              <option value="guest">استضافة ضيف</option>
              <option value="feedback">ملاحظات واقتراحات</option>
              <option value="question">سؤال عام</option>
              <option value="other">أخرى</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold mb-2">
              الرسالة
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none"
              placeholder="أخبرنا برسالتك..."
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full gap-2"
            disabled={loading}
          >
            {loading ? (
              <>جاري الإرسال...</>
            ) : (
              <>
                <Send className="size-4" />
                إرسال الرسالة
              </>
            )}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          نحتزم خصوصيتك. لن نشارك بياناتك مع أي طرف ثالث.
        </p>
      </Card>

      {/* Social Section */}
      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold mb-6">تابعنا على وسائل التواصل</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://x.com/numoupodcast?s=21"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition"
          >
            X
          </a>
          <a
            href="https://www.tiktok.com/@numoupodcast?lang=en&is_from_webapp=1&sender_device=mobile&sender_web_id=7553236672571491857"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-accent/10 hover:bg-accent/20 rounded-lg transition"
          >
            TikTok
          </a>
          <a
            href="https://www.instagram.com/numoupodcast?igsh=ejRvMTllajdlaHc0"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-sun/10 hover:bg-sun/20 rounded-lg transition"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/company/numoucast/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-rose/10 hover:bg-rose/20 rounded-lg transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}