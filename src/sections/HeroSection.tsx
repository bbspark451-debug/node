"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ShieldCheck, Gift, Clock, Scale, FileCheck2 } from "lucide-react";
import { motion, useInView, animate, useReducedMotion } from "framer-motion";

interface HeroProps {
  onPrimaryClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/* عدّاد الأرقام: يعمل مرة واحدة عند الظهور */
function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate(v) {
        setCount(Math.floor(v));
      },
    });
    return () => controls.stop();
  }, [isInView, to, duration]);

  return (
    <span ref={ref} style={prefix ? { direction: "ltr", unicodeBidi: "isolate" } : undefined}>
      {prefix}
      {count.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

/* سطر عنوان يظهر من خلف قناع (حركة الدخول الوحيدة في الصفحة) */
function MaskedLine({
  children,
  index,
  reduce,
}: {
  children: React.ReactNode;
  index: number;
  reduce: boolean | null;
}) {
  return (
    <span className="block overflow-hidden py-[0.12em] -my-[0.12em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.95, delay: 0.2 + index * 0.16, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* شعار مرسوم: وثيقة رسمية + ميزان العدالة + ختم توثيق */
function SealEmblem({ reduce }: { reduce: boolean | null }) {
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label="وثيقة موثّقة بختم رسمي"
      className="h-full w-full drop-shadow-[0_8px_14px_rgba(10,42,31,0.18)]"
    >
      {/* ظل الورقة الخلفية */}
      <rect x="31" y="19" width="60" height="80" rx="7" fill="var(--color-emerald-soft)" />

      {/* الوثيقة */}
      <rect
        x="26"
        y="14"
        width="60"
        height="80"
        rx="7"
        fill="#fff"
        stroke="var(--color-ink)"
        strokeWidth="2.5"
      />

      {/* الشريط العلوي */}
      <path d="M26 33V21a7 7 0 0 1 7-7h46a7 7 0 0 1 7 7v12Z" fill="var(--color-ink)" />

      {/* ميزان العدالة */}
      <g stroke="var(--color-gold)" strokeWidth="1.6" strokeLinecap="round" fill="none">
        <path d="M56 18.5V29.5" />
        <path d="M50.5 29.5H61.5" />
        <path d="M45.5 22H66.5" />
      </g>
      <path d="M45.5 22 42 27.5h7Z M66.5 22 63 27.5h7Z" fill="var(--color-gold)" />

      {/* سطور النص (محاذاة لليمين) */}
      <g fill="var(--color-border)">
        <rect x="34" y="42" width="44" height="3.2" rx="1.6" />
        <rect x="42" y="50" width="36" height="3.2" rx="1.6" />
        <rect x="34" y="58" width="44" height="3.2" rx="1.6" />
        <rect x="50" y="66" width="28" height="3.2" rx="1.6" />
      </g>

      {/* ختم التوثيق */}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={reduce ? false : { scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, type: "spring", stiffness: 220, damping: 16 }}
      >
        <circle
          cx="82"
          cy="86"
          r="18"
          fill="var(--color-gold)"
          stroke="#fff"
          strokeWidth="3"
        />
        <circle
          cx="82"
          cy="86"
          r="13"
          fill="none"
          stroke="var(--color-ink)"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        <motion.path
          d="M75 86.5 80.5 92 89.5 80.5"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.45, duration: 0.55, ease: EASE }}
        />
      </motion.g>
    </svg>
  );
}

const css = `
@media (prefers-reduced-motion: no-preference) {
  @keyframes hs-spin { to { transform: rotate(360deg); } }
  .hs-spin { animation: hs-spin 140s linear infinite; }
}
`;

export function HeroSection({ onPrimaryClick }: HeroProps) {
  const reduce = useReducedMotion();

  const stats = [
    { icon: Gift, value: <CountUp to={100} suffix="%" duration={1} />, label: "خدمة مجانية بالكامل" },
    { icon: Clock, value: <CountUp to={24} suffix=" ساعة" duration={0.8} />, label: "متوسط وقت الاستجابة" },
    { icon: Scale, value: "تأطير كامل", label: "صياغة قانونية للشكوى" },
    { icon: FileCheck2, value: <CountUp to={10000} prefix="+" duration={1.2} />, label: "طلب تم توثيقه" },
  ];

  const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)]";

  return (
    <div dir="rtl" className="w-full overflow-hidden bg-[var(--color-background)] text-right text-[var(--color-foreground)]">
      <style>{css}</style>

      {/* ============ HERO ============ */}
      <section className="relative w-full overflow-hidden bg-[linear-gradient(180deg,var(--color-muted)_0%,var(--color-emerald-soft)_100%)] pt-16 pb-32 text-[var(--color-ink)] md:pt-28 md:pb-44">
        {/* خط ذهبي علوي */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-transparent via-[var(--color-gold)] to-transparent"
        />
        {/* إضاءة هادئة ثابتة خلف الختم */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_18%_45%,rgba(201,164,92,0.18),transparent_70%)]"
        />

        <div className="container-page relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          {/* موبايل: العنوان ← الختم ← الوصف والأزرار | ديسكتوب: النص يمين والختم يسار */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-0">
            {/* ---- 1) الشارة + العنوان الرئيسي ---- */}
            <div className="flex flex-col items-center text-center lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:items-start lg:self-end lg:text-right">
              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-3 text-xs font-medium text-[var(--color-gold-dark)] sm:text-sm"
              >
                <span aria-hidden className="hidden h-px w-10 bg-[var(--color-gold)] sm:block" />
                <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--color-emerald)]" />
                <span>منصة رقمية لتوثيق الشكاوى — دولة الإمارات</span>
              </motion.div>

              <h1 className="mt-8 whitespace-nowrap text-[2rem] font-extrabold leading-[1.35] tracking-normal text-[var(--color-ink)] min-[400px]:text-4xl sm:text-5xl md:text-6xl xl:text-5xl">
                <MaskedLine index={0} reduce={reduce}>
                  منصة حماية المستهلك
                </MaskedLine>
              </h1>
            </div>

            {/* ---- 2) الختم الرسمي ---- */}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
              className="flex justify-center lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-center"
            >
              <div className="relative aspect-square w-56 sm:w-72 lg:w-80">
                {/* دوائر متحدة المركز تتسع خلف الختم */}
                <span aria-hidden className="absolute -inset-[28%] rounded-full border border-[var(--color-ink)]/[0.08]" />
                <span aria-hidden className="absolute -inset-[56%] rounded-full border border-[var(--color-ink)]/[0.06]" />
                <span aria-hidden className="absolute -inset-[88%] rounded-full border border-[var(--color-ink)]/[0.04]" />

                {/* حلقة مسننة تدور ببطء شديد */}
                <svg viewBox="0 0 200 200" aria-hidden className="hs-spin absolute inset-0 h-full w-full">
                  <circle
                    cx="100"
                    cy="100"
                    r="92"
                    fill="none"
                    stroke="var(--color-gold)"
                    strokeWidth="5"
                    pathLength={360}
                    strokeDasharray="0.5 3.5"
                    strokeOpacity="0.85"
                  />
                </svg>

                {/* حلقات ثابتة */}
                <svg viewBox="0 0 200 200" aria-hidden className="absolute inset-0 h-full w-full">
                  <circle
                    cx="100"
                    cy="100"
                    r="99"
                    fill="none"
                    stroke="var(--color-gold)"
                    strokeWidth="0.7"
                    strokeOpacity="0.9"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    fill="none"
                    stroke="var(--color-gold)"
                    strokeWidth="0.5"
                    strokeOpacity="0.5"
                  />
                </svg>

                {/* القرص الأبيض والشعار المرسوم */}
                <div className="absolute inset-[15%] flex items-center justify-center rounded-full bg-[var(--color-card)] p-[13%] shadow-[var(--shadow-card)] ring-4 ring-[var(--color-gold)]/40">
                  <SealEmblem reduce={reduce} />
                </div>
              </div>
            </motion.div>

            {/* ---- 3) الفاصل + العنوان الفرعي + الأزرار ---- */}
            <div className="flex flex-col items-center text-center lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:items-start lg:self-start lg:text-right">
              <motion.div
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.9, ease: EASE }}
                style={{ transformOrigin: "right" }}
                className="mt-0 flex items-center gap-3 lg:mt-6"
                aria-hidden
              >
                <span className="h-px w-24 bg-gradient-to-l from-[var(--color-gold)] to-transparent" />
                <span className="h-1.5 w-1.5 rotate-45 bg-[var(--color-gold)]" />
              </motion.div>

              <motion.p
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.9 }}
                className="mt-6 max-w-xl text-base leading-[2] text-[var(--color-muted-foreground)] sm:text-lg"
              >
                منصة رقمية لتقديم شكاوى المستهلكين وملاحظاتهم بسهولة، مع تنظيم بيانات الشكوى وتسهيل متابعة الطلب من مكان واحد.
              </motion.p>

              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.15, duration: 0.9 }}
                className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row"
              >
                <a
                  href="#complaint-form"
                  onClick={onPrimaryClick}
                  className={`group inline-flex items-center justify-center gap-3 rounded-lg bg-[var(--color-emerald)] px-8 py-4 text-sm font-bold text-[var(--color-primary-foreground)] transition-colors duration-200 hover:bg-[var(--color-emerald-hover)] active:scale-[0.98] ${focusRing}`}
                >
                  <span>تقديم طلب توثيق شكوى</span>
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </a>
                <a
                  href="#how-it-works"
                  className={`inline-flex items-center justify-center rounded-lg border border-[var(--color-ink)]/25 px-8 py-4 text-sm font-medium text-[var(--color-ink)] transition-colors duration-200 hover:border-[var(--color-gold)] hover:text-[var(--color-gold-dark)] active:scale-[0.98] ${focusRing}`}
                >
                  دليل الإجراءات
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ الأرقام (شريط يعلو الحد الفاصل) ============ */}
      <div className="container-page relative z-20 mx-auto -mt-20 px-4 sm:px-6 md:-mt-24 lg:px-8">
        <div className="border-t-[3px] border-[var(--color-gold)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
          <div className="grid grid-cols-2 gap-px bg-[var(--color-border)] lg:grid-cols-4">
            {stats.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex flex-col items-center gap-2 bg-[var(--color-card)] px-4 py-8 text-center">
                  <Icon className="h-5 w-5 text-[var(--color-gold-dark)]" aria-hidden />
                  <span className="text-3xl font-extrabold leading-tight text-[var(--color-ink)] sm:text-4xl">
                    {item.value}
                  </span>
                  <span className="text-xs text-[var(--color-muted-foreground)] sm:text-sm">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============ ABOUT ============ */}
      <section className="container-page mx-auto px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div aria-hidden className="mb-5 flex items-center gap-3">
              <span className="h-px w-12 bg-[var(--color-gold)]" />
              <span className="h-1.5 w-1.5 rotate-45 bg-[var(--color-gold)]" />
            </div>
            <h2 className="text-4xl font-extrabold leading-tight text-[var(--color-ink)] sm:text-5xl">من نحن</h2>
          </div>
          <p className="text-xl font-medium leading-[2.1] text-[var(--color-foreground)] sm:text-2xl lg:col-span-8 lg:border-r-2 lg:border-[var(--color-gold)] lg:pr-10">
            خدمة إلكترونية متخصصة في إعادة تأطير وصياغة الشكاوى التجارية في دولة الإمارات، لضمان استيفائها للبيانات والمستندات المطلوبة قبل رفعها للجهات المعنية.
          </p>
        </div>
      </section>
    </div>
  );
}