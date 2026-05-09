import { useState } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Nav, Card, Dropdown, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import DashboardHome from "../components/admin/DashboardHome.jsx";
import ProgramManagement from "../components/admin/ProgramManagement.jsx";
import AboutManagement from "../components/admin/AboutManagement.jsx";
import ContactManagement from "../components/admin/ContactManagement.jsx";
import AdminManagement from "../components/admin/AdminManagement.jsx";
import DonationManagement from "../components/admin/DonationManagement.jsx";
import SessionMonitoring from "../components/admin/SessionMonitoring.jsx";
import logo from "../assets/ShareServe logo.jpeg";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarItems = [
    { path: "/admin", label: "Dashboard", icon: "📊" },
    { path: "/admin/programs", label: "Programs", icon: "📋" },
    { path: "/admin/engagement", label: "Engagement", icon: "🤝" },
    { path: "/admin/beneficiaries", label: "Beneficiaries", icon: "👥" },
    ...(user?.role === 'super_admin' ? [
      { path: "/admin/admins", label: "Admin Management", icon: "👤" },
      { path: "/admin/sessions", label: "Session Monitoring", icon: "🔍" }
    ] : [])
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen ? "250px" : "80px",
          backgroundColor: "#198754",
          minHeight: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          transition: "width 0.3s ease",
          zIndex: 1000,
        }}
        className="admin-sidebar"
      >
        <div className="p-3">
          <div
            className="text-white mb-4"
            style={{
              fontSize: sidebarOpen ? "1.5rem" : "1rem",
              fontWeight: "bold",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <img 
              src={logo} 
              alt="ShareServe" 
              style={{ 
                height: sidebarOpen ? "50px" : "30px", 
                marginBottom: "10px",
                borderRadius: "8px"
              }}
            />
            {sidebarOpen && "SHARESERVE"}
          </div>
          
          <Nav className="flex-column">
            {sidebarItems.map((item) => (
              <Nav.Item key={item.path} className="mb-2">
                <Nav.Link
                  as={Link}
                  to={item.path}
                  className={`text-white ${
                    location.pathname === item.path
                      ? "bg-success"
                      : "hover-bg-success"
                  }`}
                  style={{
                    borderRadius: "8px",
                    padding: "12px 16px",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "1.2rem", marginRight: sidebarOpen ? "12px" : "0" }}>
                    {item.icon}
                  </span>
                  {sidebarOpen && <span>{item.label}</span>}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: sidebarOpen ? "250px" : "80px",
          transition: "margin-left 0.3s ease",
          minHeight: "100vh",
        }}
        className="admin-content"
      >
        {/* Top Bar */}
        <div
          className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center"
          style={{ borderBottom: "1px solid #dee2e6" }}
        >
          <button
            className="btn btn-outline-secondary d-md-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          
          <div className="d-flex align-items-center">
            <div className="me-3 text-end">
              <div className="fw-bold">{user ? `${user.firstName} ${user.lastName}` : 'Admin User'}</div>
              <div className="text-muted small">{user?.role || 'Administrator'}</div>
              {user?.lastLogin && (
                <div className="text-muted small">
                  Last login: {new Date(user.lastLogin).toLocaleString()}
                </div>
              )}
            </div>
            
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="outline-secondary"
                id="user-dropdown"
                className="d-flex align-items-center"
                style={{ border: "none", background: "transparent" }}
              >
                <div
                  className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                  style={{ width: "40px", height: "40px" }}
                >
                  {user ? `${user.firstName[0]}${user.lastName[0]}` : "AD"}
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Header>
                  <div className="fw-bold">{user ? `${user.firstName} ${user.lastName}` : 'Admin User'}</div>
                  <div className="text-muted small">{user?.email}</div>
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => navigate('/admin/profile')}>
                  👤 Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/admin/settings')}>
                  ⚙️ Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item 
                  onClick={handleLogout}
                  className="text-danger"
                >
                  🚪 Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {/* Page Content */}
        <Container fluid className="p-4">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/programs" element={<ProgramManagement />} />
            <Route path="/engagement" element={<AboutManagement />} />
            <Route path="/beneficiaries" element={<DonationManagement />} />
            {user?.role === 'super_admin' && (
              <>
                <Route path="/admins" element={<AdminManagement />} />
                <Route path="/sessions" element={<SessionMonitoring />} />
              </>
            )}
          </Routes>
        </Container>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .admin-sidebar {
            width: 80px !important;
          }
          .admin-content {
            margin-left: 80px !important;
          }
          .d-md-none {
            display: block !important;
          }
        }
        
        @media (max-width: 576px) {
          .admin-sidebar {
            width: 60px !important;
          }
          .admin-content {
            margin-left: 60px !important;
          }
          .container-fluid {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
