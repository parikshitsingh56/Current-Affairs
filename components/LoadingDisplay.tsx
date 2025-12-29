import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, Globe, Server, Database } from 'lucide-react';

const STEPS = [
  { id: 1, text: "Initializing Secure Connection...", icon: Server },
  { id: 2, text: "Accessing Drishti IAS Daily Archives...", icon: Globe },
  { id: 3, text: "Scraping GKToday Current Affairs Repository...", icon: Database },
  { id: 4, text: "Fetching Business Standard Banking News...", icon: Globe },
  { id: 5, text: "Cross-referencing International Sources...", icon: Globe },
  { id: 6, text: "Compiling Static GK & Constitutional Articles...", icon: Database },
  { id: 7, text: "Finalizing Report Layout...", icon: CheckCircle2 },
];

export const LoadingDisplay: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 1500); // Change step every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-slate-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-blue-600 p-4 rounded-full text-white">
              <Loader2 size={32} className="animate-spin" />
            </div>
          </div>
          <h3 className="mt-4 text-xl font-bold text-slate-800">Aggregating Sources</h3>
          <p className="text-slate-500 text-sm mt-1">Please wait while we compile your exam data</p>
        </div>

        <div className="space-y-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div 
                key={step.id} 
                className={`flex items-center space-x-3 transition-all duration-500 ${
                  isActive ? 'scale-105 opacity-100' : isCompleted ? 'opacity-50' : 'opacity-30'
                }`}
              >
                <div className={`p-1.5 rounded-full ${
                  isCompleted ? 'bg-green-100 text-green-600' : isActive ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
                }`}>
                  {isCompleted ? <CheckCircle2 size={16} /> : <Icon size={16} />}
                </div>
                <span className={`text-sm font-medium ${
                  isActive ? 'text-slate-800' : 'text-slate-500'
                }`}>
                  {step.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};