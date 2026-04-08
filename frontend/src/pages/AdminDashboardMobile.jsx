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
import logo from "../assets/ShareServe logo.jpeg";

const AdminDashboardMobile = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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

  const handleMobileNavigation = () => {
    closeMobileMenu();
  };

  const sidebarItems = [
    { path: "/admin", label: "Dashboard", icon: "fas fa-tachometer-alt" },
    { path: "/admin/programs", label: "Programs", icon: "fas fa-clipboard-list" },
    { path: "/admin/engagement", label: "Engagement", icon: "fas fa-handshake" },
    { path: "/admin/beneficiaries", label: "Beneficiaries", icon: "fas fa-users" },
    ...(user?.role === 'super_admin' ? [
      { path: "/admin/admins", label: "Admin Management", icon: "fas fa-user-shield" },
      { path: "/admin/sessions", label: "Session Monitoring", icon: "fas fa-search" }
    ] : [])
  ];

  // Force mobile styles on mount
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflowX = 'hidden';
    document.body.style.width = '100vw';
    document.body.style.minWidth = '100vw';
    document.body.style.maxWidth = '100vw';
    document.body.style.display = 'block';
    document.body.style.placeItems = 'unset';
    
    const root = document.getElementById('root');
    if (root) {
      root.style.width = '100vw';
      root.style.overflowX = 'hidden';
      root.style.margin = '0';
      root.style.padding = '0';
    }
  }, []);

  return (
    <div style={{
      width: '100vw',
      maxWidth: '100vw',
      margin: '0',
      padding: '0',
      overflowX: 'hidden',
      position: 'relative',
      left: '0',
      right: '0'
    }}>
      {/* Mobile Menu Overlay */}
      <div 
        style={{
          display: mobileMenuOpen ? 'block' : 'none',
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: '9998'
        }}
        onClick={closeMobileMenu}
      ></div>

      {/* Mobile Sidebar */}
      <div 
        style={{
          display: mobileMenuOpen ? 'block' : 'none',
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          zIndex: '9999',
          background: '#198754'
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          color: 'white'
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <img 
              src={logo} 
              alt="ShareServe" 
              style={{ 
                height: "40px",
                borderRadius: "8px"
              }} 
            />
            <button 
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '0.5rem'
              }}
              onClick={closeMobileMenu}
            >
              ×
            </button>
          </div>

          {/* Navigation */}
          <Nav style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
            flex: '1'
          }}>
            {sidebarItems.map((item) => (
              <Nav.Item key={item.path} style={{ marginBottom: '0.5rem' }}>
                <Nav.Link
                  as={Link}
                  to={item.path}
                  onClick={handleMobileNavigation}
                  style={{
                    color: 'white',
                    borderRadius: '8px',
                    padding: '1rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    background: location.pathname === item.path ? 'rgba(255,255,255,0.2)' : 'transparent'
                  }}
                >
                  <i className={item.icon} style={{ fontSize: '1.2rem', marginRight: '1rem' }}></i>
                  {item.label}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        width: '100vw',
        maxWidth: '100vw',
        margin: '0',
        padding: '0',
        overflowX: 'hidden',
        position: 'relative',
        left: '0',
        right: '0'
      }}>
        {/* Top Bar */}
        <div style={{
          background: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          padding: '0.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #dee2e6',
          width: '100vw',
          position: 'relative',
          left: '0',
          right: '0'
        }}>
          <button
            style={{
              background: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              padding: '0.5rem',
              cursor: 'pointer'
            }}
            onClick={toggleMobileMenu}
          >
            <i className="fas fa-bars"></i>
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '1rem', textAlign: 'right' }}>
              <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                {user ? `${user.firstName} ${user.lastName}` : 'Admin User'}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>
                {user?.role || 'Admin'}
              </div>
            </div>
            
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="outline-secondary"
                style={{ borderRadius: '20px', padding: '0.25rem 0.5rem' }}
              >
                <i className="fas fa-user-circle"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  ⚙️ Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item 
                  onClick={handleLogout}
                  style={{ color: '#dc3545' }}
                >
                  🚪 Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {/* Page Content */}
        <Container style={{
          padding: '0.5rem',
          width: '100vw',
          maxWidth: '100vw',
          margin: '0',
          overflowX: 'hidden'
        }}>
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
    </div>
  );
};

export default AdminDashboardMobile;
