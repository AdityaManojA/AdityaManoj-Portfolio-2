import { GALLERY_DATA } from '../data';
import ScrollReveal from './ScrollReveal';

const Gallery = () => {
  return (
    <div className="section-container">
      <ScrollReveal>
        <span className="section-sub-header">Studio</span>
        <h2 className="section-title">A visual playground.</h2>
      </ScrollReveal>
      
      <div className="gallery-grid">
        {GALLERY_DATA.map((item, index) => (
          <ScrollReveal key={item.id} className="gallery-item group" delay={index * 0.05}>
            <img src={item.image} alt={item.title} className="gallery-img" />
            <div className="gallery-overlay">
              <span className="gallery-type">{item.type}</span>
              <h3 className="gallery-title">{item.title}</h3>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

export default Gallery;