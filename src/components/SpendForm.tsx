"use client";

import { useState } from "react";
import { TOOLS } from "@/lib/tools";

type ToolEntry = {
  tool: string;
  plan: string;
  spend: number | "";
  users: number | "";
};

export default function SpendForm() {
  const [tools, setTools] = useState<ToolEntry[]>([
    { tool: "", plan: "", spend: "", users: "" },
  ]);

  const handleChange = (
    index: number,
    field: keyof ToolEntry,
    value: string | number,
  ) => {
    const updated = [...tools];
    updated[index][field] = value as never;
    setTools(updated);
  };

  const addTool = () => {
    setTools([...tools, { tool: "", plan: "", spend: 0, users: 1 }]);
  };

  const removeTool = (index: number) => {
    const updated = tools.filter((_, i) => i !== index);
    setTools(updated);
  };

  return (
    <div className="space-y-6">
      {tools.map((entry, index) => {
        const selectedTool = TOOLS.find((t) => t.name === entry.tool);

        return (
          <div
            key={index}
            className="p-5 border rounded-xl bg-gray-50 space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tool */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Tool
                </label>
                <select
                  value={entry.tool}
                  onChange={(e) => handleChange(index, "tool", e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md bg-white text-gray-900"
                >
                  <option value="">Select Tool</option>
                  {TOOLS.map((tool) => (
                    <option key={tool.name} value={tool.name}>
                      {tool.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Plan */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Plan
                </label>
                <select
                  value={entry.plan}
                  onChange={(e) => handleChange(index, "plan", e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md bg-white text-gray-900"
                  disabled={!entry.tool}
                >
                  <option value="">Select Plan</option>
                  {selectedTool?.plans.map((plan) => (
                    <option key={plan} value={plan}>
                      {plan}
                    </option>
                  ))}
                </select>
              </div>

              {/* Spend */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Monthly Spend ($)
                </label>
                <input
                  type="number"
                  value={entry.spend}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "spend",
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  className="w-full mt-1 p-2 border rounded-md text-gray-900"
                />
              </div>

              {/* Users */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Users
                </label>
                <input
                  type="number"
                  value={entry.users}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "users",
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  className="w-full mt-1 p-2 border rounded-md text-gray-900"
                />
              </div>
            </div>

            {tools.length > 1 && (
              <button
                onClick={() => removeTool(index)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove tool
              </button>
            )}
          </div>
        );
      })}

      <button
        onClick={addTool}
        className="w-full py-2 border border-dashed rounded-lg text-gray-700 hover:bg-gray-100"
      >
        + Add another tool
      </button>

      <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800">
        Analyze Spend
      </button>
    </div>
  );
}
