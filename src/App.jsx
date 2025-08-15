import { useState } from 'react'
import Home from './sections/Home'
import About from './sections/About' 
import Domain from './sections/Domain'
import './App.css'

function App() {
  return (
    <div className="App">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen">
        <Home />
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen">
        <About />
      </section>

      
      {/* Domain Section */}
      <section id="about" className="min-h-screen">
        <Domain />
      </section>
    </div>
  );
}

export default App