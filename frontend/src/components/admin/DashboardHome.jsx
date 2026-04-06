import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card, ProgressBar, Table } from "react-bootstrap";
import { API_ENDPOINTS } from "../../config/api.js";

const DashboardHome = () => {
  const [dashboardData, setDashboardData] = useState({
    totalBeneficiaries: 0,
    totalSchools: 0,
    totalTrainings: 0,
    totalHouseholds: 0,
    recentProjects: [],
    programs: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch programs data like the Impact section
        const programsResponse = await axios.get(API_ENDPOINTS.PROGRAMS);
        const programs = programsResponse.data;
        
        // Calculate totals like the Impact section
        const totalBeneficiaries = programs.reduce((sum, program) => sum + (program.beneficiaries || 0), 0);
        const totalSchools = programs.reduce((sum, program) => {
          return sum + (program.category === 'Education' ? 1 : 0);
        }, 0);
        const totalTrainings = programs.reduce((sum, program) => {
          return sum + (program.category === 'Health' ? 1 : 0);
        }, 0);
        const totalHouseholds = programs.reduce((sum, program) => {
          return sum + (program.category === 'Livelihood' ? 1 : 0);
        }, 0);

        // Get recent projects
        const recentProjects = programs
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        // Calculate program progress by category
        const educationPrograms = programs.filter(p => p.category === 'Education');
        const healthPrograms = programs.filter(p => p.category === 'Health');
        const livelihoodPrograms = programs.filter(p => p.category === 'Livelihood');

        setDashboardData({
          totalBeneficiaries,
          totalSchools,
          totalTrainings,
          totalHouseholds,
          recentProjects,
          programs,
          educationProgress: educationPrograms.length > 0 ? 
            Math.min((educationPrograms.filter(p => p.status === 'completed').length / educationPrograms.length) * 100, 100) : 0,
          healthProgress: healthPrograms.length > 0 ? 
            Math.min((healthPrograms.filter(p => p.status === 'completed').length / healthPrograms.length) * 100, 100) : 0,
          livelihoodProgress: livelihoodPrograms.length > 0 ? 
            Math.min((livelihoodPrograms.filter(p => p.status === 'completed').length / livelihoodPrograms.length) * 100, 100) : 0,
          totalProjects: programs.length,
          activeProjects: programs.filter(p => p.status === 'active').length,
          completedProjects: programs.filter(p => p.status === 'completed').length
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    { title: "Total Beneficiaries", value: dashboardData.totalBeneficiaries.toLocaleString(), icon: "👥", color: "primary" },
    { title: "Active Projects", value: dashboardData.activeProjects || "0", icon: "📊", color: "success" },
    { title: "Schools Supported", value: dashboardData.totalSchools.toLocaleString(), icon: "🏫", color: "info" },
  ];

  const programProgress = [
    { category: "Education", progress: dashboardData.educationProgress || 0 },
    { category: "Health", progress: dashboardData.healthProgress || 0 },
    { category: "Livelihood", progress: dashboardData.livelihoodProgress || 0 },
  ];

  const budgetUsage = dashboardData.totalProjects > 0 ? 
    Math.min((dashboardData.completedProjects / dashboardData.totalProjects) * 100, 100) : 0;

  if (loading) {
    return <div className="text-center p-4">Loading dashboard...</div>;
  }

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      
      {/* Stats Cards */}
      <Row className="mb-4">
        {stats.map((stat, index) => (
          <Col md={4} key={index} className="mb-3">
            <Card className={`border-0 shadow-sm bg-${stat.color} text-white`}>
              <Card.Body className="d-flex align-items-center">
                <div className="me-3" style={{ fontSize: "2rem" }}>
                  {stat.icon}
                </div>
                <div>
                  <Card.Title className="mb-0">{stat.value}</Card.Title>
                  <Card.Text className="mb-0">{stat.title}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        {/* Programs Progress */}
        <Col md={6} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Programs progress</h5>
            </Card.Header>
            <Card.Body>
              {programProgress.map((program, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span>{program.category}</span>
                    <span>{Math.round(program.progress)}%</span>
                  </div>
                  <ProgressBar now={program.progress} variant="primary" />
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        {/* Budget Usage */}
        <Col md={6} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Project Completion</h5>
            </Card.Header>
            <Card.Body className="text-center">
              <div style={{ position: "relative", width: "200px", height: "200px", margin: "0 auto" }}>
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background: `conic-gradient(#0d6efd 0% ${budgetUsage}%, #e9ecef ${budgetUsage}% 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      backgroundColor: "white",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{Math.round(budgetUsage)}%</div>
                    <div className="text-muted">Projects completed</div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Projects */}
      <Row>
        <Col md={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Recent Projects</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Beneficiaries</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentProjects.length > 0 ? (
                    dashboardData.recentProjects.map((project, index) => (
                      <tr key={project._id}>
                        <td>{project.title}</td>
                        <td>{project.category}</td>
                        <td>{project.location}</td>
                        <td>
                          <span className={`badge bg-${
                            project.status === 'active' ? 'success' : 
                            project.status === 'completed' ? 'primary' : 'warning'
                          }`}>
                            {project.status}
                          </span>
                        </td>
                        <td>{project.beneficiaries || 0}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">No projects available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardHome;
