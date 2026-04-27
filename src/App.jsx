import Menu from './components/Menu.jsx';
import HeroSection from './components/HeroSection.jsx';
import NosotrosSection from './components/NosotrosSection.jsx';
import EventsSection from './components/EventsSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';
import './index.css';

function App() {
  return (
    <>
      <Menu />
      <main>
        <HeroSection />
        <NosotrosSection />
        <EventsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
