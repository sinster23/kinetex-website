import { useState } from 'react'
import Home from './sections/Home'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <section id="hero" className="h-screen">
      <Home />
    </section>
  );
}

export default App
