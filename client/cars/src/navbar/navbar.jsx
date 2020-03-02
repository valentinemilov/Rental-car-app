import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Navbar.Brand>
            <Link to="/dashboard">Dashboard</Link>
          </Navbar.Brand>
          <Navbar.Brand>
            <Link to="/">Cars</Link>
          </Navbar.Brand>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
