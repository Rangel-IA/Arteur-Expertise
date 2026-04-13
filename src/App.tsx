import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TechniqueShowcase } from './components/TechniqueShowcase';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0a0b] flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          <TechniqueShowcase />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;