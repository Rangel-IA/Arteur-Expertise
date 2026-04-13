import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CarShowcase {
  id: string;
  name: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

const cars: CarShowcase[] = [
  {
    id: 'ferrari-amalfi-spider',
    name: 'Ferrari Amalfi Spider',
    description: 'Restauro completo com proteção cerâmica e acabamento premium.',
    beforeImage: '/assets/ferrari_amalfi_spider-d.webp',
    afterImage: '/assets/ferrari_amalfi_spider.webp',
  },
  {
    id: 'ferrari-f40',
    name: 'Ferrari F40',
    description: 'Detalhamento profundo e restauração de pintura original.',
    beforeImage: '/assets/ferrari_f40-d.webp',
    afterImage: '/assets/ferrari_f40.webp',
  },
  {
    id: 'ferrari-portofino',
    name: 'Ferrari Portofino',
    description: 'Polimento profissional e tratamento estético completo.',
    beforeImage: '/assets/ferrari_portofino-d.webp',
    afterImage: '/assets/ferrari_portofino.webp',
  },
];

export default function TechniqueShowcase() {
  const [activeCar, setActiveCar] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  return (
    <section id="showcase" className="arteur-showcase">
      <div className="arteur-showcase__container">
        
        <motion.div 
          className="arteur-showcase__header"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="arteur-showcase__label">SEÇÃO TÉCNICA</span>
          <h1 className="arteur-showcase__title">
            VITRINE TÉCNICA
          </h1>
          <p className="arteur-showcase__subtitle">
            Transformação completa: antes e depois do detalhamento profissional
          </p>
        </motion.div>

        <div className="arteur-showcase__tabs">
          {cars.map((car, index) => (
            <button
              key={car.id}
              onClick={() => setActiveCar(index)}
              className={`arteur-showcase__tab ${activeCar === index ? 'active' : ''}`}
            >
              {car.name}
            </button>
          ))}
        </div>

        <motion.div 
          ref={containerRef}
          className="arteur-showcase__slider"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchMove}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="arteur-showcase__slider-wrapper">
            <div className="arteur-showcase__image-container">
              <img 
                src={cars[activeCar].afterImage} 
                alt={`${cars[activeCar].name} - Depois`}
                className="arteur-showcase__image"
              />
              <div className="arteur-showcase__label-overlay arteur-showcase__label-overlay--after">
                DEPOIS
              </div>
            </div>
            
            <motion.div 
              className="arteur-showcase__image-container arteur-showcase__image-container--before"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img 
                src={cars[activeCar].beforeImage} 
                alt={`${cars[activeCar].name} - Antes`}
                className="arteur-showcase__image"
              />
              <div className="arteur-showcase__label-overlay arteur-showcase__label-overlay--before">
                ANTES
              </div>
            </motion.div>

            <div 
              className="arteur-showcase__divider"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="arteur-showcase__divider-handle">
                <span className="arteur-showcase__divider-line"></span>
                <span className="arteur-showcase__divider-line"></span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="arteur-showcase__info"
          key={cars[activeCar].id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="arteur-showcase__car-name">{cars[activeCar].name}</h2>
          <p className="arteur-showcase__car-description">{cars[activeCar].description}</p>
        </motion.div>

      </div>
    </section>
  );
}