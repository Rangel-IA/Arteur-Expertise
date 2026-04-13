import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-[#E9E4D0]/10 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Link to="/" className="font-heading text-2xl text-[#E9E4D0] tracking-wider">
            ARTEUR
          </Link>
          <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-[#E9E4D0]/60">
            <span>© 2026 Arteur. Todos os direitos reservados.</span>
          </div>
          <a href="https://arteur-cars.vercel.app" className="btn-arteur btn-arteur-secondary" target="_blank" rel="noopener noreferrer">
            Home
          </a>
        </div>
      </div>
    </footer>
  );
}