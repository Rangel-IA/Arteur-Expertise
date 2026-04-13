import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CarShowcase {
  id: string;
  name: string;
  challenge: string;
  solution: string;
  beforeImage: string;
  afterImage: string;
}

const cars: CarShowcase[] = [
  {
    id: 'ferrari-amalfi-spider',
    name: 'Ferrari Amalfi Spider',
    challenge: 'Oxidação severa da carroceria com perda de 70% do brilho original.',
    solution: 'Restauro completo com proteção cerâmica nano-glass e acabamento premium multicamadas.',
    beforeImage: '/assets/ferrari_amalfi_spider-d.webp',
    afterImage: '/assets/ferrari_amalfi_spider.webp',
  },
  {
    id: 'ferrari-f40',
    name: 'Ferrari F40',
    challenge: 'Pintura original comprometida por décadas de exposição ambiental.',
    solution: 'Detalhamento profundo com restauração de verniz original e polimento de precisão.',
    beforeImage: '/assets/ferrari_f40-d.webp',
    afterImage: '/assets/ferrari_f40.webp',
  },
  {
    id: 'ferrari-portofino',
    name: 'Ferrari Portofino',
    challenge: 'Marcas de uso intenso e oxidação nas superfícies pintadas.',
    solution: 'Polimento profissional e tratamento estético completo com coating cerâmico.',
    beforeImage: '/assets/ferrari_portofino-d.webp',
    afterImage: '/assets/ferrari_portofino.webp',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as any }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

export default function TechniqueShowcase() {
  const [activeCar, setActiveCar] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
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
    <section className="arteur-gallery">
      <motion.div 
        className="arteur-gallery__hero"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.span className="arteur-gallery__label" variants={fadeInUp}>
          Galeria Técnica
        </motion.span>
        <motion.h1 className="arteur-gallery__title" variants={fadeInUp}>
          Enge<span className="italic">nharia</span> Automotiva
        </motion.h1>
        <motion.p className="arteur-gallery__subtitle" variants={fadeInUp}>
          Transformações que revelam a essência original de cada máquina
        </motion.p>
      </motion.div>

      <div className="arteur-gallery__navigation">
        {cars.map((car, index) => (
          <button
            key={car.id}
            onClick={() => setActiveCar(index)}
            className={`arteur-gallery__nav-item ${activeCar === index ? 'active' : ''}`}
          >
            <span className="arteur-gallery__nav-index">0{index + 1}</span>
            <span className="arteur-gallery__nav-name">{car.name}</span>
          </button>
        ))}
      </div>

      <motion.div 
        ref={sliderRef}
        className="arteur-gallery__slider-container"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as any }}
      >
        <div 
          ref={containerRef}
          className="arteur-gallery__slider"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchMove}
        >
          <div className="arteur-gallery__slider-image arteur-gallery__slider-image--after">
            <img 
              src={cars[activeCar].afterImage} 
              alt={`${cars[activeCar].name} - Depois`}
              className="arteur-gallery__img"
            />
          </div>
          
          <div 
            className="arteur-gallery__slider-image arteur-gallery__slider-image--before"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img 
              src={cars[activeCar].beforeImage} 
              alt={`${cars[activeCar].name} - Antes`}
              className="arteur-gallery__img"
            />
          </div>

          <div 
            className="arteur-gallery__slider-divider"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="arteur-gallery__slider-handle">
              <span className="arteur-gallery__slider-line"></span>
              <span className="arteur-gallery__slider-line"></span>
            </div>
          </div>

          <div className="arteur-gallery__slider-label arteur-gallery__slider-label--before">
            ANTES
          </div>
          <div className="arteur-gallery__slider-label arteur-gallery__slider-label--after">
            DEPOIS
          </div>
        </div>

        <motion.div 
          className="arteur-gallery__details"
          key={cars[activeCar].id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
        >
          <h2 className="arteur-gallery__car-name">{cars[activeCar].name}</h2>
          <div className="arteur-gallery__car-info">
            <div className="arteur-gallery__car-info-item">
              <span className="arteur-gallery__car-info-label">Desafio</span>
              <span className="arteur-gallery__car-info-value">{cars[activeCar].challenge}</span>
            </div>
            <div className="arteur-gallery__car-info-item">
              <span className="arteur-gallery__car-info-label">Solução</span>
              <span className="arteur-gallery__car-info-value">{cars[activeCar].solution}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}