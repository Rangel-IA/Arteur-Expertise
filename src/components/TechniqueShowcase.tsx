import { useState, useRef, useEffect } from 'react';

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

export function TechniqueShowcase() {
  const [activeCar, setActiveCar] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };
    
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  return (
    <section className="section-padding bg-[#0a0a0b]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl text-[#E9E4D0] text-center mb-4">
          VITRINE TÉCNICA
        </h2>
        <p className="text-[#E9E4D0]/60 text-center mb-16 max-w-2xl mx-auto">
          Transformação completa: antes e depois do detalhamento profissional
        </p>

        <div className="mb-12 flex justify-center gap-4">
          {cars.map((car, index) => (
            <button
              key={car.id}
              onClick={() => setActiveCar(index)}
              className={`btn-arteur ${activeCar === index ? 'bg-[#E9E4D0] text-[#0a0a0b]' : ''}`}
            >
              {car.name}
            </button>
          ))}
        </div>

        <div 
          ref={containerRef}
          className="relative aspect-[16/9] overflow-hidden cursor-ew-resize select-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleMouseMove}
        >
          <div className="absolute inset-0">
            <img 
              src={cars[activeCar].afterImage} 
              alt={`${cars[activeCar].name} - Depois`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img 
              src={cars[activeCar].beforeImage} 
              alt={`${cars[activeCar].name} - Antes`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div 
            className="absolute top-0 bottom-0 w-1 bg-[#E9E4D0] cursor-ew-resize"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#E9E4D0] rounded-full flex items-center justify-center">
              <div className="flex gap-0.5">
                <span className="w-0.5 h-3 bg-[#0a0a0b]"></span>
                <span className="w-0.5 h-3 bg-[#0a0a0b]"></span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 bg-[#0a0a0b]/80 px-4 py-2">
            <span className="text-xs uppercase tracking-widest text-[#E9E4D0]">Antes</span>
          </div>
          <div className="absolute bottom-4 right-4 bg-[#E9E4D0]/20 px-4 py-2">
            <span className="text-xs uppercase tracking-widest text-[#E9E4D0]">Depois</span>
          </div>
        </div>

        <div className="text-center mt-8">
          <h3 className="font-heading text-2xl text-[#E9E4D0] mb-2">
            {cars[activeCar].name}
          </h3>
          <p className="text-[#E9E4D0]/60">
            {cars[activeCar].description}
          </p>
        </div>
      </div>
    </section>
  );
}