export const TOOLS = [
  {
    name: "ChatGPT",
    plans: ["Plus", "Team", "Enterprise", "API"],
  },
  {
    name: "Claude",
    plans: ["Free", "Pro", "Max", "Team", "Enterprise", "API"],
  },
  {
    name: "GitHub Copilot",
    plans: ["Individual", "Business", "Enterprise"],
  },
  {
    name: "Cursor",
    plans: ["Hobby", "Pro", "Business", "Enterprise"],
  },
  {
    name: "Gemini",
    plans: ["Pro", "Ultra", "API"],
  },
] as const;

export type ToolName = (typeof TOOLS)[number]["name"];

export type Tool = (typeof TOOLS)[number];

export type PlanName<T extends ToolName> = Extract<
  Tool,
  { name: T }
>["plans"][number];
