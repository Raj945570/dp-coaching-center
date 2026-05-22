import React from 'react';
import { Quote } from 'lucide-react';

const QuotesSection = () => {
  const quotes = [
    {
      text: "शिक्षा सबसे शक्तिशाली हथियार है जिससे आप दुनिया बदल सकते हैं।",
      author: "नेल्सन मंडेला"
    },
    {
      text: "सपने वो नहीं जो हम सोते वक्त देखते हैं, सपने वो हैं जो हमें सोने नहीं देते।",
      author: "ए.पी.जे. अब्दुल कलाम"
    },
    {
      text: "मेहनत इतनी खामोशी से करो कि सफलता शोर मचा दे।",
      author: "चाणक्य"
    },
    {
      text: "ज्ञान ही मनुष्य का सच्चा धन है।",
      author: "स्वामी विवेकानंद"
    }
  ];

  return (
    <section className="py-12 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-purple/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">प्रेरणादायक विचार</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-primary to-brand-purple mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quotes.map((quote, idx) => (
            <div 
              key={idx} 
              className="glass dark:glass-dark p-6 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-brand-primary/20 group-hover:text-brand-primary/40 transition-colors" />
              <p className="text-lg md:text-xl font-medium text-slate-700 dark:text-slate-300 mb-4 pr-8 leading-relaxed">
                "{quote.text}"
              </p>
              <div className="text-sm font-semibold text-brand-primary dark:text-brand-purple">
                — {quote.author}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuotesSection;
