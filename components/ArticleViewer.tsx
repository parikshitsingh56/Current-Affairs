import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BookMarked, ExternalLink, Share2, Copy, Bookmark, Printer, Database } from 'lucide-react';
import { LoadingDisplay } from './LoadingDisplay';

interface ArticleViewerProps {
  content: string;
  isLoading: boolean;
  date: string;
}

export const ArticleViewer: React.FC<ArticleViewerProps> = ({ content, isLoading, date }) => {
  if (isLoading) {
    return <LoadingDisplay />;
  }

  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-slate-400">
        <BookMarked size={48} className="mb-4 opacity-50" />
        <p className="text-lg font-serif">Select a date and click "Fetch" to generate the daily analysis.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-white min-h-screen">
      {/* Drishti-style Header Strip */}
      <div className="bg-[#800000] text-white p-4 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
             <h2 className="text-xl md:text-2xl font-bold serif tracking-wide">DAILY NEWS ANALYSIS</h2>
             <p className="text-sm opacity-90 font-light uppercase tracking-wider">
               {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
             </p>
          </div>
          <div className="hidden md:block text-xs font-medium border border-white/30 px-3 py-1 rounded">
            TARGET: UPSC / BANKING
          </div>
        </div>
      </div>

      <div className="p-6 md:p-12 max-w-4xl mx-auto">
        {/* Action Bar */}
        <div className="flex justify-end space-x-4 mb-8 border-b border-slate-200 pb-2">
           <button className="flex items-center space-x-1 text-slate-500 hover:text-[#800000] text-sm font-medium transition-colors">
              <Printer size={16} /> <span>Print</span>
           </button>
           <button className="flex items-center space-x-1 text-slate-500 hover:text-[#800000] text-sm font-medium transition-colors">
              <Bookmark size={16} /> <span>Save PDF</span>
           </button>
        </div>

        <div className="prose prose-slate max-w-none prose-lg">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              // H1: Main Source Headers (e.g., Drishti IAS, GKToday)
              h1: ({node, ...props}) => (
                <div className="mt-12 mb-6 border-b-4 border-[#800000] pb-2">
                  <h1 className="text-3xl font-bold text-[#800000] serif uppercase tracking-tight flex items-center gap-2" {...props} />
                </div>
              ),
              // H2: Article Titles
              h2: ({node, ...props}) => (
                <h2 className="text-xl font-bold mt-10 mb-4 text-slate-900 border-l-4 border-[#800000] pl-4 py-1 bg-slate-50" {...props} />
              ),
              // H3: Sub-sections like "Key Points", "Context"
              h3: ({node, ...props}) => (
                <h3 className="text-lg font-bold mt-6 mb-2 text-[#800000] uppercase tracking-wide text-sm" {...props} />
              ),
              // Strong text
              strong: ({node, ...props}) => <strong className="font-bold text-slate-900" {...props} />,
              // Static GK Blocks (usually rendered as blockquotes or explicitly titled sections in markdown)
              blockquote: ({node, ...props}) => (
                <div className="my-8 bg-[#fffaf0] border border-[#fbd38d] rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-[#ed8936] px-4 py-2 flex items-center space-x-2 text-white font-bold text-sm uppercase tracking-wider">
                    <Database size={16} />
                    <span>Static GK Deep Dive</span>
                  </div>
                  <div className="p-5 text-slate-800 text-sm leading-relaxed" {...props} />
                </div>
              ),
              // Links
              a: ({node, ...props}) => (
                  <a className="text-[#800000] hover:underline font-semibold decoration-dotted underline-offset-4" target="_blank" rel="noopener noreferrer" {...props}>
                      {props.children} <ExternalLink size={12} className="inline ml-0.5 mb-1" />
                  </a>
              ),
              // Lists
              ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2 my-4 text-slate-700 marker:text-[#800000]" {...props} />,
              li: ({node, ...props}) => <li className="pl-1" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm italic">
          <p>Comprehensive analysis generated via AI Aggregation.</p>
          <p>Sources: Drishti IAS, GKToday, Business Standard, The Hindu, PIB.</p>
        </div>
      </div>
    </div>
  );
};