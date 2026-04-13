import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TechniqueShowcase from './components/TechniqueShowcase';
import './components/header.css';
import './components/footer.css';
import './components/showcase.css';

function App() {
  return (
    <BrowserRouter>
      <div className="arteur-app">
        <Header />
        <main className="arteur-main">
          <TechniqueShowcase />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;