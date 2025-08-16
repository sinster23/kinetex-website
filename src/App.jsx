import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './sections/Home';
import About from './sections/About';
import Domain from './sections/Domain';
import Resource from './sections/Resource';
import SignIn from "../auth/signIn"; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing page with scrollable sections */}
          <Route
            path="/"
            element={
              <>
                <section id="hero" className="min-h-screen">
                  <Home />
                </section>
                
                <section id="about" className="min-h-screen">
                  <About />
                </section>
                
                <section id="domain" className="min-h-screen">
                  <Domain />
                </section>
                
                <section id="resources" className="min-h-screen">
                  <Resource />
                </section>
              </>
            }
          />
          
          {/* Sign In page - separate route */}
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;