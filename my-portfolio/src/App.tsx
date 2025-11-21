import { useState, useEffect } from 'react';

// Images
const profilePic = "https://lh3.googleusercontent.com/aida-public/AB6AXuAgJAkmeJPKoPBkjXQUTgxeGZkZsbsUqtfFkCeDLy1EDVhHItA55DeZBToUtVX8FymAQWxd5kuWHbSoGkoKNmuyAsTaii5dfiWSpHZEWWJvwSKXuONeRE6aG7L-CEf7C4Coy4tNVcPCr-obzt9CSmtbUs-fqqx0b3RQwln40ynLvxo0bRvAsUd_t8iHOZ8n0MT38ixQSOX7W6DRqoQNb03cw4-itQ3KNv7QhiBEDC1z5Ca8U4_1poKNj66KsKRsGpzyUlXpOBRWiJQ";
const abstractDesign = "https://lh3.googleusercontent.com/aida-public/AB6AXuB4TSZG623fVFcFxDYmcwydlX7ZXsGarKxR4QCwYZbqoCQqKLhsIzWbJ1t8zVJuNTqDg-edJ9lnKWafUdwzvrLf6XjzS0eHh_oGYgUOHbGIg_aWQrNXD5Ot0YiQBuemQ0tolE6sOvU2jSQXmAnFwnkQuWljlbdUyqrSbWPc1pFplvUHBVwcngnmGb8E2gyt6Vfjs_0nJPORaJhMxvedbO9HLs1Vy8rb-SW_xn-MdmTzwu9nj9MinckZhEM5eiNZE4u8plOjXBYYw4s";
const footerImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuCZR0qY4ZcmpegAjitD_84MLI8L1ZCTBMF5wyUTA5-sxGsZ_d6wcl-t3ClbHUEJ-t2wOOgxq6jxuPcRe7CqrjF9fmNQLh1IvHeFSKo4EQmk5ekKXRzSxABCHm0R_Zssr_gXrFIj49jY2uoYshNHfx0zraub7M-WCV1OHEncf_QXae3Wxq9-73XGT8zbJ854qbMctr2SNbASo1wlp4OF17t3Ez45QO4jhRt7ZD0y7Rc8HvEptOXfP7p-cPnHFs0wfJxZMj5mwwStLVw";

// --- Components ---

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedMode = localStorage.getItem('theme');
    if (storedMode) return storedMode === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleMode = () => setIsDarkMode(!isDarkMode);

  return (
    <button 
      onClick={toggleMode}
      className={`
        relative h-16 w-32 sm:h-20 sm:w-40 md:h-24 md:w-48 rounded-full 
        flex items-center transition-all duration-500 ease-in-out focus:outline-none 
        ${isDarkMode ? 'bg-gray-800' : 'bg-[#FF9F68]'}
      `}
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div 
        className={`
          absolute h-14 w-14 sm:h-18 sm:w-18 md:h-22 md:w-22 rounded-full overflow-hidden border-2 border-transparent
          transform transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
          ${isDarkMode ? 'translate-x-[4.5rem] sm:translate-x-[5.5rem] md:translate-x-[6.5rem]' : 'translate-x-1 sm:translate-x-1'}
        `}
      >
        <img 
          src={profilePic} 
          alt="Toggle Theme" 
          className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all"
        />
      </div>
    </button>
  );
};

const Footer = () => {
  return (
    <footer className="p-4 sm:p-6 lg:p-8 w-full mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#f5f5f5] dark:bg-[#1c1c1c] rounded-[1.5rem] shadow-sm p-8 sm:p-12 lg:p-16 transition-colors duration-300">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
            
            {/* Left Side: Image & Text */}
            <div className="flex-1 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <img 
                alt="Illustration of a person waving with a peace sign" 
                className="w-32 h-32 md:w-40 md:h-40 object-contain shrink-0" 
                src={footerImage} 
              />
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1c1c] dark:text-[#e5e5e5] mb-3">
                  Say hello!
                </h2>
                <p className="text-[#a3a3a3] dark:text-[#737373] max-w-sm">
                  I'd love to hear from you and always welcome any feedback — please don't hesitate to get in touch!
                </p>
              </div>
            </div>

            {/* Right Side: Socials & CTA */}
            <div className="flex-1 flex flex-col md:flex-row items-center justify-center md:justify-end gap-6">
              <div className="flex items-center gap-6">
                {/* GitHub */}
                <a aria-label="GitHub" className="text-[#a3a3a3] dark:text-[#737373] hover:text-[#1c1c1c] dark:hover:text-[#e5e5e5] transition-colors" href="#">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                </a>
                {/* Email */}
                <a aria-label="Email" className="text-[#a3a3a3] dark:text-[#737373] hover:text-[#1c1c1c] dark:hover:text-[#e5e5e5] transition-colors" href="mailto:example@email.com">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </a>
                {/* LinkedIn */}
                <a aria-label="LinkedIn" className="text-[#a3a3a3] dark:text-[#737373] hover:text-[#1c1c1c] dark:hover:text-[#e5e5e5] transition-colors" href="#">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                </a>
              </div>
              
              <a className="whitespace-nowrap inline-block px-8 py-3 rounded-full border border-[#a3a3a3]/50 dark:border-[#737373]/50 text-[#1c1c1c] dark:text-[#e5e5e5] font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors" href="#">
                 Say hey!
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-[#FFF0E3] dark:bg-[#111111] font-display text-[#1C1C1E] dark:text-[#E5E5E7] transition-colors duration-300 selection:bg-orange-500 selection:text-white flex flex-col">
      
      {/* Header */}
      <header className="w-full max-w-[90rem] mx-auto px-6 py-8 flex justify-between items-center">
        {/* Logo Icon */}
        <a href="#" className="group">
          <div className="w-10 h-10 rounded-full border border-gray-800 dark:border-gray-200 flex items-center justify-center overflow-hidden relative">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-800 dark:text-gray-200 group-hover:rotate-180 transition-transform duration-500" fill="currentColor">
               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
        </a>

        {/* Hamburger Menu (Visual Only) */}
        <button className="flex flex-col gap-1.5 p-2 group hover:gap-2 transition-all">
          <div className="w-8 h-[2px] bg-gray-800 dark:bg-gray-200"></div>
          <div className="w-8 h-[2px] bg-gray-800 dark:bg-gray-200"></div>
          <div className="w-8 h-[2px] bg-gray-800 dark:bg-gray-200"></div>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 mt-10 sm:mt-20 text-center">
        
        {/* Hero Section */}
        <div className="w-full">
          {/* Line 1: Hello [Toggle] I'm John */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-2">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none">
              Hello
            </h1>
            
            {/* The Toggle Button */}
            <DarkModeToggle />

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none">
              I'm John
            </h1>
          </div>

          {/* Line 2: I design [Shape] stuff */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 md:gap-x-8 mt-2 sm:mt-6">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none">
              I design
            </h1>
            
            <div className="h-16 sm:h-20 md:h-24 lg:h-28 rounded-full overflow-hidden flex items-center">
              <img 
                src={abstractDesign} 
                alt="Design Element" 
                className="h-full w-auto object-cover animate-pulse"
              />
            </div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none">
              stuff
            </h1>
          </div>
        </div>

        {/* Description Text */}
        <p className="mt-12 max-w-3xl text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
          I'm passionate about my work because I believe that good design can make a real difference in the world — it can help businesses attract new customers, build stronger relationships, and create a more positive brand image.
        </p>

        {/* Social Pills */}
        <div className="mt-16 mb-24 flex flex-wrap justify-center gap-4">
          {['Dribbble', 'Behance', 'Behance', 'Instagram'].map((platform, i) => (
            <a 
              key={i}
              href="#"
              className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors text-sm font-semibold uppercase tracking-wide"
            >
              {platform}
            </a>
          ))}
        </div>

      </main>
      
      {/* About Peek Section */}
      <div className="w-full bg-[#1C1C1E] py-24 px-6 rounded-t-[3rem]">
         <div className="max-w-7xl mx-auto">
             <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">About me</span>
             <h2 className="text-white text-5xl font-bold mt-4">Solving big user...</h2>
         </div>
      </div>

      {/* Added Footer */}
      <Footer />

    </div>
  );
}