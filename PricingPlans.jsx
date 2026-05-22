import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

export default function PricingPlans() {
  const plans = [
    {
      name: "Starter",
      metric: "50-300 veículos",
      price: "Sob consulta",
      description: "A base essencial de visibilidade e gestão de fretes para frotas de pequeno e médio porte.",
      modules: [
        "Torre de Controle (módulo básico)",
        "TMS Básico (auditoria padrão)",
        "Relatórios e KPIs de tráfego essenciais",
        "Suporte técnico comercial via e-mail",
      ],
      highlighted: false,
      ctaClass: "border border-asphalt-border/80 hover:border-cobalt-pure/40 bg-asphalt-border/10 hover:bg-cobalt-pure/10 text-white hover:text-[#5E72EB]",
      glowClass: "bg-cobalt-pure/3 group-hover:bg-cobalt-pure/8",
    },
    {
      name: "Growth",
      metric: "300-1500 veículos",
      price: "Sob consulta",
      description: "Plataforma completa com inteligência e integrações ilimitadas para otimização de larga escala.",
      modules: [
        "Plataforma completa (Torre + TMS + WMS)",
        "Integrações ilimitadas com ERPs e operadoras",
        "Roteirização inteligente baseada em IA",
        "Suporte dedicado 24/7 com gerente de contas",
      ],
      highlighted: true,
      ctaClass: "bg-cobalt-pure hover:bg-[#5E72EB] text-white shadow-[0_10px_25px_rgba(61,90,254,0.35)] hover:scale-[1.01]",
      glowClass: "bg-cobalt-pure/12",
    },
    {
      name: "Enterprise",
      metric: "1500+ veículos",
      price: "Customizado",
      description: "Arquitetura dedicada sob medida, SLAs contratuais e suporte prioritário para operações massivas.",
      modules: [
        "SLA de Uptime dedicado garantido por contrato",
        "Infraestrutura dedicada em nuvem (isolada)",
        "Integrações personalizadas com sistemas on-premise",
        "Suporte VIP prioritário de engenharia 24/7",
      ],
      highlighted: false,
      ctaClass: "border border-asphalt-border/80 hover:border-cobalt-pure/40 bg-asphalt-border/10 hover:bg-cobalt-pure/10 text-white hover:text-[#5E72EB]",
      glowClass: "bg-cobalt-pure/3 group-hover:bg-cobalt-pure/8",
    },
  ];

  return (
    <>
      <section
        id="section-nine"
        className="w-full bg-transparent text-chalk h-auto flex flex-col justify-start pt-24 lg:pt-32 pb-16 relative z-10 overflow-x-hidden shrink-0"
      >
        {/* Dynamic style block to completely prevent nested scrollbars and eliminate touch-gesture traps inside React */}
        <style dangerouslySetInnerHTML={{__html: `
          #section-nine,
          #section-nine .grid,
          #section-nine .grid > div {
              transform: translate3d(0, 0, 0);
              backface-visibility: hidden;
              will-change: transform;
          }

          #section-nine,
          #section-nine * {
              overflow: visible !important;
              overflow-x: visible !important;
              overflow-y: visible !important;
              scrollbar-width: none !important;
              overscroll-behavior: auto !important;
              touch-action: auto !important;
              height: auto !important;
              min-height: max-content !important;
          }

          #section-nine *::-webkit-scrollbar {
              display: none !important;
              width: 0 !important;
              height: 0 !important;
          }
        `}} />
      {/* Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cobalt-pure/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[300px] h-[300px] bg-cobalt-pure/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-6 flex flex-col justify-start">
        
        {/* Section Header (Symmetrical Typography) */}
        <div className="text-center mb-16 lg:mb-20">
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-cobalt-pure/10 border border-cobalt-pure/20 mb-6 w-fit mx-auto"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cobalt-pure animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-cobalt-pure font-sans">
              INVESTIMENTO
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
            A estrutura certa <br className="hidden sm:inline" /> para cada escala de operação.
          </motion.h2>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-steam font-sans leading-relaxed max-w-2xl mx-auto"
          >
            Escolha o plano ideal para gerenciar sua frota, <br className="hidden sm:inline" /> otimizar custos de frete e garantir conformidade operacional absoluta.
          </motion.p>
        </div>

        {/* 3-Column Responsive Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-between p-8 rounded-3xl transition-all duration-500 relative overflow-visible group ${
                plan.highlighted
                  ? "bg-[#131924]/60 border-2 border-cobalt-pure shadow-[0_20px_50px_rgba(61,90,254,0.12)] hover:shadow-[0_25px_60px_rgba(61,90,254,0.22)] scale-100 lg:scale-[1.03] hover:-translate-y-1"
                  : "bg-asphalt-base/40 border border-asphalt-border/60 hover:border-cobalt-pure/30 hover:bg-asphalt-base/60 hover:-translate-y-1"
              }`}
              style={{ overflow: 'visible', height: 'auto', minHeight: 'max-content', flexShrink: 0 }}
            >
              {plan.highlighted && (
                /* Pop Badge */
                <div className="absolute top-0 right-8 transform -translate-y-1/2">
                  <span className="bg-cobalt-pure text-white text-[9px] font-extrabold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-[0_4px_10px_rgba(61,90,254,0.3)] border border-[#5E72EB]">
                    MAIS POPULAR
                  </span>
                </div>
              )}

              <div style={{ overflow: 'visible', height: 'auto', minHeight: 'max-content', flexShrink: 0 }}>
                {/* Plan Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-bold font-display text-white tracking-tight mb-1">
                      {plan.name}
                    </h3>
                    <p
                      className={`text-xs font-sans ${
                        plan.highlighted ? "text-cobalt-pure font-bold" : "text-steam"
                      }`}
                    >
                      {plan.metric}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-sans ${
                      plan.highlighted
                        ? "bg-cobalt-pure/20 border border-cobalt-pure/40 text-cobalt-pure"
                        : "bg-asphalt-border/30 border border-asphalt-border/50 text-steam"
                    }`}
                  >
                    {plan.price}
                  </span>
                </div>

                <p
                  className={`text-sm font-sans mb-8 leading-relaxed ${
                    plan.highlighted ? "text-steam" : "text-steam/80"
                  }`}
                >
                  {plan.description}
                </p>

                {/* Divider */}
                <div
                  className={`w-full h-px mb-8 ${
                    plan.highlighted ? "bg-cobalt-pure/20" : "bg-asphalt-border/30"
                  }`}
                />

                {/* Modules List */}
                <ul className="space-y-4 mb-8" style={{ overflow: 'visible', height: 'auto', minHeight: 'max-content', flexShrink: 0 }}>
                  {plan.modules.map((module, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border text-cobalt-pure mt-0.5 ${
                          plan.highlighted
                            ? "bg-cobalt-pure/20 border-cobalt-pure/30"
                            : "bg-cobalt-pure/10 border-cobalt-pure/20"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span
                        className={`text-xs sm:text-sm font-sans ${
                          plan.highlighted ? "text-white font-medium" : "text-steam"
                        }`}
                      >
                        {module}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <a
                href="#"
                className={`w-full py-3.5 rounded-xl text-center text-xs sm:text-sm font-bold font-sans transition-all duration-300 flex items-center justify-center gap-1.5 group/btn ${plan.ctaClass}`}
              >
                Falar com vendas{" "}
                <span className="transform group-hover/btn:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </a>

              {/* Internal Glow */}
              <div
                className={`absolute -bottom-10 -right-10 w-32 h-32 blur-2xl rounded-full pointer-events-none transition-all duration-300 ${plan.glowClass}`}
              />
            </div>
          ))}
        </motion.div>
      </section>

      {/* Footer manifesto line */}
      <footer className="w-full max-w-[1200px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between border-t border-[#8A92A0]/15 relative z-10 shrink-0 text-xs text-steam gap-4 mt-12 mb-8">
        <div>&copy; 2026 Rota Tecnologia S.A. Todos os direitos reservados.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">
            Termos de Uso
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Privacidade
          </a>
        </div>
      </footer>
    </>
  );
}
