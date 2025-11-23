import { TIMELINE_DATA } from '../data';
import ScrollReveal from './ScrollReveal';

const Timeline = () => {
  return (
    <div className="section-container">
      <ScrollReveal>
        <span className="section-sub-header">Journey</span>
        <h2 className="section-title">My Path So Far.</h2>
      </ScrollReveal>
      
      {/* Main Container */}
      <div className="relative max-w-5xl mx-auto py-20">
        
        {/* Central Spine */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent md:-translate-x-1/2"></div>

        {TIMELINE_DATA.map((item, index) => (
          <div key={index} className={`relative flex flex-col md:flex-row items-center justify-between mb-12 w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            
            {/* Empty space for alternating layout */}
            <div className="hidden md:block w-[45%]"></div>

            {/* Spine Marker */}
            <div className="absolute left-4 md:left-1/2 -translate-x-[5px] md:-translate-x-1/2 flex items-center justify-center z-10">
              <div className="w-4 h-4 bg-[#FFF0E3] dark:bg-[#111111] border-4 border-[#FF9F68] rounded-full shadow-[0_0_0_4px_rgba(255,159,104,0.2)]"></div>
            </div>

            {/* Content Card */}
            <ScrollReveal 
              className="w-full md:w-[45%] pl-12 md:pl-0" 
              delay={index * 0.1}
            >
              <div className="bg-white/80 dark:bg-[#1c1c1c]/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-[#FF9F68] transition-all duration-300 group relative overflow-hidden">
                
                {/* --- FIXED: CLEAN WATERMARK YEAR --- */}
                <div className="absolute -top-6 -right-4 text-[6rem] font-black text-[#FF9F68] opacity-[0.07] select-none pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:opacity-[0.15] z-0">
                  {item.year}
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{item.description}</p>
                  
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-500">{item.location}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;