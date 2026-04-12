import { Container } from "react-bootstrap";
import "./Vision.css";
const babyImage = "/baby.jpeg";

function Vision() {
  return (
    <div className="vision-page-grid">
      <div className="vision-content-left">
        <Container>
          <div className="vision-content">
            <h1 className="vision-title">Our Vision</h1>
            <p className="vision-description">
              To raise and equip 100,000+ young environmental champions through education, tree growing and community driven environmental action.
            </p>
            <div className="vision-future">
              <p className="mb-2">We envision a future where:</p>
              <ul className="vision-list">
                <li>✅ Communities are environmentally conscious</li>
                <li>✅ Youth lead conservation efforts</li>
                <li>✅ Sustainable practices are the norm</li>
                <li>✅ Kenya's environment is restored and protected</li>
              </ul>
            </div>
          </div>
        </Container>
      </div>
      <div className="vision-image-right">
        <img src={babyImage} alt="Vision for Future" />
      </div>
    </div>
  );
}

export default Vision;
