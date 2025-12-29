import React from 'react';
import { BookOpen, GraduationCap, Globe } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <GraduationCap size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">ExamPrep Aggregator</h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Daily Current Affairs & Static GK</p>
          </div>
        </div>
        <div className="flex items-center space-x-6 text-sm text-slate-600 hidden md:flex">
          <div className="flex items-center space-x-1 hover:text-blue-600 cursor-pointer">
            <BookOpen size={16} />
            <span>GKToday Style</span>
          </div>
          <div className="flex items-center space-x-1 hover:text-blue-600 cursor-pointer">
            <Globe size={16} />
            <span>International & Banking</span>
          </div>
        </div>
      </div>
    </header>
  );
};
