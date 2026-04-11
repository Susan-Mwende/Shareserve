import { useState, useEffect } from "react";
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
import GalleryManagement from "../components/admin/GalleryManagement.jsx";
import logo from "../assets/ShareServe logo.jpeg";
import "./AdminDashboard.css";
import "./AdminDashboardMobile.css";
import AdminDashboardMobile from "./AdminDashboardMobile.jsx";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767.98);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Force mobile layout with DOM manipulation
  useEffect(() => {
    if (isMobile) {
      // Force body styles
      document.body.style.display = 'block';
      document.body.style.placeItems = 'unset';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.overflowX = 'hidden';
      document.body.style.width = '100vw';
      document.body.style.minWidth = '100vw';
      document.body.style.maxWidth = '100vw';
      
      // Force html styles
      document.documentElement.style.overflowX = 'hidden';
      document.documentElement.style.width = '100vw';
      
      // Force root styles
      const root = document.getElementById('root');
      if (root) {
        root.style.display = 'block';
        root.style.width = '100vw';
        root.style.overflowX = 'hidden';
        root.style.position = 'relative';
        root.style.left = '0';
        root.style.right = '0';
        root.style.transform = 'none';
      }
      
      // Force admin content styles
      const adminContent = document.querySelector('.admin-content');
      if (adminContent) {
        adminContent.style.marginLeft = '0';
        adminContent.style.width = '100vw';
        adminContent.style.maxWidth = '100vw';
        adminContent.style.position = 'relative';
        adminContent.style.left = '0';
        adminContent.style.right = '0';
        adminContent.style.transform = 'none';
        adminContent.style.overflowX = 'hidden';
      }
      
      // Force container styles
      const containers = document.querySelectorAll('.container-fluid');
      containers.forEach(container => {
        container.style.width = '100vw';
        container.style.maxWidth = '100vw';
        container.style.margin = '0';
        container.style.padding = '0 0.25rem';
        container.style.overflowX = 'hidden';
      });
      
      // Force row styles
      const rows = document.querySelectorAll('.row');
      rows.forEach(row => {
        row.style.width = '100vw';
        row.style.margin = '0';
        row.style.padding = '0';
        row.style.display = 'flex';
        row.style.flexWrap = 'wrap';
      });
      
      // Force column styles
      const cols = document.querySelectorAll('.col, .col-md-6, .col-md-4, .col-md-8, .col-md-12');
      cols.forEach(col => {
        col.style.width = '100%';
        col.style.maxWidth = '100%';
        col.style.margin = '0';
        col.style.padding = '0.125rem';
        col.style.boxSizing = 'border-box';
      });
    }
  }, [isMobile]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Close mobile menu when navigating
  const handleMobileNavigation = () => {
    closeMobileMenu();
  };

  // Force mobile styles
  const contentStyle = isMobile ? {
    marginLeft: "0 !important",
    width: "100vw !important",
    maxWidth: "100vw !important",
    position: "relative !important",
    left: "0 !important",
    right: "0 !important",
    transform: "none !important",
    overflowX: "hidden !important",
    transition: "none !important"
  } : {
    marginLeft: sidebarOpen ? "250px" : "80px",
    transition: "margin-left 0.3s ease",
    minHeight: "100vh",
  };

  const topBarStyle = isMobile ? {
    padding: "0.75rem !important",
    width: "100vw !important",
    maxWidth: "100vw !important",
    left: "0 !important",
    right: "0 !important",
    transform: "none !important",
    margin: "0 !important",
    borderBottom: "1px solid #dee2e6"
  } : {
    borderBottom: "1px solid #dee2e6"
  };

  const mainContentStyle = isMobile ? {
    padding: "0.5rem !important",
    width: "100vw !important",
    maxWidth: "100vw !important",
    left: "0 !important",
    right: "0 !important",
    transform: "none !important",
    margin: "0 !important",
    overflowX: "hidden !important"
  } : {};

  const sidebarItems = [
    { path: "/admin", label: "Dashboard", icon: "fas fa-tachometer-alt" },
    { path: "/admin/programs", label: "Programs", icon: "fas fa-clipboard-list" },
    { path: "/admin/engagement", label: "Engagement", icon: "fas fa-handshake" },
    { path: "/admin/beneficiaries", label: "Beneficiaries", icon: "fas fa-users" },
    { path: "/admin/gallery", label: "Gallery", icon: "fas fa-images" },
    ...(user?.role === 'super_admin' ? [
      { path: "/admin/admins", label: "Admin Management", icon: "fas fa-user-shield" },
      { path: "/admin/sessions", label: "Session Monitoring", icon: "fas fa-search" }
    ] : [])
  ];

  return (
    <>
      {isMobile ? (
        <AdminDashboardMobile />
      ) : (
        <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
          {/* Sidebar */}
          <div
            className={`admin-sidebar ${sidebarOpen ? "" : "collapsed"}`}
            style={{
              width: sidebarOpen ? "250px" : "80px",
              transition: "width 0.3s ease",
              height: "100vh",
              position: "fixed",
              left: "0",
              top: "0",
              backgroundColor: "#198754",
              color: "white",
              overflowY: "auto",
              zIndex: "1000",
            }}
          >
            {/* Logo */}
            <div
              className="sidebar-logo"
              style={{
                textAlign: "center",
                padding: "20px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
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
              <div className="d-flex align-items-center justify-content-between w-100">
                <span className={`sidebar-logo-text ${sidebarOpen ? "" : "d-none"}`}>SHARESERVE</span>
                <button
                  className="mobile-close-btn d-lg-none"
                  onClick={closeMobileMenu}
                  style={{ display: mobileMenuOpen ? "block" : "none" }}
                >
                  ×
                </button>
              </div>
            </div>

            <Nav className="flex-column">
              {sidebarItems.map((item) => (
                <Nav.Item key={item.path} className="mb-2">
                  <Nav.Link
                    as={Link}
                    to={item.path}
                    onClick={handleMobileNavigation}
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
                      <i className={item.icon}></i>
                    </span>
                    <span className={`sidebar-text ${sidebarOpen ? "" : "d-none"}`}>{item.label}</span>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>

          {/* Mobile Menu Overlay */}
          <div
            className={`mobile-menu-overlay ${mobileMenuOpen ? "show" : ""}`}
            onClick={closeMobileMenu}
          ></div>

          {/* Main Content */}
          <div style={contentStyle} className="admin-content">
            {/* Top Bar */}
            <div
              className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center top-bar"
              style={topBarStyle}
            >
              <button
                className="btn btn-outline-secondary mobile-menu-toggle"
                onClick={toggleMobileMenu}
              >
                <i className="fas fa-bars"></i>
              </button>

              <div className="d-flex align-items-center user-info">
                <div className="me-3 text-end user-details">
                  <div className="fw-bold">{user ? `${user.firstName} ${user.lastName}` : 'Admin User'}</div>
                  <div className="text-muted small">{user?.role || 'Admin'}</div>
                </div>
                {user && (
                  <div className="user-avatar" style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#198754',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>
                    {user.firstName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="outline-secondary"
                  style={{ borderRadius: "20px", padding: "0.25rem 0.5rem" }}
                >
                  <i className="fas fa-user-circle"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    ⚙️ Settings
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger">
                    🚪 Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* Page Content */}
            <Container fluid className="p-4 main-content" style={mainContentStyle}>
              <Routes>
                <Route path="/" element={<DashboardHome />} />
                <Route path="/programs" element={<ProgramManagement />} />
                <Route path="/engagement" element={<AboutManagement />} />
                <Route path="/beneficiaries" element={<DonationManagement />} />
                <Route path="/gallery" element={<GalleryManagement />} />
                {user?.role === 'super_admin' && (
                  <>
                    <Route path="/admins" element={<AdminManagement />} />
                    <Route path="/sessions" element={<SessionMonitoring />} />
                  </>
                )}
              </Routes>
            </Container>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
