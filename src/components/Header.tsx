import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0b]/90 backdrop-blur-sm border-b border-[#E9E4D0]/10">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="font-heading text-2xl text-[#E9E4D0] tracking-wider">
          ARTEUR
        </Link>
        <nav className="flex items-center gap-8">
          <a href="https://arteur-cars.vercel.app" className="btn-arteur" target="_blank" rel="noopener noreferrer">
            Home
          </a>
        </nav>
      </div>
    </header>
  );
}