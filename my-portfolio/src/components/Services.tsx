import { SERVICES_DATA } from '../data';

const Services = () => {
  
  // Helper to render icon based on string
  const renderIcon = (iconName: string) => {
    switch(iconName) {
      case 'code': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />;
      case 'cube': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />;
      case 'server': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />;
      case 'video': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />;
      default: return null;
    }
  };

  return (
    <div className="section-container">
      <span className="section-sub-header">Services</span>
      <h2 className="section-title">What I can do for you.</h2>
      
      <div className="services-grid">
        {SERVICES_DATA.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon-box">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {renderIcon(service.icon)}
              </svg>
            </div>
            <h3 className="service-title">{service.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;