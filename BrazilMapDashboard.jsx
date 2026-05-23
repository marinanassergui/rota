import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Hub City Coordinates (All 27 Brazilian State Capitals - Pre-projected offline coordinates)
const HUBS = [
  { id: "sp", name: "São Paulo", x: 678.81, y: 480.34, size: "large", color: "#3D5AFE", vehicles: 247, transit: 34 },
  { id: "rj", name: "Rio de Janeiro", x: 733.17, y: 469.33, size: "large", color: "#3D5AFE", vehicles: 184, transit: 22 },
  { id: "bsb", name: "Brasília", x: 659.2, y: 350.83, size: "large", color: "#3D5AFE", vehicles: 125, transit: 18 },
  { id: "bh", name: "Belo Horizonte", x: 721.21, y: 418.88, size: "medium", color: "#3D5AFE", vehicles: 96, transit: 14 },
  { id: "ssa", name: "Salvador", x: 806.55, y: 305.04, size: "medium", color: "#3D5AFE", vehicles: 84, transit: 11 },
  { id: "cwb", name: "Curitiba", x: 637.34, y: 512.75, size: "medium", color: "#3D5AFE", vehicles: 92, transit: 15 },
  { id: "rec", name: "Recife", x: 863.48, y: 226.36, size: "medium", color: "#3D5AFE", vehicles: 76, transit: 9 },
  { id: "poa", name: "Porto Alegre", x: 606.8, y: 594.53, size: "medium", color: "#3D5AFE", vehicles: 88, transit: 13 },
  { id: "mao", name: "Manaus", x: 468.51, y: 148.54, size: "medium", color: "#3D5AFE", vehicles: 45, transit: 6 },
  { id: "for", name: "Fortaleza", x: 805.89, y: 157.96, size: "medium", color: "#3D5AFE", vehicles: 62, transit: 8 },
  { id: "gyn", name: "Goiânia", x: 637.48, y: 365.43, size: "small", color: "#3D5AFE", vehicles: 54, transit: 7 },
  { id: "cgb", name: "Cuiabá", x: 530.15, y: 347.67, size: "small", color: "#3D5AFE", vehicles: 48, transit: 5 },
  { id: "cgr", name: "Campo Grande", x: 553.36, y: 428.13, size: "small", color: "#3D5AFE", vehicles: 42, transit: 4 },
  { id: "vix", name: "Vitória", x: 778.36, y: 425.25, size: "small", color: "#3D5AFE", vehicles: 38, transit: 4 },
  { id: "fln", name: "Florianópolis", x: 648.74, y: 550.8, size: "small", color: "#3D5AFE", vehicles: 35, transit: 3 },
  { id: "aju", name: "Aracaju", x: 828.98, y: 272.54, size: "small", color: "#3D5AFE", vehicles: 28, transit: 2 },
  { id: "mcz", name: "Maceió", x: 850.0, y: 252.08, size: "small", color: "#3D5AFE", vehicles: 31, transit: 3 },
  { id: "jpa", name: "João Pessoa", x: 863.98, y: 211.65, size: "small", color: "#3D5AFE", vehicles: 33, transit: 3 },
  { id: "nat", name: "Natal", x: 858.23, y: 190.7, size: "small", color: "#3D5AFE", vehicles: 36, transit: 4 },
  { id: "slz", name: "São Luís", x: 715.36, y: 139.29, size: "small", color: "#3D5AFE", vehicles: 41, transit: 5 },
  { id: "the", name: "Teresina", x: 738.97, y: 179.62, size: "small", color: "#3D5AFE", vehicles: 34, transit: 4 },
  { id: "bel", name: "Belém", x: 649.65, y: 122.4, size: "small", color: "#3D5AFE", vehicles: 52, transit: 6 },
  { id: "pmw", name: "Palmas", x: 652.1, y: 260.35, size: "small", color: "#3D5AFE", vehicles: 29, transit: 3 },
  { id: "pvh", name: "Porto Velho", x: 407.53, y: 237.69, size: "small", color: "#3D5AFE", vehicles: 26, transit: 2 },
  { id: "rbr", name: "Rio Branco", x: 346.16, y: 257.02, size: "small", color: "#3D5AFE", vehicles: 22, transit: 2 },
  { id: "bvb", name: "Boa Vista", x: 458.23, y: 55.16, size: "small", color: "#3D5AFE", vehicles: 18, transit: 1 },
  { id: "mcp", name: "Macapá", x: 609.12, y: 98.98, size: "small", color: "#3D5AFE", vehicles: 19, transit: 1 }
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

// Scattered Active Vehicle coordinates pre-calculated
const STATIC_VEHICLES = [
  {
    "id": "vh-Sudeste-0",
    "x": 639.47,
    "y": 417.28,
    "isException": false,
    "pulseDuration": 3.05,
    "delay": 0.13
  },
  {
    "id": "vh-Sudeste-1",
    "x": 738.03,
    "y": 438.2,
    "isException": false,
    "pulseDuration": 2.39,
    "delay": 0.67
  },
  {
    "id": "vh-Sudeste-2",
    "x": 782.04,
    "y": 407.52,
    "isException": false,
    "pulseDuration": 2.27,
    "delay": 0.14
  },
  {
    "id": "vh-Sudeste-3",
    "x": 665.9,
    "y": 477.56,
    "isException": false,
    "pulseDuration": 1.91,
    "delay": 0.44
  },
  {
    "id": "vh-Sudeste-4",
    "x": 736.93,
    "y": 383.56,
    "isException": false,
    "pulseDuration": 1.91,
    "delay": 0.35
  },
  {
    "id": "vh-Sudeste-5",
    "x": 665.64,
    "y": 504.3,
    "isException": false,
    "pulseDuration": 2.74,
    "delay": 1.05
  },
  {
    "id": "vh-Sudeste-6",
    "x": 686.72,
    "y": 496.78,
    "isException": false,
    "pulseDuration": 3.19,
    "delay": 0.96
  },
  {
    "id": "vh-Sudeste-7",
    "x": 803.71,
    "y": 490.83,
    "isException": true,
    "pulseDuration": 2.24,
    "delay": 0.4
  },
  {
    "id": "vh-Sudeste-8",
    "x": 790.48,
    "y": 485.95,
    "isException": false,
    "pulseDuration": 3.04,
    "delay": 0.96
  },
  {
    "id": "vh-Sudeste-9",
    "x": 714.43,
    "y": 474.33,
    "isException": false,
    "pulseDuration": 3.06,
    "delay": 0.6
  },
  {
    "id": "vh-Sudeste-10",
    "x": 731.58,
    "y": 494.92,
    "isException": false,
    "pulseDuration": 2.75,
    "delay": 0.89
  },
  {
    "id": "vh-Sudeste-11",
    "x": 838.8,
    "y": 466.89,
    "isException": false,
    "pulseDuration": 2.17,
    "delay": 0.96
  },
  {
    "id": "vh-Sudeste-12",
    "x": 664.08,
    "y": 512.29,
    "isException": true,
    "pulseDuration": 2.68,
    "delay": 1.26
  },
  {
    "id": "vh-Sudeste-13",
    "x": 743.85,
    "y": 498.09,
    "isException": true,
    "pulseDuration": 3.03,
    "delay": 1.42
  },
  {
    "id": "vh-Sudeste-14",
    "x": 754.5,
    "y": 414.3,
    "isException": false,
    "pulseDuration": 2.03,
    "delay": 0.79
  },
  {
    "id": "vh-Sudeste-15",
    "x": 827.78,
    "y": 446.52,
    "isException": false,
    "pulseDuration": 2.32,
    "delay": 1.35
  },
  {
    "id": "vh-Sudeste-16",
    "x": 749.01,
    "y": 401.64,
    "isException": false,
    "pulseDuration": 2.11,
    "delay": 0.11
  },
  {
    "id": "vh-Sudeste-17",
    "x": 631.29,
    "y": 460.57,
    "isException": false,
    "pulseDuration": 2.6,
    "delay": 0.71
  },
  {
    "id": "vh-Sudeste-18",
    "x": 801.17,
    "y": 382.71,
    "isException": false,
    "pulseDuration": 2.45,
    "delay": 1.09
  },
  {
    "id": "vh-Sudeste-19",
    "x": 699.07,
    "y": 440.41,
    "isException": true,
    "pulseDuration": 2.06,
    "delay": 0.69
  },
  {
    "id": "vh-Sudeste-20",
    "x": 654.18,
    "y": 483.52,
    "isException": false,
    "pulseDuration": 2.97,
    "delay": 1.45
  },
  {
    "id": "vh-Sudeste-21",
    "x": 694.22,
    "y": 440.63,
    "isException": true,
    "pulseDuration": 2.33,
    "delay": 1.48
  },
  {
    "id": "vh-Sudeste-22",
    "x": 678.71,
    "y": 482.77,
    "isException": false,
    "pulseDuration": 2.48,
    "delay": 0.28
  },
  {
    "id": "vh-Sudeste-23",
    "x": 743.22,
    "y": 405.39,
    "isException": false,
    "pulseDuration": 2.99,
    "delay": 0.24
  },
  {
    "id": "vh-Sudeste-24",
    "x": 579.88,
    "y": 490.28,
    "isException": true,
    "pulseDuration": 1.91,
    "delay": 0.99
  },
  {
    "id": "vh-Sudeste-25",
    "x": 754.01,
    "y": 435.93,
    "isException": false,
    "pulseDuration": 2.74,
    "delay": 0.45
  },
  {
    "id": "vh-Sudeste-26",
    "x": 725.41,
    "y": 423.45,
    "isException": true,
    "pulseDuration": 2.29,
    "delay": 0.1
  },
  {
    "id": "vh-Sudeste-27",
    "x": 723.87,
    "y": 536.92,
    "isException": false,
    "pulseDuration": 3.18,
    "delay": 0.98
  },
  {
    "id": "vh-Sudeste-28",
    "x": 701.44,
    "y": 511.21,
    "isException": false,
    "pulseDuration": 2.84,
    "delay": 0.23
  },
  {
    "id": "vh-Sudeste-29",
    "x": 743.5,
    "y": 370.22,
    "isException": false,
    "pulseDuration": 2.48,
    "delay": 1.36
  },
  {
    "id": "vh-Sudeste-30",
    "x": 636.34,
    "y": 525.2,
    "isException": false,
    "pulseDuration": 2.84,
    "delay": 0.83
  },
  {
    "id": "vh-Sudeste-31",
    "x": 782.48,
    "y": 407.7,
    "isException": false,
    "pulseDuration": 1.86,
    "delay": 0.55
  },
  {
    "id": "vh-Sudeste-32",
    "x": 709.13,
    "y": 463.58,
    "isException": false,
    "pulseDuration": 3.04,
    "delay": 0.61
  },
  {
    "id": "vh-Sudeste-33",
    "x": 766.66,
    "y": 436.34,
    "isException": false,
    "pulseDuration": 3.09,
    "delay": 1.17
  },
  {
    "id": "vh-Sudeste-34",
    "x": 803.81,
    "y": 444.6,
    "isException": false,
    "pulseDuration": 3.0,
    "delay": 0.33
  },
  {
    "id": "vh-Sudeste-35",
    "x": 728.06,
    "y": 453.94,
    "isException": false,
    "pulseDuration": 2.36,
    "delay": 0.42
  },
  {
    "id": "vh-Sudeste-36",
    "x": 717.7,
    "y": 494.49,
    "isException": false,
    "pulseDuration": 2.55,
    "delay": 1.41
  },
  {
    "id": "vh-Sudeste-37",
    "x": 709.45,
    "y": 436.96,
    "isException": false,
    "pulseDuration": 3.18,
    "delay": 0.17
  },
  {
    "id": "vh-Sudeste-38",
    "x": 682.6,
    "y": 477.56,
    "isException": false,
    "pulseDuration": 2.74,
    "delay": 0.55
  },
  {
    "id": "vh-Sudeste-39",
    "x": 700.78,
    "y": 481.62,
    "isException": false,
    "pulseDuration": 2.78,
    "delay": 0.83
  },
  {
    "id": "vh-Sudeste-40",
    "x": 653.07,
    "y": 479.25,
    "isException": false,
    "pulseDuration": 1.8,
    "delay": 0.43
  },
  {
    "id": "vh-Sudeste-41",
    "x": 821.98,
    "y": 406.13,
    "isException": false,
    "pulseDuration": 2.52,
    "delay": 1.19
  },
  {
    "id": "vh-Sudeste-42",
    "x": 746.49,
    "y": 495.17,
    "isException": true,
    "pulseDuration": 3.13,
    "delay": 0.35
  },
  {
    "id": "vh-Sudeste-43",
    "x": 700.57,
    "y": 408.94,
    "isException": true,
    "pulseDuration": 2.38,
    "delay": 0.94
  },
  {
    "id": "vh-Sudeste-44",
    "x": 754.45,
    "y": 462.26,
    "isException": false,
    "pulseDuration": 3.05,
    "delay": 1.29
  },
  {
    "id": "vh-Sudeste-45",
    "x": 700.21,
    "y": 540.39,
    "isException": false,
    "pulseDuration": 2.58,
    "delay": 1.38
  },
  {
    "id": "vh-Sudeste-46",
    "x": 665.65,
    "y": 595.06,
    "isException": false,
    "pulseDuration": 2.66,
    "delay": 1.08
  },
  {
    "id": "vh-Sudeste-47",
    "x": 822.26,
    "y": 423.2,
    "isException": false,
    "pulseDuration": 2.69,
    "delay": 1.15
  },
  {
    "id": "vh-Sudeste-48",
    "x": 788.85,
    "y": 389.73,
    "isException": false,
    "pulseDuration": 2.25,
    "delay": 0.81
  },
  {
    "id": "vh-Sudeste-49",
    "x": 699.19,
    "y": 442.81,
    "isException": false,
    "pulseDuration": 2.26,
    "delay": 0.7
  },
  {
    "id": "vh-Sul-0",
    "x": 606.98,
    "y": 571.19,
    "isException": false,
    "pulseDuration": 3.0,
    "delay": 1.15
  },
  {
    "id": "vh-Sul-1",
    "x": 624.6,
    "y": 530.98,
    "isException": false,
    "pulseDuration": 2.97,
    "delay": 0.81
  },
  {
    "id": "vh-Sul-2",
    "x": 613.78,
    "y": 573.03,
    "isException": false,
    "pulseDuration": 1.84,
    "delay": 0.5
  },
  {
    "id": "vh-Sul-3",
    "x": 671.7,
    "y": 654.4,
    "isException": false,
    "pulseDuration": 1.92,
    "delay": 0.64
  },
  {
    "id": "vh-Sul-4",
    "x": 622.91,
    "y": 531.79,
    "isException": false,
    "pulseDuration": 3.03,
    "delay": 0.42
  },
  {
    "id": "vh-Sul-5",
    "x": 632.54,
    "y": 592.01,
    "isException": false,
    "pulseDuration": 2.86,
    "delay": 1.42
  },
  {
    "id": "vh-Sul-6",
    "x": 691.13,
    "y": 482.93,
    "isException": true,
    "pulseDuration": 3.13,
    "delay": 0.7
  },
  {
    "id": "vh-Sul-7",
    "x": 668.0,
    "y": 576.35,
    "isException": true,
    "pulseDuration": 2.95,
    "delay": 1.45
  },
  {
    "id": "vh-Sul-8",
    "x": 703.78,
    "y": 562.23,
    "isException": false,
    "pulseDuration": 3.12,
    "delay": 0.3
  },
  {
    "id": "vh-Sul-9",
    "x": 637.5,
    "y": 647.17,
    "isException": true,
    "pulseDuration": 3.18,
    "delay": 1.17
  },
  {
    "id": "vh-Sul-10",
    "x": 654.55,
    "y": 500.34,
    "isException": false,
    "pulseDuration": 2.41,
    "delay": 0.54
  },
  {
    "id": "vh-Sul-11",
    "x": 670.79,
    "y": 478.82,
    "isException": false,
    "pulseDuration": 2.48,
    "delay": 0.65
  },
  {
    "id": "vh-Sul-12",
    "x": 614.99,
    "y": 570.36,
    "isException": false,
    "pulseDuration": 2.6,
    "delay": 1.0
  },
  {
    "id": "vh-Sul-13",
    "x": 624.49,
    "y": 577.91,
    "isException": false,
    "pulseDuration": 2.78,
    "delay": 0.41
  },
  {
    "id": "vh-Sul-14",
    "x": 638.57,
    "y": 486.59,
    "isException": false,
    "pulseDuration": 2.14,
    "delay": 0.71
  },
  {
    "id": "vh-Sul-15",
    "x": 604.14,
    "y": 563.14,
    "isException": false,
    "pulseDuration": 2.23,
    "delay": 0.87
  },
  {
    "id": "vh-Sul-16",
    "x": 653.63,
    "y": 534.51,
    "isException": false,
    "pulseDuration": 2.12,
    "delay": 1.08
  },
  {
    "id": "vh-Sul-17",
    "x": 599.52,
    "y": 570.12,
    "isException": false,
    "pulseDuration": 2.48,
    "delay": 1.09
  },
  {
    "id": "vh-Sul-18",
    "x": 635.18,
    "y": 582.56,
    "isException": false,
    "pulseDuration": 1.98,
    "delay": 0.07
  },
  {
    "id": "vh-Sul-19",
    "x": 647.93,
    "y": 508.45,
    "isException": false,
    "pulseDuration": 2.46,
    "delay": 0.66
  },
  {
    "id": "vh-Nordeste-0",
    "x": 843.28,
    "y": 106.61,
    "isException": false,
    "pulseDuration": 2.76,
    "delay": 0.23
  },
  {
    "id": "vh-Nordeste-1",
    "x": 816.87,
    "y": 258.05,
    "isException": false,
    "pulseDuration": 2.67,
    "delay": 1.16
  },
  {
    "id": "vh-Nordeste-2",
    "x": 852.9,
    "y": 159.86,
    "isException": false,
    "pulseDuration": 2.84,
    "delay": 1.42
  },
  {
    "id": "vh-Nordeste-3",
    "x": 839.23,
    "y": 239.46,
    "isException": false,
    "pulseDuration": 2.02,
    "delay": 0.61
  },
  {
    "id": "vh-Nordeste-4",
    "x": 699.05,
    "y": 181.13,
    "isException": false,
    "pulseDuration": 2.76,
    "delay": 1.39
  },
  {
    "id": "vh-Nordeste-5",
    "x": 819.11,
    "y": 369.33,
    "isException": false,
    "pulseDuration": 1.9,
    "delay": 0.25
  },
  {
    "id": "vh-Nordeste-6",
    "x": 880,
    "y": 297.17,
    "isException": false,
    "pulseDuration": 2.23,
    "delay": 0.6
  },
  {
    "id": "vh-Nordeste-7",
    "x": 850.06,
    "y": 246.06,
    "isException": false,
    "pulseDuration": 1.93,
    "delay": 1.44
  },
  {
    "id": "vh-Nordeste-8",
    "x": 835.61,
    "y": 413.43,
    "isException": false,
    "pulseDuration": 2.62,
    "delay": 0.95
  },
  {
    "id": "vh-Nordeste-9",
    "x": 768.5,
    "y": 131.18,
    "isException": true,
    "pulseDuration": 2.03,
    "delay": 0.62
  },
  {
    "id": "vh-Nordeste-10",
    "x": 757.21,
    "y": 135.33,
    "isException": false,
    "pulseDuration": 3.16,
    "delay": 0.61
  },
  {
    "id": "vh-Nordeste-11",
    "x": 780.19,
    "y": 124.04,
    "isException": false,
    "pulseDuration": 2.5,
    "delay": 0.66
  },
  {
    "id": "vh-Nordeste-12",
    "x": 767.06,
    "y": 350.74,
    "isException": false,
    "pulseDuration": 1.97,
    "delay": 1.46
  },
  {
    "id": "vh-Nordeste-13",
    "x": 847.26,
    "y": 223.22,
    "isException": false,
    "pulseDuration": 2.98,
    "delay": 0.17
  },
  {
    "id": "vh-Nordeste-14",
    "x": 873.96,
    "y": 263.04,
    "isException": false,
    "pulseDuration": 2.38,
    "delay": 0.72
  },
  {
    "id": "vh-CentroOeste-0",
    "x": 519.07,
    "y": 338.67,
    "isException": false,
    "pulseDuration": 3.03,
    "delay": 1.3
  },
  {
    "id": "vh-CentroOeste-1",
    "x": 484.86,
    "y": 431.18,
    "isException": false,
    "pulseDuration": 2.72,
    "delay": 1.3
  },
  {
    "id": "vh-CentroOeste-2",
    "x": 556.9,
    "y": 434.96,
    "isException": false,
    "pulseDuration": 2.25,
    "delay": 0.28
  },
  {
    "id": "vh-CentroOeste-3",
    "x": 643.1,
    "y": 415.28,
    "isException": false,
    "pulseDuration": 2.34,
    "delay": 1.0
  },
  {
    "id": "vh-CentroOeste-4",
    "x": 637.19,
    "y": 365.77,
    "isException": false,
    "pulseDuration": 3.02,
    "delay": 0.66
  },
  {
    "id": "vh-CentroOeste-5",
    "x": 675.1,
    "y": 272.63,
    "isException": true,
    "pulseDuration": 2.26,
    "delay": 1.01
  },
  {
    "id": "vh-CentroOeste-6",
    "x": 641.56,
    "y": 314.93,
    "isException": false,
    "pulseDuration": 1.85,
    "delay": 0.1
  },
  {
    "id": "vh-CentroOeste-7",
    "x": 525.75,
    "y": 410.69,
    "isException": false,
    "pulseDuration": 2.77,
    "delay": 1.36
  },
  {
    "id": "vh-CentroOeste-8",
    "x": 648.03,
    "y": 335.9,
    "isException": false,
    "pulseDuration": 2.38,
    "delay": 1.02
  },
  {
    "id": "vh-CentroOeste-9",
    "x": 696.03,
    "y": 325.66,
    "isException": false,
    "pulseDuration": 2.16,
    "delay": 0.01
  },
  {
    "id": "vh-Norte-0",
    "x": 421.44,
    "y": 32.68,
    "isException": false,
    "pulseDuration": 2.39,
    "delay": 0.38
  },
  {
    "id": "vh-Norte-1",
    "x": 316.81,
    "y": 255.7,
    "isException": false,
    "pulseDuration": 2.6,
    "delay": 1.49
  },
  {
    "id": "vh-Norte-2",
    "x": 339.85,
    "y": 345.08,
    "isException": false,
    "pulseDuration": 2.89,
    "delay": 0.35
  },
  {
    "id": "vh-Norte-3",
    "x": 325.33,
    "y": 195.76,
    "isException": false,
    "pulseDuration": 2.75,
    "delay": 0.21
  },
  {
    "id": "vh-Norte-4",
    "x": 537.0,
    "y": 128.02,
    "isException": false,
    "pulseDuration": 2.83,
    "delay": 0.14
  }
];

export default function BrazilMapDashboard() {
  const [hoveredItem, setHoveredItem] = useState(null); // { title, type, details, x, y }

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
      className="w-full max-w-[1150px] aspect-[900/680] max-h-[calc(100vh-140px)] md:max-h-[calc(100vh-160px)] lg:max-h-[calc(100vh-180px)] flex flex-col relative select-none touch-pan-y"
    >
      {/* SVG Canvas and active flow lines */}
      <div className="w-full h-full absolute inset-0 z-10">
        <svg
          viewBox="0 0 900 680"
          className="w-full h-full"
        >
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

          {/* 1. ACTIVE ROUTE LINES */}
          {ROUTES.map((route, idx) => {
            const fromHub = HUBS.find(h => h.id === route.from);
            const toHub = HUBS.find(h => h.id === route.to);
            if (!fromHub || !toHub) return null;

            const x1 = fromHub.x;
            const y1 = fromHub.y;
            const x2 = toHub.x;
            const y2 = toHub.y;

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
                    pathLength: { delay: idx * 0.05, duration: 1.4, ease: "easeOut" },
                    opacity: { delay: idx * 0.05, duration: 0.6 }
                  }}
                  style={{
                    strokeDashoffset: 0,
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
                  className="cursor-pointer pointer-events-auto"
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
                    <animateMotion
                      path={bezierPath}
                      dur="8s"
                      repeatCount="indefinite"
                      begin={`${idx * 0.15}s`}
                    />
                  </circle>
                </g>
              </g>
            );
          })}

          {/* 2. ACTIVE VEHICLES POINT PLOT */}
          {STATIC_VEHICLES.map((vh) => (
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
        </svg>
      </div>

      {/* ==================== CARD OVERLAYS ==================== */}

      {/* Bottom-Right Legend (Positioned completely outside the map in the corner to prevent overlapping) */}
      <div className="absolute bottom-4 right-4 z-20 bg-[#1A1F26]/75 border border-[#2A3140] backdrop-blur-md rounded-xl p-3 flex flex-col gap-2.5 text-[11px] text-[#8A92A0] shadow-[0_4px_20px_rgba(0,0,0,0.4)] pointer-events-auto">
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
    </motion.div>
  );
}
