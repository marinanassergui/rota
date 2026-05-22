import React from "react";
import { motion } from "framer-motion";

// Configuration for Inner Nodes (Radius = 145px)
const INNER_NODES = [
  { name: "SAP", angle: 0, x: 145, y: 0 },
  { name: "TOTVS", angle: 36, x: 117.3, y: 85.3 },
  { name: "Oracle", angle: 72, x: 44.8, y: 137.9 },
  { name: "Senior", angle: 108, x: -44.8, y: 137.9 },
  { name: "Bling", angle: 144, x: -117.3, y: 85.3 },
  { name: "Tiny", angle: 180, x: -145, y: 0 },
  { name: "Magento", angle: 216, x: -117.3, y: -85.3 },
  { name: "VTEX", angle: 252, x: -44.8, y: -137.9 },
  { name: "Shopify", angle: 288, x: 44.8, y: -137.9 },
  { name: "Olist", angle: 324, x: 117.3, y: -85.3 }
];

// Configuration for Outer Nodes (Radius = 250px)
const OUTER_NODES = [
  { name: "Mercado Livre", angle: 0, x: 250, y: 0 },
  { name: "B2W", angle: 25.7, x: 225.2, y: 108.4 },
  { name: "Correios", angle: 51.4, x: 156, y: 195.4 },
  { name: "Jadlog", angle: 77.1, x: 55.8, y: 243.7 },
  { name: "Total Express", angle: 102.8, x: -55.8, y: 243.7 },
  { name: "Loggi", angle: 128.5, x: -156, y: 195.4 },
  { name: "Kangu", angle: 154.2, x: -225.2, y: 108.4 },
  { name: "Stripe", angle: 180, x: -250, y: 0 },
  { name: "PagSeguro", angle: 205.7, x: -225.2, y: -108.4 },
  { name: "PayPal", angle: 231.4, x: -156, y: -195.4 },
  { name: "Stone", angle: 257.1, x: -55.8, y: -243.7 },
  { name: "ASAAS", angle: 282.8, x: 55.8, y: -243.7 },
  { name: "Hotmart", angle: 308.5, x: 156, y: -195.4 },
  { name: "Nuvemshop", angle: 334.2, x: 225.2, y: -108.4 }
];

// Compliance badges for Card 3
const COMPLIANCE_BADGES = [
  "NFe 4.00",
  "CTe 3.00",
  "MDF-e 3.00",
  "NFSe",
  "EDI CONEMB",
  "EDI NOTFIS",
  "EDI OCOREN",
  "EDI DOCCOB",
  "SPED Fiscal",
  "ANSI X12",
  "EDIFACT"
];

export default function IntegrationsOrbit() {
  return (
    <section
      id="section-six"
      className="w-full bg-transparent text-chalk pt-[100px] pb-[100px] relative z-10 overflow-x-hidden shrink-0"
    >
      {/* Self-contained responsive style block for the orbital grid */}
      <style dangerouslySetInnerHTML={{ __html: `
        .orbit-scaler {
          transition: transform 0.3s ease-out;
          transform-origin: center center;
        }
        .orbit-container-responsive {
          height: 580px;
          transition: height 0.3s ease-out;
        }
        @media (max-width: 639px) {
          .orbit-scaler {
            transform: scale(0.8);
          }
          .orbit-container-responsive {
            height: 460px;
          }
        }
        @media (max-width: 479px) {
          .orbit-scaler {
            transform: scale(0.65);
          }
          .orbit-container-responsive {
            height: 380px;
          }
        }
        @media (max-width: 374px) {
          .orbit-scaler {
            transform: scale(0.55);
          }
          .orbit-container-responsive {
            height: 320px;
          }
        }
      `}} />

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
              +200 INTEGRAÇÕES NATIVAS
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl sm:text-3xl lg:text-[48px] font-bold tracking-tight font-display text-white mb-4"
            style={{ lineHeight: "1.2" }}
          >
            Conecta com tudo que <br className="hidden sm:inline" /> sua operação já usa.
          </motion.h2>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base text-steam font-sans leading-relaxed max-w-2xl"
          >
            ERPs, TMSs legados, marketplaces, transportadoras, <br className="hidden sm:inline" /> gateways de pagamento. Em horas, não meses.
          </motion.p>
        </div>

        {/* Dynamic Orbital Grid Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[700px] orbit-container-responsive mx-auto mb-16 flex items-center justify-center overflow-hidden"
        >
          {/* Orbit Scaler for responsive scale control */}
          <div className="orbit-scaler absolute w-[500px] h-[500px] flex items-center justify-center">
            
            {/* Central Rota Hub (Large Cobalt Logo) */}
          <div className="relative z-30 w-24 h-24 rounded-full bg-cobalt-pure flex items-center justify-center shadow-[0_0_50px_rgba(61,90,254,0.6)] border-2 border-white/20 select-none">
            <span className="font-display font-black text-white text-base tracking-widest">ROTA</span>
            {/* Pulsing shockwaves behind the logo */}
            <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full border border-cobalt-pure/30 -translate-x-1/2 -translate-y-1/2 animate-orbit-pulse-1 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full border border-cobalt-pure/20 -translate-x-1/2 -translate-y-1/2 animate-orbit-pulse-2 pointer-events-none"></div>
          </div>

          {/* Concentric Orbit Ring 1 (Inner, Radius 145px) */}
          <div className="absolute z-10 w-[290px] h-[290px] rounded-full border border-white/5 pointer-events-none"></div>
          {/* Concentric Orbit Ring 2 (Outer, Radius 250px) */}
          <div className="absolute z-10 w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none"></div>

          {/* INNER ORBIT WRAPPER (Slow Clockwise Rotation, R=145px) */}
          <div className="absolute w-[290px] h-[290px] rounded-full animate-spin-clockwise z-20">
            {/* SVG flow lines from center to inner nodes (rotating WITH the wrapper) */}
            <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" style={{ transform: "translate(0, 0)" }}>
              {/* Center is (145, 145) */}
              <line x1="145" y1="145" x2="290" y2="145" className="stroke-cobalt-pure opacity-35 animate-flow-line" strokeWidth="1" />
              <line x1="145" y1="145" x2="0" y2="145" className="stroke-cobalt-pure opacity-35 animate-flow-line" strokeWidth="1" />
              <line x1="145" y1="145" x2="189.8" y2="282.9" className="stroke-cobalt-pure opacity-35 animate-flow-line" strokeWidth="1" />
              <line x1="145" y1="145" x2="28.2" y2="61" className="stroke-cobalt-pure opacity-35 animate-flow-line" strokeWidth="1" />
            </svg>

            {/* Inner Nodes */}
            {INNER_NODES.map((node, index) => (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `calc(50% + ${node.x}px)`,
                  top: `calc(50% + ${node.y}px)`,
                  transform: "translate(-50%, -50%)"
                }}
              >
                <div className="animate-unspin-clockwise px-2.5 py-1 rounded bg-[#1A1F26]/80 border border-white/10 text-[10px] font-display font-extrabold text-white/70 hover:text-white hover:border-cobalt-pure/50 hover:bg-cobalt-pure/10 hover:shadow-[0_0_15px_rgba(61,90,254,0.3)] transition-all duration-300 uppercase tracking-widest cursor-pointer select-none">
                  {node.name}
                </div>
              </div>
            ))}
          </div>

          {/* OUTER ORBIT WRAPPER (Slow Counter-Clockwise Rotation, R=250px) */}
          <div className="absolute w-[500px] h-[500px] rounded-full animate-spin-counter z-20">
            {/* SVG flow lines from center to outer nodes */}
            <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" style={{ transform: "translate(0, 0)" }}>
              {/* Center is (250, 250) */}
              <line x1="250" y1="250" x2="500" y2="250" className="stroke-cobalt-pure opacity-20 animate-flow-line" strokeWidth="1" />
              <line x1="250" y1="250" x2="0" y2="250" className="stroke-cobalt-pure opacity-20 animate-flow-line" strokeWidth="1" />
              <line x1="250" y1="250" x2="406" y2="445.4" className="stroke-cobalt-pure opacity-20 animate-flow-line" strokeWidth="1" />
              <line x1="250" y1="250" x2="94" y2="54.6" className="stroke-cobalt-pure opacity-20 animate-flow-line" strokeWidth="1" />
            </svg>

            {/* Outer Nodes */}
            {OUTER_NODES.map((node, index) => (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `calc(50% + ${node.x}px)`,
                  top: `calc(50% + ${node.y}px)`,
                  transform: "translate(-50%, -50%)"
                }}
              >
                <div className="animate-unspin-counter px-2 py-0.5 rounded bg-[#1A1F26]/80 border border-white/5 text-[9px] font-sans font-bold text-white/50 hover:text-white hover:border-cobalt-pure/40 hover:bg-cobalt-pure/5 hover:shadow-[0_0_12px_rgba(61,90,254,0.2)] transition-all duration-300 tracking-wider cursor-pointer select-none">
                  {node.name}
                </div>
              </div>
            ))}
          </div>
          </div> {/* End Orbit Scaler */}
        </motion.div>



      </div>
    </section>
  );
}
