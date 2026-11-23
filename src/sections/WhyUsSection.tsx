"use client";

import { ShieldCheck, Clock, Scale, Users, ArrowLeft, LucideIcon } from "lucide-react";

export interface FeatureItem {
  num: string;
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const whyUs: FeatureItem[] = [
  {
    num: "01",
    icon: ShieldCheck,
    title: "منصة معتمدة وموثوقة",
    desc: "معايير مهنية وقانونية صارمة لضمان موثوقية وحماية كافة الأطراف.",
  },
  {
    num: "02",
    icon: Clock,
    title: "معالجة سريعة وفعالة",
    desc: "بدء مراجعة الشكوى واتخاذ الإجراءات الأولية خلال 24 ساعة عمل.",
  },
  {
    num: "03",
    icon: Scale,
    title: "توثيق قانوني متكامل",
    desc: "إصدار ملف مرجعي موحد للشكوى يمكن استخدامه في المتابعات الرسمية.",
  },
  {
    num: "04",
    icon: Users,
    title: "دعم مخصص للمستهلك",
    desc: "فريق عمل يتفهم القوانين المحلية ويدعم المستهلك خطوة بخطوة.",
  },
];

interface WhyUsSectionProps {
  onPrimaryClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function WhyUsSection({ onPrimaryClick }: WhyUsSectionProps) {
  return (
    <section
      dir="rtl"
      className="section-navy gold-top-line relative border-y border-white/10 py-20 md:py-28 text-right"
    >
      {/* شبكة نقطية خافتة لتعزيز الطابع الرسمي */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:22px_22px] opacity-[0.05]"
      />

      <div className="container-page relative z-10 grid gap-12 lg:grid-cols-12 lg:items-center">
        {/* الجزء الأيمن: العنوان والنص + الزر */}
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2.5 text-xs font-bold text-gold-light sm:text-sm">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            <span>مميزات المنصة</span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold leading-[1.35] text-white md:text-4xl">
            لماذا تعتبر منصتنا الخيار الأفضل لتوثيق شكواك؟
          </h2>

          <div aria-hidden="true" className="mt-5 flex items-center gap-3">
            <span className="h-px w-16 bg-gradient-to-l from-gold to-transparent" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          </div>

          <p className="mt-5 text-sm font-medium leading-[2] text-white/80 md:text-base">
            نوفر لك منصة متكاملة وسلسة تجمع بين السرعة والشفافية التامة في التعامل مع القضايا والشكاوى التجارية في كافة إمارات الدولة.
          </p>

          <div className="mt-8">
            <a
              href="#complaint-form"
              onClick={onPrimaryClick}
              className="group inline-flex items-center gap-3 rounded-xl bg-gold px-7 py-3.5 text-sm font-bold text-ink shadow-glow transition-all duration-200 hover:bg-gold-hover active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <span>تقديم شكوى جديدة</span>
              <ArrowLeft
                className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        {/* الجزء الأيسر: شبكة الكروت الاحترافية */}
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {whyUs.map((w) => (
            <div
              key={w.num}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:bg-ink-800/90 hover:shadow-panel"
            >
              {/* خط ذهبي علوي يظهر بسلاسة عند التمرير */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] origin-right scale-x-0 bg-gradient-to-l from-gold via-gold-light to-transparent transition-transform duration-300 group-hover:scale-x-100"
              />

              <div className="flex items-start justify-between gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-gold/30 bg-ink/80 text-gold-light transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                  <w.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                </div>

                <span className="font-mono text-xs font-bold text-gold-light/40 transition-colors duration-300 group-hover:text-gold-light">
                  {w.num}
                </span>
              </div>

              <h3 className="mt-5 text-base font-bold leading-snug text-white md:text-lg">
                {w.title}
              </h3>

              <p className="mt-2.5 text-xs font-medium leading-[1.95] text-white/75 md:text-sm">
                {w.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}