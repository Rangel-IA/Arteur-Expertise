export default function Footer() {
  return (
    <footer className="arteur-footer">
      <div className="arteur-footer__container">
        <div className="arteur-footer__main">
          
          <div className="arteur-footer__col-brand">
            <span className="arteur-footer__logo">ARTEUR</span>
            <p className="arteur-footer__tagline">
              Especialistas em detail e restauro de alta performance.
            </p>
          </div>

          <nav className="arteur-footer__col-nav">
            <h4 className="arteur-footer__col-label">Navegação</h4>
            <ul className="arteur-footer__nav-list">
              <li><a href="#showcase">Vitrine</a></li>
              <li><a href="#technique">Técnica</a></li>
              <li><a href="https://arteur-cars.vercel.app" target="_blank" rel="noopener noreferrer">Home</a></li>
            </ul>
          </nav>

        </div>

        <div className="arteur-footer__bottom">
          <div className="arteur-footer__divider" />
          <div className="arteur-footer__bottom-content">
            <p className="arteur-footer__copyright">
              © {new Date().getFullYear()} ARTEUR — Todos os direitos reservados.
            </p>
            <a href="https://arteur-cars.vercel.app" className="arteur-footer__cta" target="_blank" rel="noopener noreferrer">
              HOME
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}