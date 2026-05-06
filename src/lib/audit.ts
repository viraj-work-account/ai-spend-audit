import { PRICING } from "./pricing";
import type { ToolName } from "./tools";

type ToolInput = {
  tool: ToolName;
  plan: string;
  spend: number | "";
  users: number | "";
};

type AuditResult = {
  tool: ToolName;
  currentPlan: string;
  currentSpend: number;
  recommendedPlan: string;
  recommendedSpend: number;
  savings: number;
  reason: string;
};

export function runAudit(tools: ToolInput[]): {
  results: AuditResult[];
  totalSavings: number;
} {
  const results: AuditResult[] = [];
  let totalSavings = 0;

  for (const entry of tools) {

    if (!entry.tool || !entry.plan) continue;

    const users = entry.users === "" ? 0 : entry.users;
    const inputSpend = entry.spend === "" ? 0 : entry.spend;

    if (!users || users <= 0) continue;

    const pricing = PRICING[entry.tool];
    if (!pricing) continue;

    const currentPlanPrice = pricing[entry.plan as keyof typeof pricing] ?? 0;

    // If user manually entered spend, trust it
    const currentSpend = inputSpend > 0 ? inputSpend : currentPlanPrice * users;

    let bestPlan = entry.plan;
    let bestCost = currentSpend;
    let reason = "You're on an optimal plan for your usage.";

    for (const [plan, price] of Object.entries(pricing)) {
      const cost = price * users;

      // Skip invalid or same plan
      if (!price || plan === entry.plan) continue;

      if (cost < bestCost) {
        bestPlan = plan;
        bestCost = cost;

        reason = `Switching from ${entry.plan} to ${plan} reduces your cost from $${currentSpend}/mo to $${cost}/mo.`;
      }
    }

    const savings = Math.max(0, currentSpend - bestCost);
    totalSavings += savings;

    results.push({
      tool: entry.tool,
      currentPlan: entry.plan,
      currentSpend,
      recommendedPlan: bestPlan,
      recommendedSpend: bestCost,
      savings,
      reason,
    });
  }

  return {
    results,
    totalSavings,
  };
}
