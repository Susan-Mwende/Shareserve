import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import NavbarComponent from "@/components/NavbarComponent.jsx";
import Hero from "@/components/Hero.jsx";
import Values from "@/components/Values.jsx";
import Programs from "@/components/Programs.jsx";
import About from "@/components/About.jsx";
import Projects from "@/components/Projects.jsx";
import Impact from "@/components/Impact.jsx";
import Gallery from "@/components/Gallery.jsx";
import Footer from "@/components/Footer.jsx";
import AboutPage from "@/pages/AboutPage.jsx";
import AdminDashboard from "@/pages/AdminDashboard.jsx";
import Login from "@/components/Login.jsx";
import ProtectedRoute from "@/components/ProtectedRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <div style={{ width: "100vw", overflow: "hidden" }}>
        <Router>
          <Routes>
            <Route path="/" element={
              <div style={{ width: "100%", paddingTop: "80px" }}>
                <section>
                  <Container>
                    <NavbarComponent />
                    <Hero />
                    <section id="about">
                      <About />
                    </section>
                    <Values />
                    <section id="programs">
                      <Programs />
                    </section>
                    <section id="projects">
                      <Projects />
                    </section>
                    <Impact />
                  </Container>
                </section>
                <section id="gallery">
                  <Gallery />
                </section>

                {/* Professional Footer */}
                <footer id="footer">
                  <Footer />
                </footer>
              </div>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/about-full" element={<AboutPage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;