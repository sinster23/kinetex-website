import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './sections/Home';
import About from './sections/About';
import Domain from './sections/Domain';
import SignIn from "../auth/signIn";
  // Import with PascalCase

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">

        {/* Navigation */}
        <nav>
          <Link to="/signin"></Link> {/* Router link */}
        </nav>

        <Routes>
          {/* Landing page with sections */}
          <Route
            path="/"
            element={
              <>
                {/* Hero Section */}
                <section id="hero" className="min-h-screen">
                  <Home />
                </section>

                {/* About Section */}
                <section id="about" className="min-h-screen">
                  <About />
                </section>

                {/* Domain Section */}
                <section id="domain" className="min-h-screen">
                  <Domain />
                </section>
              </>
            }
          />

          {/* Sign In page */}
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
