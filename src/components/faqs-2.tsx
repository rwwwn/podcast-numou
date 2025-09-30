'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'

export default function FAQsTwo() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'كيف أقدر أشارك أو أنضم كعضو في نادي نمو؟',
            answer: 'التسجيل عادة يكون مفتوح في بداية كل فصل دراسي من خلال استمارات النادي. تابع إعلانات الجامعة أو منصاتنا على وسائل التواصل الاجتماعي لمعرفة مواعيد التسجيل.',
        },
        {
            id: 'item-2',
            question: 'هل أحتاج خبرة سابقة للانضمام؟',
            answer: 'لا، النادي يرحّب بالجميع! حتى لو ما عندك خبرة، عندنا ورش عمل وتدريب يساعدك على التعلّم والتطوير.',
        },
        {
            id: 'item-3',
            question: 'متى تُنشر الحلقات الجديدة من البودكاست؟',
            answer: 'ننشر حلقات جديدة بشكل دوري (عادةً كل أسبوعين). تقدرين تتابعيننا على منصات مثل سبوتيفاي ويوتيوب للحصول على آخر التحديثات.',
        },
        {
            id: 'item-4',
            question: 'هل أقدر أقترح مواضيع أو ضيوف للبودكاست؟',
            answer: 'طبعًا! نحب نسمع منكم. يمكنك إرسال اقتراحاتك عبر نموذج التواصل في الموقع أو من خلال حساباتنا الرسمية.',
        },
        {
            id: 'item-5',
            question: 'هل في شهادات مشاركة للمتطوعين أو أعضاء الفريق؟',
            answer: 'نعم، النادي يمنح شهادات موثّقة من الجامعة بعد إكمال الساعات أو المهام المطلوبة. هذا يساعدك في تطوير سيرتك الذاتية.',
        },
    ]

    return (
        <section className="py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                {/* العنوان والوصف */}
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                        الأسئلة الشائعة
                    </h2>
                    <p className="text-muted-foreground mt-4 text-balance">
                        هنا تجد إجابات لأكثر الأسئلة تكرارًا عن نادي نمو والبودكاست.
                    </p>
                </div>

                {/* الأكوردين (كارد كبير) */}
                <div className="mx-auto mt-12 max-w-2xl">
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full space-y-4"
                    >
                        {faqItems.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="overflow-hidden rounded-2xl border bg-background/90 p-6 shadow-md backdrop-blur transition dark:bg-background/70"
                            >
                                <AccordionTrigger className="cursor-pointer text-lg font-semibold hover:no-underline">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="mt-3 text-base leading-7 text-muted-foreground">
                                        {item.answer}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    {/* رابط صفحة التواصل */}
                    <p className="mt-8 text-center text-muted-foreground">
                        ما لقيت جواب لسؤالك؟ تقدر تتواصل معنا عبر{' '}
                        <Link
                            href="/contact"
                            className="font-medium text-accent hover:underline"
                        >
                            صفحة التواصل
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}
  