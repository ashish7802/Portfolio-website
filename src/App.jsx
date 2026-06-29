import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import AwesomeApiSkills from './components/sections/AwesomeApiSkills';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <AwesomeApiSkills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
