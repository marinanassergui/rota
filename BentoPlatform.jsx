import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Truck,
  Package,
  Navigation,
  BarChart3,
  Code2,
  Play,
  Check,
  Info
} from "lucide-react";

// Shipments for Torre de Controle
const SHIPMENTS = [
  {
    id: "ROTA-9041",
    route: "sp-rj",
    path: "M 70,160 Q 185,140 250,130",
    eta: "14:32",
    sla: "98%",
    desc: "São Paulo ➔ Rio de Janeiro",
    status: "EM TRÂNSITO",
    progress: "w-3/4",
    statusStyle: "bg-[#3D5AFE]/15 text-[#3D5AFE] border-[#3D5AFE]/10",
    barStyle: "bg-[#3D5AFE]"
  },
  {
    id: "ROTA-9042",
    route: "rj-bh",
    path: "M 250,130 Q 215,85 160,65",
    eta: "18:15",
    sla: "88%",
    desc: "Rio de Janeiro ➔ B. Horizonte",
    status: "ATRASADO",
    progress: "w-1/3",
    statusStyle: "bg-amber-pure/15 text-amber-pure border-amber-pure/10",
    barStyle: "bg-amber-pure"
  },
  {
    id: "ROTA-9043",
    route: "sp-bh",
    path: "M 70,160 Q 115,100 160,65",
    eta: "Amanhã",
    sla: "100%",
    desc: "São Paulo ➔ B. Horizonte",
    status: "PLANEJADO",
    progress: "w-1/12",
    statusStyle: "bg-[#2A3140] text-[#8A92A0] border-[#8A92A0]/10",
    barStyle: "bg-[#2A3140]"
  },
  {
    id: "ROTA-9044",
    route: "bh-sp",
    path: "M 160,65 Q 105,120 70,160",
    eta: "Entregue",
    sla: "99%",
    desc: "B. Horizonte ➔ São Paulo",
    status: "ENTREGUE",
    progress: "w-full",
    statusStyle: "bg-emerald-pure/15 text-emerald-pure border-emerald-pure/10",
    barStyle: "bg-emerald-pure"
  }
];

// Pallet data for WMS
const WMS_PALLETS = [
  { loc: "A-101", sku: "ROT-412-A", qty: 48, occupied: true },
  { loc: "A-102", occupied: false },
  { loc: "A-103", sku: "ROT-561-X", qty: 120, occupied: true },
  { loc: "A-104", sku: "ROT-987-AB", qty: 140, occupied: true },
  { loc: "A-105", occupied: false },
  { loc: "A-106", sku: "ROT-204-M", qty: 72, occupied: true },

  { loc: "B-201", sku: "ROT-118-D", qty: 90, occupied: true },
  { loc: "B-202", sku: "ROT-915-C", qty: 32, occupied: true },
  { loc: "B-203", occupied: false },
  { loc: "B-204", sku: "ROT-884-Z", qty: 110, occupied: true },
  { loc: "B-205", sku: "ROT-319-Y", qty: 64, occupied: true },
  { loc: "B-206", occupied: false },

  { loc: "C-301", occupied: false },
  { loc: "C-302", sku: "ROT-281-W", qty: 45, occupied: true },
  { loc: "C-303", sku: "ROT-704-B", qty: 88, occupied: true },
  { loc: "C-304", sku: "ROT-561-X", qty: 150, occupied: true },
  { loc: "C-305", occupied: false },
  { loc: "C-306", sku: "ROT-109-A", qty: 15, occupied: true },

  { loc: "D-401", sku: "ROT-319-Y", qty: 95, occupied: true },
  { loc: "D-402", occupied: false },
  { loc: "D-403", occupied: false },
  { loc: "D-404", sku: "ROT-884-Z", qty: 200, occupied: true },
  { loc: "D-405", sku: "ROT-412-A", qty: 55, occupied: true },
  { loc: "D-406", occupied: false }
];

// Weekly SLA for Analytics
const WEEKLY_SLA = [
  { day: "Segunda", sla: "94.2%", height: 38, x: 40 },
  { day: "Terça", sla: "98.5%", height: 54, x: 78 },
  { day: "Quarta", sla: "97.1%", height: 50, x: 116 },
  { day: "Quinta", sla: "99.4%", height: 58, x: 154 },
  { day: "Sexta", sla: "95.8%", height: 42, x: 192 }
];

export default function BentoPlatform() {
  // 1. Torre de Controle State
  const [selectedShipment, setSelectedShipment] = useState(SHIPMENTS[0]);

  // 2. WMS State
  const [hoveredWmsPallet, setHoveredWmsPallet] = useState(null);

  // 3. Analytics State
  const [hoveredSla, setHoveredSla] = useState(null);

  // 4. API & Integrações State
  const [apiStatus, setApiStatus] = useState("idle"); // idle | loading | success
  const [apiResponse, setApiResponse] = useState("// Clique em Executar para testar");

  const handleExecuteApi = () => {
    if (apiStatus === "loading") return;
    setApiStatus("loading");
    setApiResponse("> Enviando requisição para API Rota...");

    setTimeout(() => {
      setApiStatus("success");
      setApiResponse(
        `> 200 OK (Despachado)\n{\n  "status": "success",\n  "dispatch_id": "DISP-99238",\n  "sent_to_carrier": true,\n  "timestamp": "2026-05-22T12:43:19Z"\n}`
      );
    }, 750);
  };

  return (
    <section className="w-full bg-transparent text-chalk pt-[100px] pb-[100px] relative z-10 overflow-x-hidden shrink-0">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D5AFE]/10 border border-[#3D5AFE]/20 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#3D5AFE] animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#3D5AFE] font-sans">A PLATAFORMA</span>
          </motion.div>
          
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl sm:text-3xl lg:text-[48px] whitespace-nowrap leading-[1.2] font-bold tracking-tight font-display text-white mb-4"
          >
            Cinco módulos. Uma fonte de verdade.
          </motion.h2>
          
          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base text-steam leading-relaxed font-sans text-balance"
          >
            Orquestração ponta a ponta que unifica sua operação<br className="hidden md:inline" /> e elimina o caos de sistemas fragmentados.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
          
          {/* Card 1: Torre de Controle (2x2) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-2 row-span-2 md:row-span-2 flex flex-col justify-between p-6 rounded-2xl bg-[#0F1419] border border-[#8A92A0]/10 hover:border-[#3D5AFE]/30 transition-all duration-500 relative group overflow-hidden shadow-xl"
          >
            {/* Background cobalt glow effect on card hover */}
            <div className="absolute -inset-px bg-gradient-to-br from-[#3D5AFE]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none z-0" />

            {/* Top Info */}
            <div className="flex items-center justify-between mb-4 z-10">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#3D5AFE]/10 flex items-center justify-center border border-[#3D5AFE]/20 text-[#3D5AFE]">
                  <Eye className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-display font-bold text-white text-base leading-none">Torre de Controle</h3>
                  <p class="text-[11px] text-steam font-sans mt-1">Status de embarques ao vivo</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-pure/15 border border-emerald-pure/20 text-[10px] text-emerald-pure font-bold font-sans">
                <span className="w-1 h-1 rounded-full bg-emerald-pure animate-pulse"></span>
                <span>4 ATIVOS</span>
              </div>
            </div>

            {/* Main Interactive Panel */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-5 min-h-0 z-10 mb-4">
              
              {/* Map View (Left) */}
              <div className="md:col-span-7 bg-[#1A1F26]/60 border border-[#8A92A0]/10 rounded-xl relative overflow-hidden flex items-center justify-center p-2 min-h-[200px]">
                {/* SVG Map */}
                <svg className="w-full h-full max-h-[220px]" viewBox="0 0 320 220">
                  <defs>
                    <filter id="glow-cobalt-bento-react" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  
                  {/* Connection paths */}
                  <path d="M 70,160 Q 185,140 250,130" fill="none" stroke="rgba(138, 146, 160, 0.15)" strokeWidth="1.5" />
                  <path d="M 250,130 Q 215,85 160,65" fill="none" stroke="rgba(138, 146, 160, 0.15)" strokeWidth="1.5" />
                  <path d="M 70,160 Q 115,100 160,65" fill="none" stroke="rgba(138, 146, 160, 0.15)" strokeWidth="1.5" />
                  <path d="M 160,65 Q 105,120 70,160" fill="none" stroke="rgba(138, 146, 160, 0.15)" strokeWidth="1.5" />
                  
                  {/* Active highlighting path */}
                  <path
                    d={selectedShipment.path}
                    fill="none"
                    stroke="#3D5AFE"
                    strokeWidth="2.5"
                    filter="url(#glow-cobalt-bento-react)"
                    strokeDasharray="6,4"
                    className="transition-all duration-300"
                  />
                  
                  {/* Hubs / Cities */}
                  {/* SP (70, 160) */}
                  <g className="cursor-pointer">
                    <circle cx="70" cy="160" r="8" fill="#3D5AFE" className="opacity-20 animate-ping" />
                    <circle cx="70" cy="160" r="4" fill="#3D5AFE" />
                    <text x="70" y="178" fontSize="9" fontFamily="sans-serif" fontWeight="bold" fill="#8A92A0" textAnchor="middle">São Paulo</text>
                  </g>
                  {/* RJ (250, 130) */}
                  <g className="cursor-pointer">
                    <circle cx="250" cy="130" r="8" fill="#3D5AFE" className="opacity-20 animate-ping" />
                    <circle cx="250" cy="130" r="4" fill="#3D5AFE" />
                    <text x="250" y="148" fontSize="9" fontFamily="sans-serif" fontWeight="bold" fill="#8A92A0" textAnchor="middle">Rio de Janeiro</text>
                  </g>
                  {/* BH (160, 65) */}
                  <g className="cursor-pointer">
                    <circle cx="160" cy="65" r="8" fill="#3D5AFE" className="opacity-20 animate-ping" />
                    <circle cx="160" cy="65" r="4" fill="#3D5AFE" />
                    <text x="160" y="50" fontSize="9" fontFamily="sans-serif" fontWeight="bold" fill="#8A92A0" textAnchor="middle">B. Horizonte</text>
                  </g>

                  {/* Animated Vehicle Dot (Using a dynamic React key triggers perfect animateMotion remounts) */}
                  <circle key={selectedShipment.id} r="4.5" fill="#00E5FF" filter="url(#glow-cobalt-bento-react)">
                    <animateMotion dur="4s" repeatCount="indefinite" path={selectedShipment.path} rotate="auto" />
                  </circle>
                </svg>
                
                {/* Floating HUD Overlay */}
                <div className="absolute bottom-3 left-3 bg-[#0F1419]/90 border border-[#8A92A0]/10 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-[9px] font-mono text-steam pointer-events-none select-none flex flex-col gap-0.5">
                  <div className="text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3D5AFE] animate-pulse"></span>
                    <span>{selectedShipment.id}</span>
                  </div>
                  <div className="mt-0.5 text-white">{selectedShipment.desc}</div>
                  <div>ETA: {selectedShipment.eta} · SLA: {selectedShipment.sla}</div>
                </div>
              </div>

              {/* Shipment List (Right) */}
              <div className="md:col-span-5 flex flex-col h-full overflow-hidden">
                <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2 max-h-[220px] md:max-h-none scrollbar-thin">
                  {SHIPMENTS.map((shipment) => {
                    const isActive = selectedShipment.id === shipment.id;
                    return (
                      <div
                        key={shipment.id}
                        onClick={() => setSelectedShipment(shipment)}
                        className={`p-2.5 rounded-lg border cursor-pointer transition-all duration-300 flex flex-col gap-1.5 ${
                          isActive
                            ? "border-[#3D5AFE] bg-[#3D5AFE]/5"
                            : "border-[#8A92A0]/10 bg-[#0F1419] hover:border-[#3D5AFE]/30"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-white">{shipment.id}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase ${shipment.statusStyle}`}>
                            {shipment.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-steam">
                          <span>{shipment.route.toUpperCase().replace("-", " ➔ ")}</span>
                          <span className={isActive ? "font-bold text-white" : "font-bold text-steam"}>
                            SLA {shipment.sla}
                          </span>
                        </div>
                        <div className="w-full bg-[#1A1F26] h-1 rounded-full overflow-hidden">
                          <div className={`h-full ${shipment.barStyle} rounded-full ${shipment.progress} transition-all duration-500`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Bottom Text Label */}
            <div className="border-t border-[#2A3140]/30 pt-3 flex items-center gap-2.5 z-10 text-[13px] text-steam leading-relaxed">
              <Info className="w-4 h-4 text-[#3D5AFE] shrink-0" />
              <span>Visibilidade end-to-end de todo embarque, em tempo real, em qualquer dispositivo.</span>
            </div>
          </motion.div>

          {/* Card 2: TMS (1x1) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col justify-between p-5 rounded-2xl bg-[#0F1419] border border-[#8A92A0]/10 hover:border-[#3D5AFE]/30 transition-all duration-500 relative group overflow-hidden shadow-xl"
          >
            {/* Glow overlay */}
            <div className="absolute -inset-px bg-gradient-to-br from-[#3D5AFE]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none z-0" />
            
            {/* Header */}
            <div className="flex items-center gap-3 z-10">
              <span className="w-7 h-7 rounded-lg bg-[#3D5AFE]/10 flex items-center justify-center border border-[#3D5AFE]/20 text-[#3D5AFE]">
                <Truck className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-display font-bold text-white text-sm">TMS</h3>
                <p className="text-[9px] text-steam uppercase tracking-wider font-sans">Gestão de fretes</p>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center my-3 min-h-0 z-10">
              <div className="w-full bg-[#1A1F26]/60 border border-[#8A92A0]/10 rounded-lg overflow-hidden text-[10px]">
                <div className="grid grid-cols-3 bg-[#0F1419]/80 border-b border-[#8A92A0]/10 px-2 py-1 text-steam font-bold uppercase tracking-wider">
                  <div>Rota</div>
                  <div>Parceiro</div>
                  <div className="text-right">Frete</div>
                </div>
                <div className="flex flex-col divide-y divide-[#8A92A0]/10">
                  <div className="grid grid-cols-3 px-2 py-1.5 text-white hover:bg-[#3D5AFE]/5 transition-colors cursor-pointer items-center">
                    <div className="font-medium font-mono">SP ➔ RJ</div>
                    <div className="text-steam truncate">Mercúrio Log</div>
                    <div className="text-right font-bold text-emerald-pure flex items-center justify-end gap-1">
                      <span>R$ 1.850</span>
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 px-2 py-1.5 text-white hover:bg-[#3D5AFE]/5 transition-colors cursor-pointer items-center">
                    <div className="font-medium font-mono">RJ ➔ BH</div>
                    <div className="text-steam truncate">TransSul</div>
                    <div className="text-right font-bold text-emerald-pure flex items-center justify-end gap-1">
                      <span>R$ 2.100</span>
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 px-2 py-1.5 text-white hover:bg-[#3D5AFE]/5 transition-colors cursor-pointer items-center">
                    <div className="font-medium font-mono">SP ➔ BH</div>
                    <div className="text-steam truncate">Expresso BR</div>
                    <div className="text-right font-bold text-emerald-pure flex items-center justify-end gap-1">
                      <span>R$ 1.950</span>
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <p className="text-[11px] text-steam leading-normal border-t border-[#2A3140]/30 pt-2 shrink-0 z-10">
              Gestão de transportes: contratação, monitoramento, auditoria de frete.
            </p>
          </motion.div>

          {/* Card 3: WMS (1x1) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-between p-5 rounded-2xl bg-[#0F1419] border border-[#8A92A0]/10 hover:border-[#3D5AFE]/30 transition-all duration-500 relative group overflow-hidden shadow-xl"
          >
            {/* Glow overlay */}
            <div className="absolute -inset-px bg-gradient-to-br from-[#3D5AFE]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none z-0" />

            {/* Header */}
            <div className="flex items-center gap-3 z-10">
              <span className="w-7 h-7 rounded-lg bg-[#3D5AFE]/10 flex items-center justify-center border border-[#3D5AFE]/20 text-[#3D5AFE]">
                <Package className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-display font-bold text-white text-sm">WMS</h3>
                <p className="text-[9px] text-steam uppercase tracking-wider font-sans">Armazenagem</p>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center my-3 min-h-0 z-10">
              <div className="grid grid-cols-6 gap-2 max-w-[220px] mx-auto">
                {WMS_PALLETS.map((pallet, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredWmsPallet(pallet)}
                    onMouseLeave={() => setHoveredWmsPallet(null)}
                    className={`w-[18px] h-[18px] rounded transition-colors cursor-pointer ${
                      pallet.occupied
                        ? "bg-[#3D5AFE] hover:bg-[#00E5FF]"
                        : "bg-[#2A3140]/60 hover:bg-[#2A3140]"
                    }`}
                  />
                ))}
              </div>
              
              {/* Interactive SKU Hover Panel */}
              <div className="mt-3 text-center h-4 flex items-center justify-center">
                <span className="text-[9px] font-mono text-steam">
                  {hoveredWmsPallet ? (
                    hoveredWmsPallet.occupied ? (
                      <span className="text-[#00E5FF] font-semibold">
                        Posição {hoveredWmsPallet.loc}: {hoveredWmsPallet.sku} (Qtd: {hoveredWmsPallet.qty})
                      </span>
                    ) : (
                      <span>Posição {hoveredWmsPallet.loc}: Livre</span>
                    )
                  ) : (
                    "Inspecione posições para ver o inventário"
                  )}
                </span>
              </div>
            </div>

            {/* Footer */}
            <p className="text-[11px] text-steam leading-normal border-t border-[#2A3140]/30 pt-2 shrink-0 z-10">
              Operação de armazém: recebimento, picking, expedição, inventário cíclico.
            </p>
          </motion.div>

          {/* Card 4: Roteirização (1x1) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col justify-between p-5 rounded-2xl bg-[#0F1419] border border-[#8A92A0]/10 hover:border-[#3D5AFE]/30 transition-all duration-500 relative group overflow-hidden shadow-xl"
          >
            {/* Glow overlay */}
            <div className="absolute -inset-px bg-gradient-to-br from-[#3D5AFE]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none z-0" />

            {/* Header */}
            <div className="flex items-center gap-3 z-10">
              <span className="w-7 h-7 rounded-lg bg-[#3D5AFE]/10 flex items-center justify-center border border-[#3D5AFE]/20 text-[#3D5AFE]">
                <Navigation className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-display font-bold text-white text-sm">Roteirização</h3>
                <p className="text-[9px] text-steam uppercase tracking-wider font-sans">Rotas Otimizadas</p>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center my-2 min-h-0 relative z-10">
              <svg className="w-full h-full max-h-[110px]" viewBox="0 0 240 100">
                {/* Traditional route in red/amber dashed */}
                <path d="M 30,50 L 80,15 L 160,85 L 210,50" fill="none" stroke="rgba(255, 176, 32, 0.25)" strokeWidth="1.5" strokeDasharray="3,3" />
                <text x="120" y="25" fontSize="8" fontFamily="sans-serif" fill="#FFB020" className="opacity-50">Rota Tradicional: 420km</text>

                {/* Optimized Rota Path */}
                <path id="optimized-route-line-react" d="M 30,50 Q 120,50 210,50" fill="none" stroke="#3D5AFE" strokeWidth="2.5" />
                
                {/* Vehicle dot animating */}
                <circle r="4" fill="#00E5FF">
                  <animateMotion dur="3s" repeatCount="indefinite" path="M 30,50 Q 120,50 210,50" rotate="auto" />
                </circle>

                {/* Start / End Nodes */}
                <circle cx="30" cy="50" r="4" fill="#3D5AFE" />
                <text x="30" y="62" fontSize="7" fontFamily="sans-serif" fontWeight="bold" fill="#8A92A0" textAnchor="middle">Origem</text>

                <circle cx="210" cy="50" r="4" fill="#3D5AFE" />
                <text x="210" y="62" fontSize="7" fontFamily="sans-serif" fontWeight="bold" fill="#8A92A0" textAnchor="middle">Destino</text>
              </svg>

              {/* HUD tag */}
              <div className="absolute top-1 right-1 bg-emerald-pure/10 border border-emerald-pure/20 rounded px-1.5 py-0.5 text-[8px] font-mono text-emerald-pure font-bold">
                -18% DISTÂNCIA
              </div>
            </div>

            {/* Footer */}
            <p className="text-[11px] text-steam leading-normal border-t border-[#2A3140]/30 pt-2 shrink-0 z-10">
              Otimização de rotas com IA e restrições reais.
            </p>
          </motion.div>

          {/* Card 5: Analytics (1x1) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-between p-5 rounded-2xl bg-[#0F1419] border border-[#8A92A0]/10 hover:border-[#3D5AFE]/30 transition-all duration-500 relative group overflow-hidden shadow-xl"
          >
            {/* Glow overlay */}
            <div className="absolute -inset-px bg-gradient-to-br from-[#3D5AFE]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none z-0" />

            {/* Header */}
            <div className="flex items-center gap-3 z-10">
              <span className="w-7 h-7 rounded-lg bg-[#3D5AFE]/10 flex items-center justify-center border border-[#3D5AFE]/20 text-[#3D5AFE]">
                <BarChart3 className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-display font-bold text-white text-sm">Analytics</h3>
                <p className="text-[9px] text-steam uppercase tracking-wider font-sans">Métricas e SLAs</p>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center my-2 min-h-0 z-10">
              <svg className="w-full h-full max-h-[110px]" viewBox="0 0 240 100">
                <line x1="25" y1="20" x2="230" y2="20" stroke="rgba(138, 146, 160, 0.08)" strokeWidth="1" />
                <line x1="25" y1="50" x2="230" y2="50" stroke="rgba(138, 146, 160, 0.08)" strokeWidth="1" />
                <line x1="25" y1="80" x2="230" y2="80" stroke="rgba(138, 146, 160, 0.08)" strokeWidth="1" />
                
                <line x1="25" y1="40" x2="230" y2="40" stroke="rgba(255, 176, 32, 0.3)" strokeWidth="1" strokeDasharray="2,2" />
                <text x="230" y="36" fontSize="6" fontFamily="sans-serif" fontWeight="bold" fill="#FFB020" textAnchor="end">Meta 95%</text>

                {/* Weekly Bars */}
                {WEEKLY_SLA.map((bar, index) => (
                  <rect
                    key={index}
                    x={bar.x}
                    y={80 - bar.height}
                    width="18"
                    height={bar.height}
                    rx="2"
                    className="cursor-pointer transition-all duration-300 fill-[#3D5AFE]/70 hover:fill-[#3D5AFE]"
                    onMouseEnter={() => setHoveredSla(bar)}
                    onMouseLeave={() => setHoveredSla(null)}
                  />
                ))}

                {/* X Axis Labels */}
                <text x="49" y="92" fontSize="7" fontFamily="sans-serif" fill="#8A92A0" textAnchor="middle">S</text>
                <text x="87" y="92" fontSize="7" fontFamily="sans-serif" fill="#8A92A0" textAnchor="middle">T</text>
                <text x="125" y="92" fontSize="7" fontFamily="sans-serif" fill="#8A92A0" textAnchor="middle">Q</text>
                <text x="163" y="92" fontSize="7" fontFamily="sans-serif" fill="#8A92A0" textAnchor="middle">Q</text>
                <text x="201" y="92" fontSize="7" fontFamily="sans-serif" fill="#8A92A0" textAnchor="middle">S</text>
              </svg>
              
              {/* Interactive Tooltip Line */}
              <div className="mt-2 text-center h-3 flex items-center justify-center">
                <span className="text-[9px] font-mono text-steam">
                  {hoveredSla ? (
                    <span className="text-[#00E5FF] font-semibold">
                      {hoveredSla.day}: SLA {hoveredSla.sla}
                    </span>
                  ) : (
                    "Passe o mouse nas barras para ver detalhes"
                  )}
                </span>
              </div>
            </div>

            {/* Footer */}
            <p className="text-[11px] text-steam leading-normal border-t border-[#2A3140]/30 pt-2 shrink-0 z-10">
              Indicadores operacionais, financeiros e de SLA.
            </p>
          </motion.div>

          {/* Card 6: API & Integrações (1x1) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col justify-between p-5 rounded-2xl bg-[#0F1419] border border-[#8A92A0]/10 hover:border-[#3D5AFE]/30 transition-all duration-500 relative group overflow-hidden shadow-xl"
          >
            {/* Glow overlay */}
            <div className="absolute -inset-px bg-gradient-to-br from-[#3D5AFE]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none z-0" />

            {/* Header */}
            <div className="flex items-center gap-3 z-10">
              <span className="w-7 h-7 rounded-lg bg-[#3D5AFE]/10 flex items-center justify-center border border-[#3D5AFE]/20 text-[#3D5AFE]">
                <Code2 className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-display font-bold text-white text-sm">API & Integrações</h3>
                <p className="text-[9px] text-steam uppercase tracking-wider font-sans">Mono / SDK Developer</p>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col my-3 min-h-0 bg-[#070A0D] rounded-lg border border-[#8A92A0]/10 overflow-hidden font-mono text-[9px] z-10">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#0C1014] border-b border-[#8A92A0]/10 shrink-0">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-pure/50"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-pure/50"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-pure/50"></span>
                </div>
                <button
                  onClick={handleExecuteApi}
                  disabled={apiStatus === "loading"}
                  className={`flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#3D5AFE] text-white text-[8px] font-bold hover:bg-[#3D5AFE]/80 transition-all uppercase cursor-pointer ${
                    apiStatus === "loading" ? "opacity-55 pointer-events-none" : ""
                  }`}
                >
                  {apiStatus === "loading" ? (
                    <>
                      <span className="w-2 h-2 rounded-full border border-t-transparent border-white animate-spin shrink-0"></span>
                      <span>Executando...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-2.5 h-2.5 fill-white" />
                      <span>Executar</span>
                    </>
                  )}
                </button>
              </div>
              
              {/* Terminal Body */}
              <div className="p-2 flex flex-col gap-1.5 overflow-y-auto flex-1 leading-normal select-text scrollbar-thin">
                {/* Code snippet */}
                <div className="text-[#8A92A0] whitespace-pre-wrap">
                  <span className="text-[#3D5AFE]">const</span> rota ={" "}
                  <span className="text-[#3D5AFE]">new</span>{" "}
                  <span className="text-emerald-pure">RotaClient</span>();
                  {"\n"}
                  <span className="text-[#3D5AFE]">await</span> rota.
                  <span className="text-amber-pure">dispatch</span>({`{`}
                  {"\n  "}id: <span className="text-[#00E5FF]">"SHP-8920"</span>,
                  {"\n  "}carrier: <span className="text-[#00E5FF]">"Mercúrio"</span>
                  {"\n"}{`});`}
                </div>
                
                {/* Output console line */}
                <div className={`border-t border-[#8A92A0]/10 pt-1.5 mt-1 text-[8px] leading-relaxed whitespace-pre font-semibold ${
                  apiStatus === "loading"
                    ? "text-[#3D5AFE] animate-pulse"
                    : apiStatus === "success"
                    ? "text-emerald-pure"
                    : "text-steam"
                }`}>
                  {apiResponse}
                </div>
              </div>
            </div>

            {/* Footer */}
            <p className="text-[11px] text-steam leading-normal border-t border-[#2A3140]/30 pt-2 shrink-0 z-10">
              Conecte com qualquer ERP, TMS ou sistema legado via API Rest.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
