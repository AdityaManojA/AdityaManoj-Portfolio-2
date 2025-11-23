import { TIMELINE_DATA } from '../data';
import ScrollReveal from './ScrollReveal';

const Timeline = () => {
  return (
    <div className="section-container relative z-10">
      <ScrollReveal>
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[#FF9F68] font-bold tracking-widest uppercase text-sm">Journey</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">My Path So Far.</h2>
        </div>
      </ScrollReveal>
      
      {/* Main Container */}
      <div className="relative max-w-5xl mx-auto">
        
        {/* Glowing Central Spine */}
        {/* Light Mode: Gray-300 | Dark Mode: Gray-800 */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-800 to-transparent md:-translate-x-1/2"></div>

        {TIMELINE_DATA.map((item, index) => (
          <div key={index} className={`relative flex flex-col md:flex-row items-center justify-between mb-16 w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            
            {/* Empty space for alternating layout */}
            <div className="hidden md:block w-[45%]"></div>

            {/* Spine Marker (The Dot) */}
            <ScrollReveal 
              className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20"
              delay={index * 0.1}
            >
              <div className="relative flex items-center justify-center">
                {/* Dot Background matches App Background (#FFF0E3 for light, #111 for dark) */}
                <div className="w-4 h-4 bg-[#FFF0E3] dark:bg-[#111] border-2 border-[#FF9F68] rounded-full z-10"></div>
                <div className="absolute w-8 h-8 bg-[#FF9F68]/20 rounded-full animate-pulse"></div>
              </div>
            </ScrollReveal>

            {/* Connecting Beam (Horizontal Line) - Desktop Only */}
            <div className={`hidden md:block absolute top-1/2 w-[5%] h-[2px] bg-[#FF9F68]/30 z-0 
                ${index % 2 === 0 ? 'left-[50%]' : 'right-[50%]'}
            `}></div>

            {/* Content Card */}
            <ScrollReveal 
              className="w-full md:w-[45%] pl-20 md:pl-0" 
              delay={index * 0.1 + 0.1}
            >
              <div className="group relative bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-white/5 hover:border-[#FF9F68]/50 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(255,159,104,0.15)] shadow-sm">
                
                {/* Top Gradient Highlight */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF9F68] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Year Badge */}
                <div className="inline-block px-4 py-1 rounded-full bg-[#FF9F68]/10 border border-[#FF9F68]/20 text-[#FF9F68] font-bold text-sm mb-4">
                  {item.year}
                </div>

                {/* Title: Dark text in light mode, White in dark mode */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#FF9F68] transition-colors">
                  {item.title}
                </h3>
                
                {/* Description: Gray text for both, adjusted shades */}
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
                
                {/* Footer Location */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-white/5">
                  <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-500">
                    {item.location}
                  </span>
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