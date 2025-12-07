"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "./fade-in";

interface AIProgressProps {
  steps: string[];
  onComplete?: () => void;
}

export function AIProgress({ steps, onComplete }: AIProgressProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(steps[0]);

  useEffect(() => {
    let currentProgress = 0;
    let stepIndex = 0;
    
    const interval = setInterval(() => {
      currentProgress += Math.random() * 8; // Slightly faster
      if (currentProgress > 95) currentProgress = 95; // Hold at 95%
      
      setProgress(currentProgress);
      
      // Update text based on progress thresholds
      const newStepIndex = Math.floor((currentProgress / 95) * (steps.length - 1));
      if (newStepIndex > stepIndex) {
          stepIndex = newStepIndex;
          setLoadingText(steps[stepIndex]);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [steps]);

  // Allow parent to force complete
  useEffect(() => {
      if (progress >= 100 && onComplete) {
          onComplete();
      }
  }, [progress, onComplete]);

  return (
    <FadeIn>
        <div className="bg-white p-12 rounded-xl shadow-sm border flex flex-col items-center justify-center text-center">
            <div className="relative h-24 w-24 mb-6">
                <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                        className="text-gray-200 stroke-current"
                        strokeWidth="8"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                    ></circle>
                    <motion.circle
                        className="text-blue-600 stroke-current"
                        strokeWidth="8"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: progress / 100 }}
                        transition={{ duration: 0.5 }}
                        style={{ rotate: -90, transformOrigin: "50% 50%" }}
                    ></motion.circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-blue-600">
                    {Math.round(progress)}%
                </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{loadingText}</h3>
            <p className="text-gray-500 max-w-md">
                Our AI agents are working together to generate your results.
            </p>
        </div>
    </FadeIn>
  );
}
