import { TIMELINE_DATA } from '../data';

const Timeline = () => {
  return (
    <div className="section-container">
      <span className="section-sub-header">Journey</span>
      <h2 className="section-title">My Path So Far.</h2>
      
      <div className="timeline-container">
        {TIMELINE_DATA.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot"></div>
            <span className="timeline-year">{item.year}</span>
            <h3 className="timeline-title">{item.title}</h3>
            <p className="timeline-desc">{item.description}</p>
            <span className="text-xs text-gray-400 mt-2 block font-mono">{item.location}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;