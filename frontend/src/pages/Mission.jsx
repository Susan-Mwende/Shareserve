import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./Mission.css";
import carousel3Image from "../assets/carousel3.jpeg";
import NavbarComponent from "@/components/NavbarComponent.jsx";
import Footer from "@/components/Footer.jsx";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

function Mission() {
  const [mission, setMission] = useState("Shareserve International is a mission driven organization working in rural Kenya to address environmental degradation and economic vulnerability through youth empowerment and sustainable solutions.");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMissionData();
  }, []);

  const fetchMissionData = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.ABOUT);
      if (response.data && response.data.mission) {
        setMission(response.data.mission);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch mission data:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div style={{ paddingTop: '80px' }}>
      <div className="mission-page-grid">
      <div className="mission-content-left">
        <Container>
          <div className="mission-content">
            <h1 className="mission-title">Our Mission</h1>
            <p className="mission-description">
              {mission}
            </p>
          </div>
        </Container>
      </div>
      <div className="mission-image-right">
        <img src={carousel3Image} alt="Environmental Mission" />
      </div>
      </div>
      </div>
      <Footer />
    </>
  );
}

export default Mission;
