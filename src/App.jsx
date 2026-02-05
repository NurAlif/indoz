import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Journey from './components/Journey';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light transition-colors duration-200">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Journey />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default App;
