import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import { PaystackProvider } from "./contexts/PaystackContext";
import NavbarComponent from "@/components/NavbarComponent.jsx";
import Hero from "@/components/Hero.jsx";
import Values from "@/components/Values.jsx";
import WhoWeAre from "@/pages/WhoWeAre.jsx";
import OurFoundation from "@/pages/Foundation.jsx";
import Programs from "@/components/Programs.jsx";
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
import Contact from "@/pages/Contact.jsx";
import OurMandate from "@/pages/OurMandate.jsx";
import ImpactStories from "@/pages/ImpactStories.jsx";
import Career from "@/pages/Career.jsx";
import Partnership from "@/pages/Partnership.jsx";
import BlogSection from "@/components/BlogSection.jsx";
import TestimonialsSection from "@/components/TestimonialsSection.jsx";
import AdminDashboard from "@/pages/AdminDashboard.jsx";
import Login from "@/components/Login.jsx";
import ProtectedRoute from "@/components/ProtectedRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <PaystackProvider>
        <div style={{ width: "100vw", overflow: "hidden" }}>
          <Router>
            <Routes>

              <Route path="/" element={
                <div style={{ width: "100%", paddingTop: "80px" }}>
                  <NavbarComponent />
                  <Container>
                    <Hero />
                    <section id="about">
                      <WhoWeAre showFooter={false} />
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
                  <section id="gallery">
                    <Gallery />
                  </section>
                  <section id="blog">
                    <Container>
                      <BlogSection />
                      <TestimonialsSection />
                    </Container>
                  </section>
                  <Footer />
                </div>
              } />

              <Route path="/about" element={
                <>
                  <NavbarComponent />
                  <div style={{ paddingTop: "80px" }}>
                    <AboutPage />
                  </div>
                  <Footer />
                </>
              } />

              <Route path="/foundation" element={<OurFoundation />} />
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
              <Route path="/contact" element={<Contact />} />
              <Route path="/our-mandate" element={<OurMandate />} />
              <Route path="/impact-stories" element={<ImpactStories />} />
              <Route path="/career" element={<Career />} />
              <Route path="/partnership" element={<Partnership />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/login" element={<Login />} />
              <Route path="/who-we-are" element={
                <>
                  <NavbarComponent />
                  <div style={{ paddingTop: "80px" }}>
                    <WhoWeAre showFooter={false} />
                  </div>
                  <Footer />
                </>
              } />
              <Route path="/our-foundation" element={<OurFoundation />} />
              <Route path="/admin/*" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
          </Router>
        </div>
      </PaystackProvider>
    </AuthProvider>
  );
}

export default App;