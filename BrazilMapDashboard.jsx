import React, { useState, useEffect, useMemo, useContext } from "react";
import { ComposableMap, Geographies, Geography, MapContext } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";

// 27 Brazilian State boundaries GeoJSON URL (highly stable & accurate)
const BRAZIL_GEOJSON_URL = "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";

// Hub City Data
const HUBS = [
  { id: "sp", name: "São Paulo", lat: -23.5505, lon: -46.6333, size: "large", color: "#3D5AFE", vehicles: 247, transit: 34 },
  { id: "rj", name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729, size: "large", color: "#3D5AFE", vehicles: 184, transit: 22 },
  { id: "bsb", name: "Brasília", lat: -15.7942, lon: -47.8822, size: "large", color: "#3D5AFE", vehicles: 125, transit: 18 },
  { id: "bh", name: "Belo Horizonte", lat: -19.9167, lon: -43.9345, size: "medium", color: "#3D5AFE", vehicles: 96, transit: 14 },
  { id: "ssa", name: "Salvador", lat: -12.9714, lon: -38.5014, size: "medium", color: "#3D5AFE", vehicles: 84, transit: 11 },
  { id: "cwb", name: "Curitiba", lat: -25.4284, lon: -49.2733, size: "medium", color: "#3D5AFE", vehicles: 92, transit: 15 },
  { id: "rec", name: "Recife", lat: -8.0476, lon: -34.8770, size: "medium", color: "#3D5AFE", vehicles: 76, transit: 9 },
  { id: "poa", name: "Porto Alegre", lat: -30.0346, lon: -51.2177, size: "medium", color: "#3D5AFE", vehicles: 88, transit: 13 },
  { id: "mao", name: "Manaus", lat: -3.1190, lon: -60.0217, size: "medium", color: "#3D5AFE", vehicles: 45, transit: 6 },
  { id: "for", name: "Fortaleza", lat: -3.7172, lon: -38.5433, size: "medium", color: "#3D5AFE", vehicles: 62, transit: 8 },
  { id: "gyn", name: "Goiânia", lat: -16.6869, lon: -49.2648, size: "small", color: "#3D5AFE", vehicles: 54, transit: 7 },
  { id: "cgb", name: "Cuiabá", lat: -15.6010, lon: -56.0974, size: "small", color: "#3D5AFE", vehicles: 48, transit: 5 },
  { id: "cgr", name: "Campo Grande", lat: -20.4697, lon: -54.6201, size: "small", color: "#3D5AFE", vehicles: 42, transit: 4 },
  { id: "vix", name: "Vitória", lat: -20.2976, lon: -40.2958, size: "small", color: "#3D5AFE", vehicles: 38, transit: 4 },
  { id: "fln", name: "Florianópolis", lat: -27.5954, lon: -48.5480, size: "small", color: "#3D5AFE", vehicles: 35, transit: 3 },
  { id: "aju", name: "Aracaju", lat: -10.9472, lon: -37.0731, size: "small", color: "#3D5AFE", vehicles: 28, transit: 2 },
  { id: "mcz", name: "Maceió", lat: -9.6658, lon: -35.7350, size: "small", color: "#3D5AFE", vehicles: 31, transit: 3 },
  { id: "jpa", name: "João Pessoa", lat: -7.1198, lon: -34.8450, size: "small", color: "#3D5AFE", vehicles: 33, transit: 3 },
  { id: "nat", name: "Natal", lat: -5.7945, lon: -35.2110, size: "small", color: "#3D5AFE", vehicles: 36, transit: 4 },
  { id: "slz", name: "São Luís", lat: -2.5307, lon: -44.3068, size: "small", color: "#3D5AFE", vehicles: 41, transit: 5 },
  { id: "the", name: "Teresina", lat: -5.0920, lon: -42.8034, size: "small", color: "#3D5AFE", vehicles: 34, transit: 4 },
  { id: "bel", name: "Belém", lat: -1.4557, lon: -48.4902, size: "small", color: "#3D5AFE", vehicles: 52, transit: 6 },
  { id: "pmw", name: "Palmas", lat: -10.1844, lon: -48.3336, size: "small", color: "#3D5AFE", vehicles: 29, transit: 3 },
  { id: "pvh", name: "Porto Velho", lat: -8.7612, lon: -63.9039, size: "small", color: "#3D5AFE", vehicles: 26, transit: 2 },
  { id: "rbr", name: "Rio Branco", lat: -9.9754, lon: -67.8106, size: "small", color: "#3D5AFE", vehicles: 22, transit: 2 },
  { id: "bvb", name: "Boa Vista", lat: 2.8235, lon: -60.6758, size: "small", color: "#3D5AFE", vehicles: 18, transit: 1 },
  { id: "mcp", name: "Macapá", lat: 0.0350, lon: -51.0700, size: "small", color: "#3D5AFE", vehicles: 19, transit: 1 }
];

// Logistics Corridors
const ROUTES = [
  // Região Sul
  { from: "poa", to: "fln", name: "Porto Alegre → Florianópolis", activeShipments: 12, eta: "6h" },
  { from: "fln", to: "cwb", name: "Florianópolis → Curitiba", activeShipments: 14, eta: "4h" },
  { from: "cwb", to: "sp", name: "Curitiba → São Paulo", activeShipments: 22, eta: "6h" },
  // Região Sudeste
  { from: "sp", to: "rj", name: "São Paulo → Rio de Janeiro", activeShipments: 28, eta: "6h" },
  { from: "sp", to: "bh", name: "São Paulo → Belo Horizonte", activeShipments: 20, eta: "8h" },
  { from: "rj", to: "bh", name: "Rio de Janeiro → Belo Horizonte", activeShipments: 15, eta: "7h" },
  { from: "rj", to: "vix", name: "Rio de Janeiro → Vitória", activeShipments: 11, eta: "8h" },
  { from: "vix", to: "bh", name: "Vitória → Belo Horizonte", activeShipments: 9, eta: "7h" },
  // Região Centro-Oeste
  { from: "bh", to: "bsb", name: "Belo Horizonte → Brasília", activeShipments: 18, eta: "11h" },
  { from: "sp", to: "cgr", name: "São Paulo → Campo Grande", activeShipments: 16, eta: "13h" },
  { from: "cgr", to: "cgb", name: "Campo Grande → Cuiabá", activeShipments: 10, eta: "10h" },
  { from: "gyn", to: "bsb", name: "Goiânia → Brasília", activeShipments: 19, eta: "3h" },
  { from: "gyn", to: "cgb", name: "Goiânia → Cuiabá", activeShipments: 8, eta: "12h" },
  { from: "bsb", to: "cgb", name: "Brasília → Cuiabá", activeShipments: 12, eta: "14h" },
  // Região Norte
  { from: "cgb", to: "pvh", name: "Cuiabá → Porto Velho", activeShipments: 7, eta: "22h" },
  { from: "pvh", to: "rbr", name: "Porto Velho → Rio Branco", activeShipments: 5, eta: "8h" },
  { from: "pvh", to: "mao", name: "Porto Velho → Manaus", activeShipments: 6, eta: "18h" },
  { from: "mao", to: "bvb", name: "Manaus → Boa Vista", activeShipments: 4, eta: "12h" },
  { from: "bel", to: "mcp", name: "Belém → Macapá", activeShipments: 3, eta: "24h" },
  { from: "bel", to: "pmw", name: "Belém → Palmas", activeShipments: 8, eta: "14h" },
  { from: "pmw", to: "bsb", name: "Palmas → Brasília", activeShipments: 9, eta: "12h" },
  // Região Nordeste
  { from: "bel", to: "slz", name: "Belém → São Luís", activeShipments: 11, eta: "14h" },
  { from: "slz", to: "the", name: "São Luís → Teresina", activeShipments: 8, eta: "6h" },
  { from: "the", to: "for", name: "Teresina → Fortaleza", activeShipments: 12, eta: "9h" },
  { from: "for", to: "nat", name: "Fortaleza → Natal", activeShipments: 15, eta: "8h" },
  { from: "nat", to: "jpa", name: "Natal → João Pessoa", activeShipments: 11, eta: "3h" },
  { from: "jpa", to: "rec", name: "João Pessoa → Recife", activeShipments: 19, eta: "2h" },
  { from: "rec", to: "mcz", name: "Recife → Maceió", activeShipments: 14, eta: "4h" },
  { from: "mcz", to: "aju", name: "Maceió → Aracaju", activeShipments: 10, eta: "4h" },
  { from: "aju", to: "ssa", name: "Aracaju → Salvador", activeShipments: 12, eta: "5h" },
  { from: "ssa", to: "vix", name: "Salvador → Vitória", activeShipments: 8, eta: "16h" },
  { from: "ssa", to: "bh", name: "Salvador → Belo Horizonte", activeShipments: 14, eta: "18h" }
];


/**
 * Main Interactive Map Dashboard Component
 */
export default function BrazilMapDashboard() {
  const [hoveredItem, setHoveredItem] = useState(null); // { title, type, details, x, y }
  const [geojson, setGeojson] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Monitor viewport size to adjust projection center and scale responsively
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch geojson on mount to perform point-in-polygon verification
  useEffect(() => {
    fetch(BRAZIL_GEOJSON_URL)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load map data");
        return res.json();
      })
      .then(data => setGeojson(data))
      .catch(err => console.error("Error loading map GeoJSON:", err));
  }, []);

  // Mouse move handler to position tooltip
  const handleMouseMove = (e, title, type, details) => {
    const bounds = e.currentTarget.closest("#map-container").getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    setHoveredItem({ title, type, details, x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      id="map-container"
      className="w-full max-w-[1150px] aspect-[900/680] max-h-[calc(100vh-140px)] md:max-h-[calc(100vh-160px)] lg:max-h-[calc(100vh-180px)] flex flex-col relative select-none mt-10 md:mt-0"
    >
      {/* SVG Canvas and geographic lines */}
      <div className="w-full h-full absolute inset-0 z-10">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: isMobile ? 1000 : 900,
            center: [isMobile ? -54.0 : -61.2, -15.13]
          }}
          width={900}
          height={680}
          className="w-full h-full transform transition-transform duration-300"
        >
          <Geographies geography={BRAZIL_GEOJSON_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1A1F26"
                  stroke="#2A3140"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "#1f252f" },
                    pressed: { outline: "none" }
                  }}
                />
              ))
            }
          </Geographies>
          
          <RoutesAndVehiclesLayer
            handleMouseMove={handleMouseMove}
            setHoveredItem={setHoveredItem}
            geojson={geojson}
          />
        </ComposableMap>
      </div>

      {/* ==================== CARD OVERLAYS ==================== */}

      {/* Bottom-Right Legend (Positioned completely outside the map in the corner to prevent overlapping) */}
      <div className="absolute bottom-4 left-4 sm:left-auto sm:right-4 z-20 bg-[#1A1F26]/75 border border-[#2A3140] backdrop-blur-md rounded-xl p-3 flex flex-col gap-2.5 text-[11px] text-[#8A92A0] shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3D5AFE] shadow-[0_0_6px_rgba(61,90,254,0.6)]"></span>
          <span>Veículo ativo</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFB020] shadow-[0_0_6px_rgba(255,176,32,0.6)]"></span>
          <span>Em exceção</span>
        </div>
      </div>

      {/* Floating Hover Tooltip */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              left: hoveredItem.x,
              top: hoveredItem.y,
              transform: "translate(-50%, -100%)",
              marginTop: "-12px",
              zIndex: 50
            }}
            className="pointer-events-none bg-[#1A1F26]/95 border border-[#2A3140] backdrop-blur-md rounded-xl px-4 py-3 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)] w-60"
          >
            <div className="text-xs font-bold text-[#F5F5F2] mb-1">{hoveredItem.title}</div>
            <div className="text-[9px] text-[#8A92A0] uppercase tracking-wider font-semibold mb-2">{hoveredItem.type}</div>
            <div className="text-[11px] text-[#8A92A0] leading-relaxed border-t border-[#2A3140]/40 pt-2 font-sans">
              {hoveredItem.details}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Embedded CSS Flicker keyframe for React */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes subtle-flicker {
          0%, 100% { opacity: 1; }
          90% { opacity: 1; }
          91% { opacity: 0.7; }
          92% { opacity: 1; }
          94% { opacity: 0.85; }
          95% { opacity: 1; }
        }
      `}} />
    </motion.div>
  );
}

/**
 * Geographic projection drawing layer.
 * Resolves projection context from parent ComposableMap to position nodes perfectly.
 */
function RoutesAndVehiclesLayer({ handleMouseMove, setHoveredItem, geojson }) {
  const { projection } = useContext(MapContext);

  // Ray-casting point-in-polygon checks to filter out-of-bounds coords
  function isPointInPolygon(point, vs) {
    const x = point[0], y = point[1];
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      const xi = vs[i][0], yi = vs[i][1];
      const xj = vs[j][0], yj = vs[j][1];
      const intersect = ((yi > y) !== (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  function isInsideBrazil(lon, lat) {
    if (!geojson || !geojson.features) return false; // fallback
    const point = [lon, lat];
    return geojson.features.some(feature => {
      if (!feature.geometry) return false;
      const { type, coordinates } = feature.geometry;
      if (type === "Polygon") {
        if (isPointInPolygon(point, coordinates[0])) {
          for (let i = 1; i < coordinates.length; i++) {
            if (isPointInPolygon(point, coordinates[i])) return false;
          }
          return true;
        }
      } else if (type === "MultiPolygon") {
        for (let i = 0; i < coordinates.length; i++) {
          const polyCoords = coordinates[i];
          if (isPointInPolygon(point, polyCoords[0])) {
            let inHole = false;
            for (let j = 1; j < polyCoords.length; j++) {
              if (isPointInPolygon(point, polyCoords[j])) {
                inHole = true;
                break;
              }
            }
            if (!inHole) return true;
          }
        }
      }
      return false;
    });
  }

  // 1. Generate and memoize scattered active vehicle coordinates realistically
  const memoizedVehicles = useMemo(() => {
    if (!projection || !geojson) return [];
    
    const points = [];
    const totalVehicles = 100;
    
    const regions = [
      { name: "Sudeste", weight: 0.50, lat: [-25.0, -16.0], lon: [-49.0, -40.0] },
      { name: "Sul", weight: 0.20, lat: [-32.0, -25.0], lon: [-54.0, -48.0] },
      { name: "NordesteLitoral", weight: 0.15, lat: [-18.0, -3.5], lon: [-40.0, -34.8] },
      { name: "CentroOeste", weight: 0.10, lat: [-22.0, -12.0], lon: [-56.0, -46.0] },
      { name: "Norte", weight: 0.05, lat: [-10.0, 1.0], lon: [-68.0, -48.0] }
    ];

    regions.forEach(reg => {
      const count = Math.round(totalVehicles * reg.weight);
      let generated = 0;
      let attempts = 0;
      while (generated < count && attempts < 1000) {
        attempts++;
        const lat = Math.random() * (reg.lat[1] - reg.lat[0]) + reg.lat[0];
        const lon = Math.random() * (reg.lon[1] - reg.lon[0]) + reg.lon[0];
        
        if (isInsideBrazil(lon, lat)) {
          const coord = projection([lon, lat]);
          if (coord && !isNaN(coord[0]) && !isNaN(coord[1]) && coord[0] !== 0 && coord[1] !== 0) {
            const [x, y] = coord;
            const isException = Math.random() < 0.15;
            points.push({
              id: `vehicle-${reg.name}-${generated}-${attempts}`,
              x,
              y,
              isException,
              pulseDuration: Math.random() * (3.2 - 1.8) + 1.8,
              delay: Math.random() * 1.2
            });
            generated++;
          }
        }
      }
    });

    return points;
  }, [projection, geojson]);

  if (!projection) return null;

  return (
    <g>
      {/* Glow Def Filters */}
      <defs>
        <filter id="glow-cobalt" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="glow-amber" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 2. ACTIVE ROUTE LINES */}
      {ROUTES.map((route, idx) => {
        const fromHub = HUBS.find(h => h.id === route.from);
        const toHub = HUBS.find(h => h.id === route.to);
        if (!fromHub || !toHub) return null;

        const p1 = projection([fromHub.lon, fromHub.lat]);
        const p2 = projection([toHub.lon, toHub.lat]);
        if (!p1 || !p2 || isNaN(p1[0]) || isNaN(p1[1]) || isNaN(p2[0]) || isNaN(p2[1]) || (p1[0] === 0 && p1[1] === 0) || (p2[0] === 0 && p2[1] === 0)) return null;

        const [x1, y1] = p1;
        const [x2, y2] = p2;

        // Bezier math logic to draw curved corridors
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.sqrt(dx * dx + dy * dy);
        const px = -dy / len;
        const py = dx / len;
        const offset = len * 0.15;
        const cx = mx + px * offset;
        const cy = my + py * offset;

        const bezierPath = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;

        return (
          <g key={route.name} className="route-layer-group">
            {/* Draw Path */}
            <motion.path
              d={bezierPath}
              fill="none"
              stroke="#FFB020"
              strokeWidth={1.5}
              opacity={0.6}
              strokeDasharray="6, 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{
                pathLength: { delay: idx * 0.15, duration: 1.4, ease: "easeOut" },
                opacity: { delay: idx * 0.15, duration: 0.6 }
              }}
              style={{
                strokeDashoffset: 0,
                // Direct CSS animation style for dash offset flow in JSX
                animation: "dash-flow 4s linear infinite"
              }}
              id={`path-${route.from}-${route.to}`}
            />

            {/* Invisible thicker stroke representing mouse trigger boundary for precision hovering */}
            <path
              d={bezierPath}
              fill="none"
              stroke="transparent"
              strokeWidth={12}
              className="cursor-pointer"
              onMouseEnter={(e) => {
                const visiblePath = document.getElementById(`path-${route.from}-${route.to}`);
                if (visiblePath) {
                  visiblePath.setAttribute("stroke-width", "2.5px");
                  visiblePath.setAttribute("opacity", "1");
                }
                handleMouseMove(e, route.name, "Corredor Logístico", `${route.activeShipments} embarques ativos · ETA médio ${route.eta}`);
              }}
              onMouseMove={(e) => handleMouseMove(e, route.name, "Corredor Logístico", `${route.activeShipments} embarques ativos · ETA médio ${route.eta}`)}
              onMouseLeave={() => {
                const visiblePath = document.getElementById(`path-${route.from}-${route.to}`);
                if (visiblePath) {
                  visiblePath.setAttribute("stroke-width", "1.5");
                  visiblePath.setAttribute("opacity", "0.6");
                }
                setHoveredItem(null);
              }}
            />

            {/* Transit Amber Dot travelling along route */}
            <g>
              <circle r={3.8} fill="#FFB020" filter="url(#glow-amber)">
                {/* SVG native GPU acceleration for linear animation along bezier corridor */}
                <animateMotion
                  path={bezierPath}
                  dur="8s"
                  repeatCount="indefinite"
                  begin={`${idx * 0.4}s`}
                />
              </circle>
            </g>
          </g>
        );
      })}

      {/* 3. ACTIVE VEHICLES POINT PLOT */}
      {memoizedVehicles.map((vh) => (
        <motion.circle
          key={vh.id}
          cx={vh.x}
          cy={vh.y}
          r={vh.isException ? 4.2 : 2.5}
          fill={vh.isException ? "#FFB020" : "#3D5AFE"}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: vh.isException ? 0.95 : 0.70, scale: 1 }}
          transition={{
            delay: vh.delay,
            duration: 0.6,
            ease: "easeOut"
          }}
          style={{
            transformOrigin: `${vh.x}px ${vh.y}px`,
            animation: `pulse-vh ${vh.pulseDuration}s ease-in-out ${vh.delay}s infinite alternate`
          }}
        />
      ))}



      {/* Embedded Dynamic Keyframe Animations for JSX */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-ring-scale {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes pulse-vh {
          0% { transform: scale(1); opacity: 0.65; }
          100% { transform: scale(1.3); opacity: 1; }
        }
        @keyframes dash-flow {
          to {
            stroke-dashoffset: -20;
          }
        }
      `}} />
    </g>
  );
}
