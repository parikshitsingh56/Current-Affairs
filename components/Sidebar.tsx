import React from 'react';
import { Calendar as CalendarIcon, Filter, Info, Newspaper } from 'lucide-react';
import { Category } from '../types';

interface SidebarProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  onFetch: () => void;
  isLoading: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedDate,
  onDateChange,
  selectedCategory,
  onCategoryChange,
  onFetch,
  isLoading
}) => {
  const categories: Category[] = ['All', 'National', 'International', 'Banking & Business', 'Sports', 'Science & Tech'];
  const today = new Date().toISOString().split('T')[0];

  return (
    <aside className="w-full md:w-80 bg-white border-r border-slate-200 h-full md:min-h-[calc(100vh-4rem)] p-6 flex flex-col gap-8 sticky top-16">
      
      {/* Date Selection */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-slate-800 font-semibold">
          <CalendarIcon size={20} className="text-[#800000]" />
          <h3>Select Date</h3>
        </div>
        <input
          type="date"
          value={selectedDate}
          max={today}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#800000] focus:border-[#800000] outline-none transition-all text-slate-700 font-medium cursor-pointer"
        />
        <p className="text-xs text-slate-400">Past dates available for revision.</p>
      </div>

      {/* Action Button */}
      <button
        onClick={onFetch}
        disabled={isLoading}
        className={`w-full py-3.5 px-4 rounded-lg font-bold text-white shadow-md transition-all flex items-center justify-center space-x-2
          ${isLoading 
            ? 'bg-slate-400 cursor-not-allowed' 
            : 'bg-[#800000] hover:bg-[#600000] hover:shadow-lg active:scale-[0.98]'
          }`}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Newspaper size={18} />
            <span>Generate Analysis</span>
          </>
        )}
      </button>

      {/* Info Box */}
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-600">
        <div className="flex items-start space-x-2">
          <Info size={16} className="mt-0.5 flex-shrink-0 text-[#800000]" />
          <p>
            Aggregates full-text articles from <span className="font-semibold">Drishti IAS</span>, <span className="font-semibold">GKToday</span>, and <span className="font-semibold">Business Standard</span> with added Static GK.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3 pt-4 border-t border-slate-100">
        <div className="flex items-center space-x-2 text-slate-800 font-semibold">
          <Filter size={20} className="text-[#800000]" />
          <h3>Focus Area</h3>
        </div>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors border-l-2 ${
                selectedCategory === cat
                  ? 'bg-red-50 text-[#800000] font-bold border-[#800000]'
                  : 'border-transparent text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};