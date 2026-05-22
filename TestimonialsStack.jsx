import React from "react";
import { motion } from "framer-motion";

export default function TestimonialsStack() {
  const testimonials = [
    {
      name: "Mariana Vasconcelos",
      role: "Diretora de Logística na Varejo Nacional",
      quote: "A visibilidade que a Rota trouxe para nossa operação de entrega de última milha redefiniu nossa eficiência. Tomamos decisões em minutos, não em dias.",
      image: "./executive_mariana.png",
      metric: "-31%",
      metricLabel: "em custo de last mile",
      logo: (
        <svg className="h-6 w-auto text-steam/40 hover:text-cobalt-pure/60 transition-colors duration-300" viewBox="0 0 160 32" fill="currentColor">
          <path d="M12 4l12 18H0L12 4z" className="text-cobalt-pure"/>
          <text x="32" y="22" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="16" letter-spacing="0.1em">VAREJO</text>
          <text x="105" y="22" fontFamily="Outfit, sans-serif" fontWeight="300" fontSize="16" letter-spacing="0.1em">NACIONAL</text>
        </svg>
      )
    },
    {
      name: "Roberto Almeida",
      role: "VP de Operações na E-Com Brasil",
      quote: "A roteirização inteligente e a auditoria automática de fretes mudaram completamente nossa relação com transportadoras. O ROI foi imediato.",
      image: "./executive_roberto.png",
      metric: "+34%",
      metricLabel: "em SLA de entrega",
      logo: (
        <svg className="h-6 w-auto text-steam/40 hover:text-cobalt-pure/60 transition-colors duration-300" viewBox="0 0 160 32" fill="currentColor">
          <circle cx="16" cy="16" r="8" stroke="currentColor" stroke-width="3" fill="none" className="text-cobalt-pure"/>
          <circle cx="16" cy="16" r="3" fill="currentColor" className="text-cobalt-pure"/>
          <text x="32" y="22" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="16" letter-spacing="0.1em">E-COM</text>
          <text x="95" y="22" fontFamily="Outfit, sans-serif" fontWeight="300" fontSize="16" letter-spacing="0.1em">BRASIL</text>
        </svg>
      )
    },
    {
      name: "Carlos Eduardo",
      role: "Diretor de Supply Chain na Indústria Global",
      quote: "A torre de controle unificada nos permitiu gerenciar múltiplos modais com o mesmo padrão de excelência. É o cérebro da nossa cadeia de suprimentos.",
      image: "./executive_carlos.png",
      metric: "-67%",
      metricLabel: "em tempo de auditoria",
      logo: (
        <svg className="h-6 w-auto text-steam/40 hover:text-cobalt-pure/60 transition-colors duration-300" viewBox="0 0 160 32" fill="currentColor">
          <path d="M4 4h8v8H4V4zm10 0h8v8h-8V4zM4 14h8v8H4v-8zm10 0h8v8h-8v-8z" className="text-cobalt-pure"/>
          <text x="32" y="22" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="16" letter-spacing="0.1em">INDÚSTRIA</text>
          <text x="125" y="22" fontFamily="Outfit, sans-serif" fontWeight="300" fontSize="16" letter-spacing="0.1em">GLOBAL</text>
        </svg>
      )
    }
  ];

  return (
    <section
      id="section-eight"
      className="w-full bg-transparent text-chalk relative z-10 overflow-x-hidden shrink-0"
    >
      {testimonials.map((item, idx) => (
        <div
          key={idx}
          className="w-full min-h-screen flex items-center py-20 lg:py-0 relative"
        >
          {/* Decorative Subtle Ambient Glow */}
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cobalt-pure/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="w-full max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 flex justify-center"
            >
              <div className="relative w-full max-w-[340px] aspect-square rounded-2xl overflow-hidden border border-asphalt-border/40 hover:border-cobalt-pure/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group transition-all duration-500">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1419] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              </div>
            </motion.div>

            {/* Center Column: Quote, Attribution & Logo */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col justify-center text-left"
            >
              {/* Eyebrow Pill */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cobalt-pure/10 border border-cobalt-pure/20 mb-6 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-cobalt-pure animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-cobalt-pure font-sans">
                  O QUE NOSSOS CLIENTES DIZEM
                </span>
              </div>

              {/* Quote */}
              <blockquote className="text-xl sm:text-2xl lg:text-[26px] font-medium italic text-white leading-relaxed mb-6 font-display">
                "{item.quote}"
              </blockquote>

              {/* Attribution */}
              <div className="mb-6">
                <h4 className="text-base sm:text-lg font-bold text-white font-sans">
                  {item.name}
                </h4>
                <p className="text-xs sm:text-sm text-steam font-sans">
                  {item.role}
                </p>
              </div>

              {/* SVG Company Logo */}
              <div className="w-fit">{item.logo}</div>
            </motion.div>

            {/* Right Column: Massive Metric */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-3 flex flex-col justify-center items-center lg:items-end text-center lg:text-right"
            >
              <div className="relative group">
                <span className="text-[58px] sm:text-[70px] lg:text-[82px] font-black font-display tracking-tight leading-none bg-gradient-to-br from-white via-white to-cobalt-pure bg-clip-text text-transparent drop-shadow-[0_10px_20px_rgba(61,90,254,0.15)]">
                  {item.metric}
                </span>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-steam font-sans mt-3">
                  {item.metricLabel}
                </p>
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-cobalt-pure/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      ))}
    </section>
  );
}
