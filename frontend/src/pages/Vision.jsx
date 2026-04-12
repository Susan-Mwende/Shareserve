import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./Vision.css";
import NavbarComponent from "@/components/NavbarComponent.jsx";
import Footer from "@/components/Footer.jsx";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";
const babyImage = "/baby.jpeg";

function Vision() {
  const [vision, setVision] = useState("To raise and equip 100,000+ young environmental champions through education, tree growing and community driven environmental action.");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisionData();
  }, []);

  const fetchVisionData = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.ABOUT);
      if (response.data && response.data.vision) {
        setVision(response.data.vision);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch vision data:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div style={{ paddingTop: '80px' }}>
      <div className="vision-page-grid">
      <div className="vision-content-left">
        <Container>
          <div className="vision-content">
            <h1 className="vision-title">Our Vision</h1>
            <p className="vision-description">
              {vision}
            </p>
          </div>
        </Container>
      </div>
      <div className="vision-image-right">
        <img src={babyImage} alt="Vision for Future" />
      </div>
      </div>
      </div>
      <Footer />
    </>
  );
}

export default Vision;
