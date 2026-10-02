// All numbers here are configurable defaults. VERIFY each before launch.
export const estimatorConfig = {
  // PM Surya Ghar (residential rooftop): Rs 30k/kW up to 2 kW, Rs 18k for the 3rd kW, capped.
  subsidy: {
    firstKwRate: 30000,
    firstKwLimit: 2,
    thirdKwRate: 18000,
    thirdKwLimit: 1,
    cap: 78000,
  },
  // Telangana domestic energy-charge slabs (Rs/unit, monthly). VERIFY against the current TGERC tariff order.
  tariffSlabs: [
    { upto: 50, rate: 1.95 },
    { upto: 100, rate: 3.1 },
    { upto: 200, rate: 4.8 },
    { upto: 300, rate: 7.7 },
    { upto: 400, rate: 9.0 },
    { upto: 800, rate: 9.5 },
    { upto: Infinity, rate: 10.0 },
  ],
  fixedChargePerMonth: 0, // set if you want it excluded from savings math
  // Price is built per kW from the panel brand and the mounting structure, plus a fixed cost.
  // ALL VALUES BELOW ARE PLACEHOLDERS. Brands are set equal on purpose until real rates are entered.
  brands: {
    tata: { label: "Tata Power Solar", panelAndInverterPerKw: 45000 },
    waaree: { label: "Waaree", panelAndInverterPerKw: 45000 },
    adani: { label: "Adani Solar", panelAndInverterPerKw: 45000 },
    premier: { label: "Premier Energies", panelAndInverterPerKw: 45000 },
  } as Record<string, { label: string; panelAndInverterPerKw: number }>,
  structures: {
    rcc: { label: "RCC flat roof, standard structure", perKw: 9000 },
    "rcc-elevated": { label: "RCC flat roof, elevated structure", perKw: 13000 },
    sheet: { label: "Metal sheet roof", perKw: 12000 },
    tile: { label: "Tile roof", perKw: 14000 },
  } as Record<string, { label: string; perKw: number }>,
  fixedCost: 10000, // wiring, net-metering and approvals, per project
  sqFtPerKw: 100, // shadow-free roof area one kW needs
  yieldPerKwPerYear: 1450, // kWh per kW per year in Telangana
  co2KgPerKwh: 0.71,
  minKw: 1,
  maxKw: 10,
  sizeStepKw: 1,
  solarCoverage: 0.9, // share of monthly consumption the system is sized to offset
  yearlyDegradation: 0.005,
  tariffEscalation: 0.03,
} as const;

export type BrandKey = "tata" | "waaree" | "adani" | "premier";
export type StructureKey = "rcc" | "rcc-elevated" | "sheet" | "tile";
