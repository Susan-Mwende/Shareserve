import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { API_ENDPOINTS } from "../config/api.js";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(API_ENDPOINTS.DASHBOARD)
      .then(res => setData(res.data));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={4}>
          <Card className="p-3 shadow">
            <h3>{data.projectsRunning}</h3>
            <p>Projects Running</p>
          </Card>
        </Col>
      </Row>

      <h4 className="mt-5">Upcoming Activities</h4>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.activities.map((act) => (
            <tr key={act._id}>
              <td>{act.name}</td>
              <td>{act.date}</td>
              <td>{act.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Dashboard;
