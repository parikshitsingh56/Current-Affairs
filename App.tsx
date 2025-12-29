import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ArticleViewer } from './components/ArticleViewer';
import { fetchDailyNews } from './services/geminiService';
import { Category } from './types';
import { AlertCircle } from 'lucide-react';

function App() {
  // Default to today's date
  const today = new Date().toISOString().split('T')[0];
  
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchDailyNews(selectedDate);
      setContent(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch news. Please check your connection or API limit.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="md:sticky md:top-16 md:h-[calc(100vh-4rem)] z-0">
          <Sidebar 
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onFetch={handleFetch}
            isLoading={isLoading}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white min-h-[calc(100vh-4rem)] border-l border-slate-200 shadow-sm">
          {error ? (
            <div className="p-12 flex flex-col items-center justify-center h-full text-center">
              <div className="bg-red-50 text-red-700 p-8 rounded-xl max-w-lg border border-red-100 shadow-lg">
                <AlertCircle size={48} className="mx-auto mb-4 text-[#800000]" />
                <h3 className="text-xl font-bold mb-2 serif text-[#800000]">Action Required</h3>
                <p className="mb-6 font-medium">{error}</p>
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={() => setError(null)}
                    className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm font-bold"
                  >
                    Close
                  </button>
                  <button 
                    onClick={handleFetch}
                    className="px-6 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#600000] transition-colors text-sm font-bold shadow-md"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <ArticleViewer 
              content={content} 
              isLoading={isLoading} 
              date={selectedDate}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;