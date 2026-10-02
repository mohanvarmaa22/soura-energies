import { estimatorConfig as c, type BrandKey, type StructureKey } from "@/config/estimator";

export function billForUnits(units: number): number {
  let remaining = units;
  let prev = 0;
  let total = 0;
  for (const slab of c.tariffSlabs) {
    if (remaining <= 0) break;
    const span = Math.min(remaining, slab.upto - prev);
    total += span * slab.rate;
    remaining -= span;
    prev = slab.upto;
  }
  return total + (units > 0 ? c.fixedChargePerMonth : 0);
}

export function unitsForBill(bill: number): number {
  let lo = 0;
  let hi = 5000;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (billForUnits(mid) < bill) lo = mid;
    else hi = mid;
  }
  return Math.round(hi);
}

export function subsidyForKw(kw: number): number {
  const s = c.subsidy;
  const first = Math.min(kw, s.firstKwLimit) * s.firstKwRate;
  const third = Math.min(Math.max(kw - s.firstKwLimit, 0), s.thirdKwLimit) * s.thirdKwRate;
  return Math.min(first + third, s.cap);
}

export type EstimateInput = {
  monthlyBill?: number;
  monthlyUnits?: number;
  brand: BrandKey;
  structure: StructureKey;
  roofAreaSqFt?: number;
};

export function estimate(input: EstimateInput) {
  const monthlyUnits = input.monthlyUnits ?? unitsForBill(input.monthlyBill ?? 0);
  const monthlyBill = input.monthlyUnits !== undefined ? billForUnits(monthlyUnits) : input.monthlyBill ?? 0;
  const yearlyNeed = monthlyUnits * 12;
  const rawKw = (yearlyNeed * c.solarCoverage) / c.yieldPerKwPerYear;
  const wantedKw = Math.min(c.maxKw, Math.max(c.minKw, Math.ceil(rawKw / c.sizeStepKw) * c.sizeStepKw));
  const roofLimitKw = input.roofAreaSqFt ? Math.max(Math.floor(input.roofAreaSqFt / c.sqFtPerKw), 0) : undefined;
  const kw = roofLimitKw !== undefined ? Math.min(wantedKw, Math.max(roofLimitKw, c.minKw)) : wantedKw;
  const roofLimited = kw < wantedKw;

  const perKw = c.brands[input.brand].panelAndInverterPerKw + c.structures[input.structure].perKw;
  const grossCost = kw * perKw + c.fixedCost;
  const subsidy = Math.min(subsidyForKw(kw), grossCost);
  const netCost = grossCost - subsidy;

  const monthlyGeneration = (kw * c.yieldPerKwPerYear) / 12;
  const billAfter = billForUnits(Math.max(monthlyUnits - monthlyGeneration, 0));
  const annualSavings = Math.max(monthlyBill - billAfter, 0) * 12;
  const paybackYears = annualSavings > 0 ? netCost / annualSavings : null;
  const co2TonnesPerYear = (kw * c.yieldPerKwPerYear * c.co2KgPerKwh) / 1000;

  return { monthlyUnits, monthlyBill, kw, wantedKw, roofLimited, grossCost, subsidy, netCost, annualSavings, paybackYears, co2TonnesPerYear };
}
