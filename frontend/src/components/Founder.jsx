import React from 'react';
import { Award, Target, Sparkles } from 'lucide-react';

const Founder = () => {
  return (
    <section className="py-20 relative overflow-hidden transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass dark:glass-dark rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden border border-white/20 dark:border-slate-700/50 hover:shadow-3xl transition-all duration-500 group">
          {/* Decorative background blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl group-hover:bg-brand-primary/20 transition-all duration-700"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-purple/10 rounded-full blur-3xl group-hover:bg-brand-purple/20 transition-all duration-700"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16 relative z-10">
            
            {/* Left side: Image/Avatar */}
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-brand-primary to-brand-purple rounded-full blur opacity-50 transition duration-1000 animate-pulse"></div>
                <div className="relative w-56 h-56 lg:w-72 lg:h-72 rounded-full border-4 border-white dark:border-slate-800 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(0,0,0,0.3)]">
                  <img src="/founder.png" alt="Dhanraj Prajapati" className="w-full h-full object-cover object-top" />
                </div>
              </div>
            </div>

            {/* Right side: Text */}
            <div className="w-full md:w-2/3 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-sm font-bold tracking-wide uppercase shadow-sm">
                <Sparkles className="w-4 h-4" />
                <span>Meet Our Founder</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Dhanraj Prajapati
              </h2>
              
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Dhanraj Prajapati sir is highly skilled and has developed strong expertise as a <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-purple">Chemistry Expert</span>. He is known for solving complex questions using simple and effective <span className="font-bold text-brand-purple dark:text-brand-primary">Problem Solving Tricks</span>. With his dedication and knowledge, he has also reached the interview stage in multiple competitive exams, showcasing his academic strength and experience.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                <div className="flex items-center gap-3 glass dark:glass-dark px-5 py-3 rounded-2xl border border-white/40 dark:border-slate-700/50 shadow-sm hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
                    <Award className="text-brand-primary w-5 h-5" />
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Chemistry Expert</span>
                </div>
                <div className="flex items-center gap-3 glass dark:glass-dark px-5 py-3 rounded-2xl border border-white/40 dark:border-slate-700/50 shadow-sm hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center">
                    <Target className="text-brand-purple w-5 h-5" />
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Competitive Exams</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
