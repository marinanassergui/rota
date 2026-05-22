import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Clock,
  Phone,
  Shield,
  Check,
  RefreshCw,
  Eye,
  Truck,
  BarChart3,
  Info,
  PhoneOff
} from "lucide-react";

// Hubs / Capital nodes data
const MAP_HUBS = [
  { id: "sp", name: "São Paulo Hub", x: 460, y: 430, label: "SP", active: 142, transit: 24, status: "Saudável" },
  { id: "rj", name: "Rio de Janeiro Hub", x: 540, y: 422, label: "RJ", active: 98, transit: 14, status: "Saudável" },
  { id: "bh", name: "Belo Horizonte Hub", x: 510, y: 380, label: "BH", active: 84, transit: 12, status: "Saudável" },
  { id: "bsb", name: "Brasília Central Hub", x: 460, y: 310, label: "DF", active: 76, transit: 10, status: "Saudável" },
  { id: "ssa", name: "Salvador Hub", x: 590, y: 290, label: "BA", active: 62, transit: 9, status: "1 Alerta" },
  { id: "rec", name: "Recife Hub Nordeste", x: 660, y: 220, label: "PE", active: 71, transit: 8, status: "Saudável" },
  { id: "poa", name: "Porto Alegre Hub Sul", x: 380, y: 490, label: "RS", active: 58, transit: 6, status: "1 Crítico" },
  { id: "mao", name: "Manaus Hub Norte", x: 280, y: 160, label: "AM", active: 32, transit: 4, status: "Saudável" },
  { id: "bel", name: "Belém Hub Norte", x: 450, y: 150, label: "PA", active: 41, transit: 5, status: "Saudável" }
];

// Bloomberg shipments data
const SHIPMENTS = [
  {
    id: "ROT-1049",
    origin: "SP",
    dest: "RJ",
    driver: "Marcos Silveira",
    eta: "14:20",
    etaNote: "(No Prazo)",
    etaColor: "text-emerald-pure",
    status: "EM TRÂNSITO",
    statusColor: "bg-emerald-pure/10 text-emerald-pure border-emerald-pure/20",
    risk: "BAIXO",
    riskColor: "bg-emerald-pure/15 text-emerald-pure border-emerald-pure/10"
  },
  {
    id: "ROT-1050",
    origin: "RJ",
    dest: "BH",
    driver: "Rodrigo Santos",
    eta: "15:45",
    etaNote: "(No Prazo)",
    etaColor: "text-emerald-pure",
    status: "EM TRÂNSITO",
    statusColor: "bg-emerald-pure/10 text-emerald-pure border-emerald-pure/20",
    risk: "BAIXO",
    riskColor: "bg-emerald-pure/15 text-emerald-pure border-emerald-pure/10"
  },
  {
    id: "ROT-1051",
    origin: "BH",
    dest: "SSA",
    driver: "Ricardo Gomes",
    eta: "18:10",
    etaNote: "(+25 min)",
    etaColor: "text-amber-pure font-bold",
    status: "PARADA SUSPEITA",
    statusColor: "bg-amber-pure/10 text-amber-pure border-amber-pure/20",
    risk: "MÉDIO",
    riskColor: "bg-amber-pure/15 text-amber-pure border-amber-pure/10"
  },
  {
    id: "ROT-1052",
    origin: "SP",
    dest: "POA",
    driver: "Cláudio Souza",
    eta: "Amanhã 08:30",
    etaNote: "(Desvio)",
    etaColor: "text-red-pure font-bold",
    status: "FORA DE ROTA",
    statusColor: "bg-red-pure/10 text-red-pure border-red-pure/20",
    risk: "CRÍTICO",
    riskColor: "bg-red-pure/15 text-red-pure border-red-pure/10"
  },
  {
    id: "ROT-1053",
    origin: "DF",
    dest: "BEL",
    driver: "Antônio Lima",
    eta: "Amanhã 11:15",
    etaNote: "",
    etaColor: "text-[#8A92A0]",
    status: "PLANEJADO",
    statusColor: "bg-[#1A1F26] text-[#8A92A0] border-[#2A3140]/30",
    risk: "NENHUM",
    riskColor: "bg-[#1A1F26] text-[#8A92A0] border-[#2A3140]/30"
  }
];

// Region compliance data
const REGION_SLA = [
  { name: "Sudeste", value: "99.1%", label: "SE", height: 132 },
  { name: "Sul", value: "98.4%", label: "S", height: 122 },
  { name: "Nordeste", value: "97.2%", label: "NE", height: 106 },
  { name: "Centro-Oeste", value: "96.8%", label: "CO", height: 100 },
  { name: "Norte", value: "95.4%", label: "N", height: 79 }
];

// Carrier SLA data
const CARRIER_SLA = [
  { name: "Mercúrio Log", value: "99.3%", width: 109, color: "fill-emerald-pure" },
  { name: "TransSul", value: "98.7%", width: 108, color: "fill-emerald-pure" },
  { name: "Expresso BR", value: "97.9%", width: 102, color: "fill-emerald-pure/80" },
  { name: "Swift Cargo", value: "96.2%", width: 90, color: "fill-amber-pure" }
];

// Client SLA data
const CLIENT_SLA = [
  { name: "Magalu", value: "99.6%", strokeDash: 99.6 },
  { name: "Ambev", value: "99.1%", strokeDash: 99.1 },
  { name: "Natura", value: "98.8%", strokeDash: 98.8 },
  { name: "JBS", value: "97.5%", strokeDash: 97.5 }
];

export default function ControlTowerDashboard() {
  // Navigation Tabs state
  const [activeTab, setActiveTab] = useState("overview"); // overview | transit | exceptions | sla

  // Map state
  const [hoveredHub, setHoveredHub] = useState(null);

  // Exception simulations state
  const [callingState1, setCallingState1] = useState("idle"); // idle | calling | ended
  const [callingState2, setCallingState2] = useState("idle"); // idle | calling | ended
  const [escortState1, setEscortState1] = useState("idle"); // idle | active
  const [telemetryState2, setTelemetryState2] = useState("idle"); // idle | active

  // SLA interactive states
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [hoveredClient, setHoveredClient] = useState(null);

  // Auto-rotating metrics simulated time increment (pure luxury UX)
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Call Driver 1 Simulation
  const handleCallDriver1 = () => {
    if (callingState1 !== "idle") return;
    setCallingState1("calling");
    setTimeout(() => {
      setCallingState1("ended");
      setTimeout(() => {
        setCallingState1("idle");
      }, 1200);
    }, 2000);
  };

  // Call Driver 2 Simulation
  const handleCallDriver2 = () => {
    if (callingState2 !== "idle") return;
    setCallingState2("calling");
    setTimeout(() => {
      setCallingState2("ended");
      setTimeout(() => {
        setCallingState2("idle");
      }, 1200);
    }, 2000);
  };

  // Escort 1 Action Simulation
  const handleEscort1 = () => {
    if (escortState1 === "active") return;
    setEscortState1("active");
    setTimeout(() => {
      setEscortState1("idle");
    }, 4000);
  };

  // Telemetry 2 Simulation
  const handleTelemetry2 = () => {
    if (telemetryState2 === "active") return;
    setTelemetryState2("active");
    setTimeout(() => {
      setTelemetryState2("idle");
    }, 4000);
  };

  return (
    <section id="section-four" className="w-full bg-transparent text-chalk pt-[100px] pb-[100px] relative z-10 overflow-x-hidden shrink-0">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        
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
              TORRE DE CONTROLE
            </span>
          </motion.div>
          
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl sm:text-3xl lg:text-[48px] whitespace-nowrap leading-[1.2] font-bold tracking-tight font-display text-white mb-4"
          >
            Tudo o que se move. Numa tela.
          </motion.h2>
          
          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base text-steam leading-relaxed font-sans text-balance"
          >
            Do veículo coletando à entrega assinada. Cada etapa, cada exceção, cada SLA — visíveis em tempo real.
          </motion.p>
        </div>

        {/* View Chips Controller */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {[
            { id: "overview", label: "Visão Geral" },
            { id: "transit", label: "Em Trânsito" },
            { id: "exceptions", label: "Exceções" },
            { id: "sla", label: "SLA" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`ctrl-chip px-5 py-2.5 text-xs font-bold font-sans rounded-xl transition-all duration-300 cursor-pointer relative ${
                activeTab === tab.id
                  ? "bg-cobalt-pure text-white border border-cobalt-pure/20 shadow-[0_0_20px_rgba(61,90,254,0.3)]"
                  : "bg-asphalt-base/30 border border-asphalt-border text-steam hover:text-white hover:bg-asphalt-base/60"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeChipGlow"
                  className="absolute inset-0 rounded-xl bg-cobalt-pure/10 border border-cobalt-pure/30 -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Giant Dashboard Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[1000px] mx-auto min-h-[580px] bg-[#0F1419]/80 border border-[#8A92A0]/15 backdrop-blur-xl rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          {/* Ambient Glows */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cobalt-pure/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-pure/5 blur-[100px] rounded-full pointer-events-none"></div>

          {/* Transitioning Panels Wrapper */}
          <div className="flex-1 w-full relative flex flex-col justify-start">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 15, scale: 0.99, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -15, scale: 0.99, filter: "blur(4px)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-6 w-full h-auto flex-1"
                >
                  {/* KPIs Section */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[#1A1F26]/40 border border-[#8A92A0]/10 p-4 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-steam uppercase tracking-wider font-semibold">Frota Total</p>
                        <h4 className="text-xl font-bold font-display text-white mt-1">1.420</h4>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-pure px-2 py-0.5 rounded bg-emerald-pure/10 border border-emerald-pure/20">
                        98.4% ATIVA
                      </span>
                    </div>
                    <div className="bg-[#1A1F26]/40 border border-[#8A92A0]/10 p-4 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-steam uppercase tracking-wider font-semibold">Em Trânsito</p>
                        <h4 className="text-xl font-bold font-display text-white mt-1">348</h4>
                      </div>
                      <span className="text-[10px] text-steam font-mono font-medium">34 CORREDORES</span>
                    </div>
                    <div className="bg-[#1A1F26]/40 border border-[#8A92A0]/10 p-4 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-steam uppercase tracking-wider font-semibold">Exceções</p>
                        <h4 className="text-xl font-bold font-display text-amber-pure mt-1">8</h4>
                      </div>
                      <span className="text-[10px] font-bold text-amber-pure px-2 py-0.5 rounded bg-amber-pure/10 border border-amber-pure/20 animate-pulse">
                        0.6% CRÍTICO
                      </span>
                    </div>
                    <div className="bg-[#1A1F26]/40 border border-[#8A92A0]/10 p-4 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-steam uppercase tracking-wider font-semibold">SLA Real</p>
                        <h4 className="text-xl font-bold font-display text-emerald-pure mt-1">98.6%</h4>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-pure">META 95.0%</span>
                    </div>
                  </div>

                  {/* Brazil SVG stylized map mesh */}
                  <div className="relative bg-[#1A1F26]/60 border border-[#8A92A0]/10 rounded-xl overflow-hidden flex items-center justify-center p-4 min-h-[310px] h-[310px]">
                    <svg className="w-full h-full max-h-full" viewBox="0 0 800 500">
                      <defs>
                        <filter id="glow-cobalt-ct" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="3" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <filter id="glow-amber-ct" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="3" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>

                      {/* Logistic corridors - Expanded and Prominent */}
                      <path d="M 460,430 Q 500,425 540,422" fill="none" stroke="rgba(61, 90, 254, 0.45)" strokeWidth="3.5" />
                      <path d="M 460,430 Q 485,405 510,380" fill="none" stroke="rgba(61, 90, 254, 0.45)" strokeWidth="3.5" />
                      <path d="M 540,422 Q 525,401 510,380" fill="none" stroke="rgba(61, 90, 254, 0.45)" strokeWidth="3.5" />
                      <path d="M 460,310 Q 485,345 510,380" fill="none" stroke="rgba(61, 90, 254, 0.45)" strokeWidth="3.5" />
                      <path d="M 460,430 Q 440,445 420,460" fill="none" stroke="rgba(61, 90, 254, 0.45)" strokeWidth="3.5" />
                      <path d="M 420,460 Q 400,475 380,490" fill="none" stroke="rgba(61, 90, 254, 0.45)" strokeWidth="3.5" />
                      <path d="M 590,290 Q 625,255 660,220" fill="none" stroke="rgba(61, 90, 254, 0.45)" strokeWidth="3.5" />
                      <path d="M 460,310 Q 525,300 590,290" fill="none" stroke="rgba(61, 90, 254, 0.45)" strokeWidth="3.5" />
                      <path d="M 450,150 Q 365,155 280,160" fill="none" stroke="rgba(61, 90, 254, 0.45)" strokeWidth="3.5" />
                      <path d="M 460,310 Q 455,230 450,150" fill="none" stroke="rgba(61, 90, 254, 0.45)" strokeWidth="3.5" />

                      {/* Pulsing Active Moving Vehicle Dots - Scaled Up */}
                      <circle r="5.5" fill="#00E5FF" filter="url(#glow-cobalt-ct)">
                        <animateMotion dur="6s" repeatCount="indefinite" path="M 460,430 Q 500,425 540,422" rotate="auto" />
                      </circle>
                      <circle r="5.5" fill="#00E5FF" filter="url(#glow-cobalt-ct)">
                        <animateMotion dur="8s" repeatCount="indefinite" path="M 460,310 Q 455,230 450,150" rotate="auto" />
                      </circle>
                      <circle r="5.5" fill="#FFB020" filter="url(#glow-amber-ct)">
                        <animateMotion dur="5s" repeatCount="indefinite" path="M 460,430 Q 485,405 510,380" rotate="auto" />
                      </circle>

                      {/* Scattered Static Mini Dots - Enhanced */}
                      <circle cx="490" cy="425" r="2.5" fill="#3D5AFE" opacity="0.8" />
                      <circle cx="510" cy="415" r="2.5" fill="#3D5AFE" opacity="0.9" />
                      <circle cx="500" cy="400" r="2.5" fill="#00E5FF" opacity="0.85" />
                      <circle cx="480" cy="380" r="2.5" fill="#3D5AFE" opacity="0.7" />
                      <circle cx="450" cy="330" r="2.5" fill="#3D5AFE" opacity="0.6" />
                      <circle cx="440" cy="445" r="2.5" fill="#FFB020" opacity="0.9" />
                      <circle cx="395" cy="475" r="2.5" fill="#3D5AFE" opacity="0.8" />
                      <circle cx="570" cy="310" r="2.5" fill="#3D5AFE" opacity="0.9" />
                      <circle cx="610" cy="270" r="2.5" fill="#3D5AFE" opacity="0.7" />
                      <circle cx="640" cy="235" r="2.5" fill="#00E5FF" opacity="0.85" />
                      <circle cx="410" cy="155" r="2.5" fill="#3D5AFE" opacity="0.8" />
                      <circle cx="330" cy="158" r="2.5" fill="#3D5AFE" opacity="0.7" />

                      {/* Hubs / Capital Nodes - Scaled Up for Prominence */}
                      {MAP_HUBS.map((hub) => (
                        <g
                          key={hub.id}
                          className="map-capital-node cursor-pointer group/node"
                          onMouseEnter={() => setHoveredHub(hub)}
                          onMouseLeave={() => setHoveredHub(null)}
                        >
                          <circle
                            cx={hub.x}
                            cy={hub.y}
                            r="6.5"
                            fill={hub.status.includes("Crítico") ? "#FF4D4D" : hub.status.includes("Alerta") ? "#FFB020" : "#3D5AFE"}
                            className="stroke-white stroke-[1.5] transition-all duration-300 group-hover/node:fill-[#00E5FF] group-hover/node:r-[8.5]"
                          />
                          <text
                            x={hub.x}
                            y={hub.y + (hub.id === "poa" ? -12 : hub.id === "sp" || hub.id === "rj" || hub.id === "ssa" || hub.id === "rec" ? 22 : -14)}
                            fontSize="11"
                            fontFamily="sans-serif"
                            fontWeight="bold"
                            fill="#8A92A0"
                            textAnchor="middle"
                            className="transition-colors group-hover/node:fill-white font-mono pointer-events-none select-none"
                          >
                            {hub.label}
                          </text>
                        </g>
                      ))}
                    </svg>

                    {/* Floating Map HUD Detail Card */}
                    <div
                      className={`absolute bottom-4 left-4 bg-[#0F1419]/90 border border-[#8A92A0]/15 backdrop-blur-md px-3.5 py-2.5 rounded-xl text-xs font-sans text-steam pointer-events-none flex flex-col gap-1 w-52 shadow-2xl transition-all duration-300 ${
                        hoveredHub ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                      }`}
                    >
                      <div className="text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-[#8A92A0]/10 pb-1.5">
                        <span className={`w-2 h-2 rounded-full animate-pulse ${
                          hoveredHub?.status.includes("Crítico") ? "bg-red-pure" : hoveredHub?.status.includes("Alerta") ? "bg-amber-pure" : "bg-[#3D5AFE]"
                        }`} />
                        <span>{hoveredHub?.name || "Hub"}</span>
                      </div>
                      <div className="mt-1 flex justify-between">
                        <span>Veículos Ativos:</span>
                        <span className="font-bold text-white font-mono">{hoveredHub?.active || "0"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Em Trânsito:</span>
                        <span className="font-bold text-white font-mono">{hoveredHub?.transit || "0"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status Hub:</span>
                        <span className={`font-bold ${
                          hoveredHub?.status.includes("Crítico") ? "text-red-pure animate-pulse" : hoveredHub?.status.includes("Alerta") ? "text-amber-pure" : "text-emerald-pure"
                        }`}>
                          {hoveredHub?.status || "Saudável"}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "transit" && (
                <motion.div
                  key="transit"
                  initial={{ opacity: 0, y: 15, scale: 0.99, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -15, scale: 0.99, filter: "blur(4px)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-4 w-full h-auto flex-1"
                >
                  <div className="relative bg-[#1A1F26]/60 border border-[#8A92A0]/10 rounded-xl overflow-hidden p-4 min-h-[310px] h-[310px] flex flex-col justify-start">
                    <div className="overflow-x-auto custom-scrollbar h-full">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-[#2A3140]/30 text-[10px] text-steam uppercase tracking-wider font-semibold font-mono pb-2">
                            <th className="py-3 px-4">Embarque</th>
                            <th className="py-3 px-4">Rota</th>
                            <th className="py-3 px-4">Motorista</th>
                            <th className="py-3 px-4 font-mono">ETA</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Risco</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2A3140]/15 text-xs font-sans">
                          {SHIPMENTS.map((shipment) => (
                            <tr
                              key={shipment.id}
                              className="hover:bg-[#1A1F26]/30 transition-colors duration-200"
                            >
                              <td className="py-3.5 px-4 font-bold text-white font-mono">{shipment.id}</td>
                              <td className="py-3.5 px-4 text-steam font-semibold">
                                {shipment.origin} <span className="text-cobalt-pure">➔</span> {shipment.dest}
                              </td>
                              <td className="py-3.5 px-4 text-white font-medium">{shipment.driver}</td>
                              <td className={`py-3.5 px-4 font-mono ${shipment.etaColor || "text-steam"}`}>
                                {shipment.eta}{" "}
                                {shipment.etaNote && (
                                  <span className={`font-sans font-bold text-[10px] ml-1`}>
                                    {shipment.etaNote}
                                  </span>
                                )}
                              </td>
                              <td className="py-3.5 px-4">
                                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border ${shipment.statusColor}`}>
                                  {shipment.status !== "PLANEJADO" && (
                                    <span className={`w-1 h-1 rounded-full animate-pulse ${
                                      shipment.status.includes("ROTA") ? "bg-red-pure" : shipment.status.includes("SUSPEITA") ? "bg-amber-pure" : "bg-emerald-pure"
                                    }`} />
                                  )}
                                  {shipment.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${shipment.riskColor}`}>
                                  {shipment.risk}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "exceptions" && (
                <motion.div
                  key="exceptions"
                  initial={{ opacity: 0, y: 15, scale: 0.99, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -15, scale: 0.99, filter: "blur(4px)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-6 w-full h-auto flex-1"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Exception Card 1 */}
                    <div className="bg-[#1A1F26]/40 border border-red-pure/20 rounded-2xl p-5 flex flex-col gap-4 shadow-[0_4px_25px_rgba(255,77,77,0.05)] relative overflow-hidden">
                      <div className="absolute -top-12 -right-12 w-24 h-24 bg-red-pure/5 blur-2xl rounded-full"></div>
                      
                      {/* Header Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-red-pure/10 flex items-center justify-center border border-red-pure/20 text-red-pure animate-pulse">
                            <AlertTriangle className="w-4.5 h-4.5" />
                          </span>
                          <div>
                            <h4 className="font-display font-bold text-white text-sm">Desvio de Rota</h4>
                            <p className="text-[10px] text-steam font-mono mt-0.5">ROT-1052 · Cláudio Souza</p>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-red-pure/15 text-red-pure border border-red-pure/10 text-[9px] font-bold">
                          CRÍTICO
                        </span>
                      </div>

                      {/* Alert Box */}
                      <p className="text-xs text-steam leading-relaxed bg-[#0F1419]/60 border border-[#8A92A0]/10 p-3 rounded-lg">
                        <span className="font-bold text-white">Alerta de Telemetria:</span> O motorista afastou-se 12km da rota aprovada nas últimas 3 leituras. Carga de eletrodomésticos avaliada em R$ 420.000.
                      </p>

                      {/* Horizontal Timeline */}
                      <div className="flex flex-col gap-2.5 mt-2 bg-[#0F1419]/40 border border-[#8A92A0]/5 p-4 rounded-xl">
                        <span className="text-[9px] font-sans font-bold text-[#8A92A0] uppercase tracking-wider">
                          Timeline do Despacho
                        </span>
                        <div className="flex items-center justify-between relative mt-2 px-1">
                          {/* Background timeline lines */}
                          <div className="absolute top-[7px] left-2 right-2 h-0.5 bg-[#2A3140]/30 z-0"></div>
                          <div className="absolute top-[7px] left-2 w-2/3 h-0.5 bg-red-pure/40 z-0"></div>
                          
                          {/* Nodes */}
                          <div className="flex flex-col items-center gap-1 z-10">
                            <div className="w-3.5 h-3.5 rounded-full bg-emerald-pure flex items-center justify-center border border-emerald-pure/20">
                              <Check className="w-2 h-2 text-white stroke-[3.5]" />
                            </div>
                            <span className="text-[9px] font-sans text-emerald-pure font-bold">Coleta</span>
                          </div>
                          <div className="flex flex-col items-center gap-1 z-10">
                            <div className="w-3.5 h-3.5 rounded-full bg-emerald-pure flex items-center justify-center border border-emerald-pure/20">
                              <Check className="w-2 h-2 text-white stroke-[3.5]" />
                            </div>
                            <span className="text-[9px] font-sans text-emerald-pure font-bold">Pedágio</span>
                          </div>
                          <div className="flex flex-col items-center gap-1 z-10">
                            <div className="w-3.5 h-3.5 rounded-full bg-red-pure flex items-center justify-center border border-red-pure/20 shadow-[0_0_10px_rgba(255,77,77,0.6)] animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                            </div>
                            <span className="text-[9px] font-sans text-red-pure font-bold">Alerta</span>
                          </div>
                          <div className="flex flex-col items-center gap-1 z-10 opacity-40">
                            <div className="w-3.5 h-3.5 rounded-full bg-[#2A3140] border border-[#8A92A0]/10 flex items-center justify-center"></div>
                            <span className="text-[9px] font-sans text-steam">Destino</span>
                          </div>
                        </div>
                      </div>

                      {/* CTA Actions */}
                      <div className="grid grid-cols-2 gap-3 mt-1.5">
                        <button
                          onClick={handleCallDriver1}
                          className="btn-exc-call py-2 rounded-lg border border-red-pure/30 bg-red-pure/5 hover:bg-red-pure/10 text-white font-sans text-[11px] font-bold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          {callingState1 === "idle" && (
                            <>
                              <Phone className="w-3.5 h-3.5" />
                              <span>Ligar p/ Motorista</span>
                            </>
                          )}
                          {callingState1 === "calling" && (
                            <>
                              <span className="w-3 h-3 rounded-full border border-t-transparent border-white animate-spin shrink-0"></span>
                              <span>Discando...</span>
                            </>
                          )}
                          {callingState1 === "ended" && (
                            <>
                              <PhoneOff className="w-3.5 h-3.5" />
                              <span>Chamada Encerrada</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={handleEscort1}
                          className={`btn-exc-action py-2 rounded-lg border font-sans text-[11px] font-bold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                            escortState1 === "active"
                              ? "bg-emerald-pure/20 border-emerald-pure text-white"
                              : "bg-[#2A3140]/80 border-[#8A92A0]/15 hover:bg-[#2A3140] text-steam hover:text-white"
                          }`}
                        >
                          {escortState1 === "idle" ? (
                            <>
                              <Shield className="w-3.5 h-3.5 text-[#3D5AFE]" />
                              <span>Acionar Escolta</span>
                            </>
                          ) : (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-pure" />
                              <span>Escolta Acionada</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Exception Card 2 */}
                    <div className="bg-[#1A1F26]/40 border border-amber-pure/20 rounded-2xl p-5 flex flex-col gap-4 shadow-[0_4px_25px_rgba(255,176,32,0.05)] relative overflow-hidden">
                      <div className="absolute -top-12 -right-12 w-24 h-24 bg-amber-pure/5 blur-2xl rounded-full"></div>
                      
                      {/* Header Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-amber-pure/10 flex items-center justify-center border border-amber-pure/20 text-amber-pure animate-pulse">
                            <Clock className="w-4.5 h-4.5" />
                          </span>
                          <div>
                            <h4 className="font-display font-bold text-white text-sm">Parada Suspeita</h4>
                            <p className="text-[10px] text-steam font-mono mt-0.5">ROT-1051 · Ricardo Gomes</p>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-amber-pure/15 text-amber-pure border border-amber-pure/10 text-[9px] font-bold">
                          MÉDIO
                        </span>
                      </div>

                      {/* Alert Box */}
                      <p className="text-xs text-steam leading-relaxed bg-[#0F1419]/60 border border-[#8A92A0]/10 p-3 rounded-lg">
                        <span className="font-bold text-white">Alerta de Parada:</span> Veículo parado em local não homologado por mais de 25 minutos. Carga de medicamentos de alto valor.
                      </p>

                      {/* Horizontal Timeline */}
                      <div className="flex flex-col gap-2.5 mt-2 bg-[#0F1419]/40 border border-[#8A92A0]/5 p-4 rounded-xl">
                        <span className="text-[9px] font-sans font-bold text-[#8A92A0] uppercase tracking-wider">
                          Timeline do Despacho
                        </span>
                        <div className="flex items-center justify-between relative mt-2 px-1">
                          {/* Background timeline lines */}
                          <div className="absolute top-[7px] left-2 right-2 h-0.5 bg-[#2A3140]/30 z-0"></div>
                          <div className="absolute top-[7px] left-2 w-1/3 h-0.5 bg-amber-pure/40 z-0"></div>
                          
                          {/* Nodes */}
                          <div className="flex flex-col items-center gap-1 z-10">
                            <div className="w-3.5 h-3.5 rounded-full bg-emerald-pure flex items-center justify-center border border-emerald-pure/20">
                              <Check className="w-2 h-2 text-white stroke-[3.5]" />
                            </div>
                            <span className="text-[9px] font-sans text-emerald-pure font-bold">Coleta</span>
                          </div>
                          <div className="flex flex-col items-center gap-1 z-10">
                            <div className="w-3.5 h-3.5 rounded-full bg-amber-pure flex items-center justify-center border border-amber-pure/20 shadow-[0_0_10px_rgba(255,176,32,0.6)] animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                            </div>
                            <span className="text-[9px] font-sans text-amber-pure font-bold">Parada</span>
                          </div>
                          <div className="flex flex-col items-center gap-1 z-10 opacity-40">
                            <div className="w-3.5 h-3.5 rounded-full bg-[#2A3140] border border-[#8A92A0]/10 flex items-center justify-center"></div>
                            <span className="text-[9px] font-sans text-steam">Fronteira</span>
                          </div>
                          <div className="flex flex-col items-center gap-1 z-10 opacity-40">
                            <div className="w-3.5 h-3.5 rounded-full bg-[#2A3140] border border-[#8A92A0]/10 flex items-center justify-center"></div>
                            <span className="text-[9px] font-sans text-steam">Destino</span>
                          </div>
                        </div>
                      </div>

                      {/* CTA Actions */}
                      <div className="grid grid-cols-2 gap-3 mt-1.5">
                        <button
                          onClick={handleCallDriver2}
                          className="btn-exc-call py-2 rounded-lg border border-amber-pure/30 bg-amber-pure/5 hover:bg-amber-pure/10 text-white font-sans text-[11px] font-bold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          {callingState2 === "idle" && (
                            <>
                              <Phone className="w-3.5 h-3.5" />
                              <span>Ligar p/ Motorista</span>
                            </>
                          )}
                          {callingState2 === "calling" && (
                            <>
                              <span className="w-3 h-3 rounded-full border border-t-transparent border-white animate-spin shrink-0"></span>
                              <span>Discando...</span>
                            </>
                          )}
                          {callingState2 === "ended" && (
                            <>
                              <PhoneOff className="w-3.5 h-3.5" />
                              <span>Chamada Encerrada</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={handleTelemetry2}
                          className={`btn-exc-action py-2 rounded-lg border font-sans text-[11px] font-bold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                            telemetryState2 === "active"
                              ? "bg-[#3D5AFE]/20 border-[#3D5AFE] text-white"
                              : "bg-[#2A3140]/80 border-[#8A92A0]/15 hover:bg-[#2A3140] text-steam hover:text-white"
                          }`}
                        >
                          {telemetryState2 === "idle" ? (
                            <>
                              <Info className="w-3.5 h-3.5 text-[#3D5AFE]" />
                              <span>Ver Telemetria</span>
                            </>
                          ) : (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-pure" />
                              <span>Telemetria OK</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}

              {activeTab === "sla" && (
                <motion.div
                  key="sla"
                  initial={{ opacity: 0, y: 15, scale: 0.99, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -15, scale: 0.99, filter: "blur(4px)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-6 w-full h-auto flex-1 animate-sla-grows"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Chart 1: SLA por Região */}
                    <div className="bg-[#1A1F26]/40 border border-[#8A92A0]/10 rounded-2xl p-5 flex flex-col gap-4 relative">
                      <div>
                        <h4 className="font-display font-bold text-white text-xs">SLA de Entrega por Região</h4>
                        <p className="text-[9px] text-[#8A92A0] uppercase tracking-wider font-mono mt-0.5">
                          Ano Corrente · Meta 95%
                        </p>
                      </div>
                      
                      {/* SVG Column Bar Chart */}
                      <div className="h-48 w-full flex items-end justify-center select-none pt-2 relative">
                        <svg className="w-full h-full" viewBox="0 0 240 160">
                          {/* Grid lines */}
                          <line x1="10" y1="40" x2="230" y2="40" stroke="rgba(138,146,160,0.06)" strokeDasharray="2,2" />
                          <line x1="10" y1="80" x2="230" y2="80" stroke="rgba(138,146,160,0.06)" strokeDasharray="2,2" />
                          <line x1="10" y1="120" x2="230" y2="120" stroke="rgba(138,146,160,0.06)" strokeDasharray="2,2" />

                          {/* Target Line at 95% */}
                          <line x1="10" y1="48" x2="230" y2="48" stroke="#FFB020" strokeOpacity="0.5" strokeDasharray="2,2" strokeWidth="1" />
                          <text x="230" y="44" fontSize="6" fontFamily="sans-serif" fontWeight="bold" fill="#FFB020" textAnchor="end">Meta 95%</text>

                          {/* Animated Bars */}
                          {REGION_SLA.map((region, idx) => (
                            <motion.rect
                              key={region.name}
                              initial={{ height: 0, y: 140 }}
                              animate={{ height: region.height, y: 140 - region.height }}
                              transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.05 }}
                              className="fill-[#3D5AFE]/70 hover:fill-[#3D5AFE] transition-colors cursor-pointer"
                              x={20 + idx * 45}
                              width="22"
                              rx="3"
                              onMouseEnter={() => setHoveredRegion(region)}
                              onMouseLeave={() => setHoveredRegion(null)}
                            />
                          ))}

                          {/* Labels */}
                          {REGION_SLA.map((region, idx) => (
                            <text
                              key={`${region.name}-label`}
                              x={31 + idx * 45}
                              y="152"
                              fontSize="8.5"
                              fontFamily="sans-serif"
                              fontWeight="bold"
                              fill="#8A92A0"
                              textAnchor="middle"
                            >
                              {region.label}
                            </text>
                          ))}
                        </svg>
                      </div>
                      
                      {/* Interactive Info */}
                      <div className="h-6 text-center">
                        <AnimatePresence mode="wait">
                          {hoveredRegion ? (
                            <motion.span
                              key="region-info"
                              initial={{ opacity: 0, y: 2 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -2 }}
                              className="text-[9px] font-mono text-[#00E5FF] font-bold"
                            >
                              {hoveredRegion.name}: {hoveredRegion.value} SLA Realizado
                            </motion.span>
                          ) : (
                            <span className="text-[9px] font-mono text-steam">Mova o cursor sobre as barras</span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Chart 2: SLA por Transportadora */}
                    <div className="bg-[#1A1F26]/40 border border-[#8A92A0]/10 rounded-2xl p-5 flex flex-col gap-4 relative">
                      <div>
                        <h4 className="font-display font-bold text-white text-xs">SLA por Transportadora</h4>
                        <p className="text-[9px] text-[#8A92A0] uppercase tracking-wider font-mono mt-0.5">
                          Top 4 Parceiros logísticos
                        </p>
                      </div>

                      {/* SVG Horizontal Bar Chart */}
                      <div className="h-48 w-full flex flex-col select-none pt-2 justify-center">
                        <svg className="w-full h-full" viewBox="0 0 240 160">
                          {CARRIER_SLA.map((carrier, idx) => {
                            const textY = 24 + idx * 35;
                            const barY = 15 + idx * 35;
                            return (
                              <g key={carrier.name}>
                                <text x="10" y={textY} fontSize="8" fontFamily="sans-serif" fontWeight="bold" fill="#8A92A0">
                                  {carrier.name}
                                </text>
                                <rect className="fill-[#2A3140] opacity-40" x="80" y={barY} width="110" height="8" rx="2" />
                                <motion.rect
                                  initial={{ width: 0 }}
                                  animate={{ width: carrier.width }}
                                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 + idx * 0.05 }}
                                  className={carrier.color}
                                  x="80"
                                  y={barY}
                                  height="8"
                                  rx="2"
                                />
                                <text x="235" y={textY - 1} fontSize="8.5" fontFamily="sans-serif" fontWeight="bold" fill="white" font-mono="true" textAnchor="end">
                                  {carrier.value}
                                </text>
                              </g>
                            );
                          })}
                        </svg>
                      </div>
                      
                      {/* Interactive Info */}
                      <div className="h-6 text-center">
                        <span className="text-[9px] font-mono text-steam">Média das transportadoras: 98.0%</span>
                      </div>
                    </div>

                    {/* Chart 3: SLA por Cliente */}
                    <div className="bg-[#1A1F26]/40 border border-[#8A92A0]/10 rounded-2xl p-5 flex flex-col gap-4 relative">
                      <div>
                        <h4 className="font-display font-bold text-white text-xs">SLA por Grandes Contas</h4>
                        <p className="text-[9px] text-[#8A92A0] uppercase tracking-wider font-mono mt-0.5">
                          Contratos Enterprise Corporativos
                        </p>
                      </div>

                      {/* SVG Radial Progress Rings */}
                      <div className="h-48 w-full grid grid-cols-2 gap-4 items-center justify-items-center select-none pt-2">
                        {CLIENT_SLA.map((client) => (
                          <div
                            key={client.name}
                            className="flex flex-col items-center gap-1 pointer-events-auto cursor-pointer group/item"
                            onMouseEnter={() => setHoveredClient(client)}
                            onMouseLeave={() => setHoveredClient(null)}
                          >
                            <div className="relative w-16 h-16 flex items-center justify-center">
                              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <path className="stroke-[#2A3140] opacity-40" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <motion.path
                                  initial={{ strokeDasharray: "0, 100" }}
                                  animate={{ strokeDasharray: `${client.strokeDash}, 100` }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                  className="stroke-[#3D5AFE] transition-colors duration-300 group-hover/item:stroke-[#00E5FF]"
                                  strokeWidth="3.5"
                                  strokeLinecap="round"
                                  fill="none"
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                              </svg>
                              <span className="absolute text-[8.5px] font-bold text-white font-mono">{client.value}</span>
                            </div>
                            <span className="text-[9px] font-sans font-bold text-[#8A92A0] group-hover/item:text-white transition-colors">
                              {client.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Interactive Info */}
                      <div className="h-6 text-center">
                        <AnimatePresence mode="wait">
                          {hoveredClient ? (
                            <motion.span
                              key="client-info"
                              initial={{ opacity: 0, y: 2 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -2 }}
                              className="text-[9px] font-mono text-[#00E5FF] font-bold"
                            >
                              {hoveredClient.name}: {hoveredClient.value} de Conformidade
                            </motion.span>
                          ) : (
                            <span className="text-[9px] font-mono text-steam">Mova o cursor sobre os anéis</span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Stats Info */}
          <div className="border-t border-[#2A3140]/30 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-steam leading-normal mt-6 gap-3 shrink-0 font-sans">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-cobalt-pure animate-spin [animation-duration:10s]" />
              <span>Atualização automática a cada 3s · Telemetria ativa às {currentTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-pure animate-ping"></span>
              <span className="font-mono text-emerald-pure font-bold">100% OPERACIONAL</span>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
