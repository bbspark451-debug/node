import { ArrowLeft } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface CtaSectionProps {
  onPrimaryClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function CtaSection({ onPrimaryClick }: CtaSectionProps) {
  const reduce = useReducedMotion();

  return (
    <section dir="rtl" className="py-16 md:py-24">
      <div className="container-page">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center text-white shadow-card md:px-16 md:py-20"
        >
          {/* ---- الزخرفة (داخل غلاف واحد حتى ما تتأثر بباقي العناصر) ---- */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {/* خط ذهبي علوي */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-transparent via-gold to-transparent" />

            {/* إضاءة ذهبية + خضراء هادئة */}
            <div className="absolute inset-0 bg-[radial-gradient(50%_70%_at_85%_20%,rgba(201,164,92,0.16),transparent_70%),radial-gradient(45%_60%_at_10%_90%,rgba(47,158,110,0.22),transparent_70%)]" />

            {/* شبكة نقطية خافتة */}
            <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:20px_20px] opacity-[0.07]" />

            {/* حلقات متحدة المركز (صدى لختم الهيرو) */}
            <svg
              viewBox="0 0 200 200"
              className="absolute -bottom-24 -left-24 h-72 w-72 md:-bottom-32 md:-left-32 md:h-96 md:w-96"
            >
              <circle cx="100" cy="100" r="98" fill="none" stroke="#C9A45C" strokeOpacity="0.28" strokeWidth="0.8" />
              <circle cx="100" cy="100" r="78" fill="none" stroke="#C9A45C" strokeOpacity="0.2" strokeWidth="0.6" />
              <circle cx="100" cy="100" r="58" fill="none" stroke="#C9A45C" strokeOpacity="0.14" strokeWidth="0.6" />
            </svg>
          </div>

          {/* ---- المحتوى ---- */}
          <div className="relative z-10">
            {/* اللوغو الرسمي */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface p-2 shadow-glow ring-2 ring-gold/55 ring-offset-2 ring-offset-ink md:h-20 md:w-20 md:p-2.5">
                <img
                  src="/kk.png"
                  alt="شعار منصة حماية المستهلك"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 text-gold-light">
              <span className="h-px w-10 bg-gradient-to-l from-gold to-transparent" aria-hidden="true" />
              <span className="text-xs font-bold sm:text-sm">حماية حقوقك أمانتنا</span>
              <span className="h-px w-10 bg-gradient-to-r from-gold to-transparent" aria-hidden="true" />
            </div>

            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold leading-[1.6] text-white md:text-4xl md:leading-[1.6]">
              لا تتنازل عن حقك.. <span className="text-gold-light">وثّق شكواك الآن</span> بأسلوب رسمّي ومعتمد
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-[2] text-white/75 md:text-base">
              خطوات بسيطة وسريعة لتقديم كافة التفاصيل والمستندات للحفاظ على حقوقك التجارية.
            </p>

            <div className="mt-9">
              <a
                href="#complaint-form"
                onClick={onPrimaryClick}
                className="group inline-flex items-center gap-3 rounded-xl bg-gold px-8 py-4 text-sm font-bold text-ink transition-colors duration-200 hover:bg-gold-hover active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink md:text-base"
              >
                <span>ابدأ تقديم الشكوى الآن</span>
                <ArrowLeft
                  className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:-translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}