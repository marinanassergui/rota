import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

// Data structure holding all the premium use cases for the 6 industry sectors
const USE_CASES = [
  {
    id: "varejo",
    name: "Varejo",
    image: "./varejo.png",
    alt: "Logística de Varejo",
    headline: "Para Varejo, Rota resolve:",
    bullets: [
      {
        title: "Ruptura de gôndola",
        desc: "Reabastecimento preditivo automático integrado ao ERP."
      },
      {
        title: "SLA de entrega sob pressão",
        desc: "Otimização dinâmica de rotas urbanas de última milha (Last Mile)."
      },
      {
        title: "Rastreabilidade ponta a ponta",
        desc: "Visibilidade em tempo real para o cliente final sobre a entrega."
      },
      {
        title: "Logística reversa eficiente",
        desc: "Roteirização integrada para coletas de devolução no fluxo."
      }
    ],
    link: "#",
    caseStudy: {
      company: "MAGALU",
      director: "Mariana Vasconcelos",
      role: "Diretora de Supply Chain",
      metric: "-23% em frete não rastreado"
    }
  },
  {
    id: "industria",
    name: "Indústria",
    image: "./industria.png",
    alt: "Logística de Indústria",
    headline: "Para Indústria, Rota resolve:",
    bullets: [
      {
        title: "Recebimento e YMS",
        desc: "Agendamento digital de docas em tempo real eliminando gargalos."
      },
      {
        title: "Multas por estouro de janela",
        desc: "Alertas proativos de ETA com cálculo inteligente de risco de atraso."
      },
      {
        title: "Auditoria de fretes (TMS)",
        desc: "Conciliação automática de faturas de transporte com contratos."
      },
      {
        title: "Logística de retornáveis",
        desc: "Gestão e rastreamento de paletes e racks retornáveis."
      }
    ],
    link: "#",
    caseStudy: {
      company: "METALLIC",
      director: "Ricardo Antunes",
      role: "Diretor de Logística Industrial",
      metric: "-22% no custo de estada de carretas"
    }
  },
  {
    id: "distribuicao",
    name: "Distribuição",
    image: "./distribuicao.png",
    alt: "Logística de Distribuição",
    headline: "Para Distribuição, Rota resolve:",
    bullets: [
      {
        title: "Multi-depósitos",
        desc: "Alocação de pedidos inteligente baseada em proximidade de estoque."
      },
      {
        title: "Cubagem inadequada",
        desc: "Algoritmo inteligente de carregamento e consolidação de carga."
      },
      {
        title: "Frotas terceirizadas",
        desc: "Rastreamento leve por app móvel, sem rastreadores físicos caros."
      },
      {
        title: "Redução de combustível",
        desc: "Otimizador de rotas inteligente considerando peso e janelas."
      }
    ],
    link: "#",
    caseStudy: {
      company: "DISUL",
      director: "Carlos Eduardo",
      role: "Diretor de Operações",
      metric: "+14% de aproveitamento de carga útil"
    }
  },
  {
    id: "agronegocio",
    name: "Agronegócio",
    image: "./agronegocio.png",
    alt: "Logística de Agronegócio",
    headline: "Para Agronegócio, Rota resolve:",
    bullets: [
      {
        title: "Sem sinal de internet",
        desc: "Aplicativo móvel offline para operações logísticas robustas no campo."
      },
      {
        title: "Filas severas no porto",
        desc: "Integração com janelas de descarga e monitoramento de escoamento."
      },
      {
        title: "Perdas de safra em trânsito",
        desc: "Monitoramento de sensores de temperatura e telemetria de velocidade."
      },
      {
        title: "Contratação de frete spot",
        desc: "Marketplace integrado para cotações e disparos em massa rápidos."
      }
    ],
    link: "#",
    caseStudy: {
      company: "CEREAIS",
      director: "Felipe Fontana",
      role: "Head de Logística de Commodities",
      metric: "-29% de tempo de espera em portos"
    }
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    image: "./ecommerce.png",
    alt: "Logística de E-commerce",
    headline: "Para E-commerce, Rota resolve:",
    bullets: [
      {
        title: "Same-Day Delivery",
        desc: "Roteirização instantânea para micro-hubs urbanos em menos de 10s."
      },
      {
        title: "Suporte pós-compra",
        desc: "Notificações automáticas via WhatsApp com link de rastreamento."
      },
      {
        title: "Acurácia de separação",
        desc: "Integração de separação inteligente de alta acurácia (WMS)."
      },
      {
        title: "Última milha eficiente",
        desc: "Otimização considerando janelas de restrições de condomínios."
      }
    ],
    link: "#",
    caseStudy: {
      company: "CLICKSTORE",
      director: "Larissa Mendes",
      role: "Head de Customer Experience",
      metric: "-34% em chamados de suporte"
    }
  },
  {
    id: "3pl",
    name: "3PL",
    image: "./tpl.png",
    alt: "Logística de 3PL",
    headline: "Para 3PL, Rota resolve:",
    bullets: [
      {
        title: "Margens de lucro apertadas",
        desc: "Visibilidade de custo/km e margem por rota em tempo real."
      },
      {
        title: "Multi-embarcadores",
        desc: "Painel multi-tenant com relatórios segregados por cliente."
      },
      {
        title: "Garantia de SLAs rígidos",
        desc: "Alertas proativos sobre desvios antes do vencimento da janela."
      },
      {
        title: "Faturamento lento de fretes",
        desc: "Canhoto digital e digitalização instantânea do comprovante."
      }
    ],
    link: "#",
    caseStudy: {
      company: "ALFA3PL",
      director: "Bruno Alencar",
      role: "VP de Operações Logísticas",
      metric: "+21% de margem operacional líquida"
    }
  }
];

export default function UseCasesTabs() {
  const [activeTab, setActiveTab] = useState("varejo");

  // Get active case data based on selected tab ID
  const activeCase = USE_CASES.find((item) => item.id === activeTab) || USE_CASES[0];

  return (
    <section
      id="section-five"
      className="w-full bg-transparent text-chalk pt-[100px] pb-[100px] relative z-10 overflow-x-hidden shrink-0"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 flex flex-col justify-start">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 max-w-3xl mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-cobalt-pure/10 border border-cobalt-pure/20 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cobalt-pure animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-cobalt-pure font-sans">
              CASOS DE USO
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl sm:text-3xl lg:text-[48px] leading-[1.2] font-bold tracking-tight font-display text-white mb-4"
          >
            Rota se molda ao seu setor.
          </motion.h2>
        </div>

        {/* Horizontal Navigation Tabs (6 Setores) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full flex overflow-x-auto whitespace-nowrap items-center justify-start md:justify-center gap-3 mb-12 pb-2 scrollbar-none"
        >
          {USE_CASES.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-5 py-2.5 text-xs font-bold font-sans rounded-xl transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-cobalt-pure text-white border border-cobalt-pure/20 shadow-[0_0_20px_rgba(61,90,254,0.3)]"
                    : "bg-asphalt-base/30 border border-asphalt-border text-steam hover:text-white hover:bg-asphalt-base/60"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </motion.div>

        {/* Dynamic Use Case Panels Wrapper */}
        <div className="relative w-full flex flex-col justify-start min-h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase.id}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col lg:flex-row items-center gap-12 text-left"
            >
              {/* Left Column: Image */}
              <div className="w-full lg:w-5/12 shrink-0">
                <div className="relative rounded-2xl overflow-hidden border border-[#8A92A0]/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <img
                    src={activeCase.image}
                    alt={activeCase.alt}
                    className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1419] via-transparent to-transparent opacity-60"></div>
                </div>
              </div>

              {/* Right Column: Copy & Case */}
              <div className="w-full lg:w-7/12 flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-display font-bold text-white text-2xl sm:text-3xl mb-6">
                    {activeCase.headline}
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-6">
                    {activeCase.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cobalt-bg flex items-center justify-center mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cobalt-pure" />
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-white font-sans">
                            {bullet.title}
                          </h4>
                          <p className="text-[11px] text-steam leading-normal font-sans mt-0.5">
                            {bullet.desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={activeCase.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cobalt-pure hover:underline transition-all hover:text-opacity-80"
                  >
                    <span>Ver caso completo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Mini Case Study Card */}
                <div className="bg-[#1A1F26]/60 border border-[#8A92A0]/10 rounded-xl p-4 mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="px-2.5 py-1 rounded bg-white/5 border border-white/10 font-display font-extrabold text-[10px] text-white tracking-widest uppercase">
                      {activeCase.caseStudy.company}
                    </div>
                    <div className="border-l border-[#2A3140] pl-3">
                      <div className="text-xs font-bold text-white leading-tight font-sans">
                        {activeCase.caseStudy.director}
                      </div>
                      <div className="text-[10px] text-steam font-sans leading-none mt-0.5">
                        {activeCase.caseStudy.role}
                      </div>
                    </div>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-lg bg-cobalt-pure/10 border border-cobalt-pure/20 text-right">
                    <span className="text-[11px] font-bold font-sans text-cobalt-pure leading-none block">
                      RESULTADO
                    </span>
                    <span className="text-sm font-mono font-extrabold text-white block mt-0.5 shadow-sm">
                      {activeCase.caseStudy.metric}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
