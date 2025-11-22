import { GALLERY_DATA } from '../data';

const Gallery = () => {
  return (
    <div className="section-container">
      <span className="section-sub-header">Studio</span>
      <h2 className="section-title">A visual playground.</h2>
      
      <div className="gallery-grid">
        {GALLERY_DATA.map((item) => (
          <div key={item.id} className="gallery-item group">
            <img src={item.image} alt={item.title} className="gallery-img" />
            <div className="gallery-overlay">
              <span className="gallery-type">{item.type}</span>
              <h3 className="gallery-title">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;