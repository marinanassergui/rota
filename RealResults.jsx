import React from "react";
import { motion } from "framer-motion";
import { TrendingDown, ShieldCheck, Clock, Smile } from "lucide-react";

export default function RealResults() {
  const cards = [
    {
      value: "-28%",
      label: "custo de frete",
      icon: TrendingDown,
    },
    {
      value: "+34%",
      label: "SLA de entrega",
      icon: ShieldCheck,
    },
    {
      value: "-67%",
      label: "tempo de auditoria",
      icon: Clock,
    },
    {
      value: "+12pts",
      label: "NPS do cliente final",
      icon: Smile,
    },
  ];

  return (
    <section
      id="section-seven"
      className="w-full bg-transparent text-chalk min-h-screen flex items-center py-20 lg:py-0 relative z-10 overflow-x-hidden shrink-0"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Symmetrical Typography & Call to Action */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-cobalt-pure/10 border border-cobalt-pure/20 mb-6 w-fit"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cobalt-pure animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-cobalt-pure font-sans">
              RESULTADOS REAIS
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight font-display text-white mb-6"
            style={{ lineHeight: "1.2" }}
          >
            Em média, nossos clientes reduzem <br className="hidden sm:inline" /> 28% no custo de frete em 6 meses.
          </motion.h2>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-steam font-sans leading-relaxed mb-6"
          >
            Não é projeção. <br className="hidden sm:inline" /> É média real de 240+ implementações.
          </motion.p>

          {/* Link */}
          <motion.div
            initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#"
              className="inline-flex items-center text-sm font-bold font-sans text-cobalt-pure hover:text-[#5E72EB] transition-colors duration-300 gap-1.5 group"
            >
              Ver metodologia{" "}
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: 2x2 Grid of Glassmorphic Metric Cards */}
        <motion.div
          initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-asphalt-base/40 border border-asphalt-border/60 hover:border-cobalt-pure/40 hover:bg-asphalt-base/80 hover:shadow-[0_20px_40px_rgba(61,90,254,0.1)] hover:-translate-y-1 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between h-40 relative overflow-hidden group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[38px] sm:text-[44px] lg:text-[48px] font-black font-display tracking-tight leading-none bg-gradient-to-br from-white to-cobalt-pure bg-clip-text text-transparent">
                    {card.value}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-cobalt-pure/10 flex items-center justify-center border border-cobalt-pure/20 text-cobalt-pure group-hover:bg-cobalt-pure/20 group-hover:border-cobalt-pure/30 transition-all duration-300">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <p className="text-steam text-sm font-sans tracking-wide leading-snug">
                    {card.label}
                  </p>
                </div>
                {/* Glow effect inside card */}
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-cobalt-pure/5 blur-2xl rounded-full group-hover:bg-cobalt-pure/15 transition-all duration-300 pointer-events-none" />
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
