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
import Mission from "@/pages/Mission.jsx";
import Vision from "@/pages/Vision.jsx";
import ValuesPage from "@/pages/Values.jsx";
import MeetOurTeam from "@/pages/MeetOurTeam.jsx";
import Education from "@/pages/Education.jsx";
import Livelihood from "@/pages/Livelihood.jsx";
import Environment from "@/pages/Environment.jsx";
import Health from "@/pages/Health.jsx";
import Blog from "@/pages/Blog.jsx";
import Events from "@/pages/Events.jsx";
import Testimonials from "@/pages/Testimonials.jsx";
import Partner from "@/pages/Partner.jsx";
import BlogSection from "@/components/BlogSection.jsx";
import TestimonialsSection from "@/components/TestimonialsSection.jsx";
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
                <section id="blog">
                  <Container>
                    <BlogSection />
                  </Container>
                </section>
                <section id="testimonials">
                  <Container>
                    <TestimonialsSection />
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
            <Route path="/about" element={
              <>
                <NavbarComponent />
                <div style={{ paddingTop: '80px' }}>
                  <About />
                </div>
                <Footer />
              </>
            } />
            <Route path="/about-full" element={<AboutPage />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/values" element={<ValuesPage />} />
            <Route path="/team" element={<MeetOurTeam />} />
            <Route path="/education" element={<Education />} />
            <Route path="/livelihood" element={<Livelihood />} />
            <Route path="/environment" element={<Environment />} />
            <Route path="/health" element={<Health />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/events" element={<Events />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/partner" element={<Partner />} />
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