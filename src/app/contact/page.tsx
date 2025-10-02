'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, User, MessageSquare, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "الاسم مطلوب";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "الاسم يجب أن يكون حرفين على الأقل";
    }

    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "الموضوع مطلوب";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "الموضوع يجب أن يكون 3 أحرف على الأقل";
    }

    if (!formData.message.trim()) {
      newErrors.message = "الرسالة مطلوبة";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "الرسالة يجب أن تكون 10 أحرف على الأقل";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitSuccess(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">تواصل معنا</h1>
          <p className="text-muted-foreground text-base md:text-lg">
            نسعد بتواصلك معنا. يمكنك إرسال استفساراتك، اقتراحاتك، أو أي ملاحظات لديك.
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div
            className="mb-6 rounded-lg border border-teal bg-teal/10 p-4 flex items-center gap-3"
            role="alert"
          >
            <CheckCircle2 className="size-5 text-teal shrink-0" />
            <p className="text-sm font-medium">
              تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.
            </p>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border bg-background/50 backdrop-blur-sm p-6 md:p-8 space-y-6"
          noValidate
        >
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="size-4" />
              الاسم الكامل
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="أدخل اسمك الكامل"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-destructive" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="size-4" />
              البريد الإلكتروني
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@domain.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Subject Field */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="flex items-center gap-2">
              <MessageSquare className="size-4" />
              الموضوع
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="موضوع الرسالة"
              aria-required="true"
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              disabled={isSubmitting}
            />
            {errors.subject && (
              <p id="subject-error" className="text-sm text-destructive" role="alert">
                {errors.subject}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center gap-2">
              <MessageSquare className="size-4" />
              الرسالة
              <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="اكتب رسالتك هنا..."
              rows={6}
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              disabled={isSubmitting}
            />
            {errors.message && (
              <p id="message-error" className="text-sm text-destructive" role="alert">
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              size="lg"
              className="w-full gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  إرسال الرسالة
                </>
              )}
            </Button>
          </div>

          {/* Required Fields Note */}
          <p className="text-xs text-muted-foreground text-center pt-2">
            <span className="text-destructive">*</span> جميع الحقول مطلوبة
          </p>
        </form>

        {/* Contact Info */}
        <div className="mt-8 md:mt-12 text-center text-sm text-muted-foreground">
          <p className="mb-2">أو يمكنك التواصل معنا مباشرة عبر البريد الإلكتروني:</p>
          <a
            href="mailto:Numoupodcast@gmail.com"
            className="text-primary hover:underline font-medium"
          >
            Numoupodcast@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}