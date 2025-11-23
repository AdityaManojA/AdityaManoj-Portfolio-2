import { GALLERY_DATA } from '../data';
import ScrollReveal from './ScrollReveal';

const Gallery = () => {
  return (
    <div className="section-container" style={{ padding: 0, maxWidth: '100%' }}>
      
      {/* 3D Animated Background Wrapper */}
      <div className="gallery-wrapper">
        
        {/* Background Elements */}
        <div className="perspective-grid"></div>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>

        {/* Content */}
        <div className="gallery-container-inner">
          <ScrollReveal>
            <div className="gallery-header-group">
              <span className="section-sub-header">Studio</span>
              <h2 className="gallery-title-3d">Visual Playground.</h2>
              <p className="gallery-sub-3d">
                A collection of my 3D renders, motion graphics, and visual experiments. 
                Welcome to the grid.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="premium-gallery-grid">
            {GALLERY_DATA.map((item, index) => (
              <ScrollReveal key={item.id} className="premium-gallery-item group" delay={index * 0.1}>
                <img src={item.image} alt={item.title} className="premium-gallery-img" />
                <div className="premium-overlay">
                  <span className="gallery-tag">{item.type}</span>
                  <h3 className="gallery-name">{item.title}</h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Gallery;