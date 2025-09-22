"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const categories = [
  { name: "Food", current: 75, optimized: 60, color: "bg-blue-500" },
  { name: "Transport", current: 40, optimized: 35, color: "bg-green-500" },
  { name: "Entertainment", current: 90, optimized: 70, color: "bg-purple-500" },
  { name: "Shopping", current: 85, optimized: 65, color: "bg-orange-500" },
];

export function BudgetOptimizationAnimation() {
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <div className="relative w-full max-w-sm space-y-4 p-8">
          <div className="text-center mb-6">
            <div className="text-2xl font-semibold text-primary">Budget Optimization</div>
            <div className="text-sm text-muted-foreground">AI-Powered Recommendations</div>
          </div>
          {categories.map((category, index) => (
            <div key={category.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-primary">{category.name}</span>
                <span className="text-muted-foreground">${category.optimized}%</span>
              </div>
              <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className={cn(category.color, "h-full rounded-full")}
                  initial={{ width: `${category.current}%` }}
                  animate={{ width: `${category.optimized}%` }}
                  transition={{ duration: 1.5, delay: index * 0.2, ease: "easeInOut" }}
                />
              </div>
            </div>
          ))}
          <div className="mt-6 p-3 bg-accent rounded-lg">
            <div className="text-sm text-center">
              <span className="text-secondary font-semibold">+$280</span>
              <span className="text-muted-foreground"> saved this month</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
