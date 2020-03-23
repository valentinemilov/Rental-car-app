import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Navbar.Brand>
            <NavLink to="/dashboard" activeStyle={{ color: '#f2f2f2' }}>Dashboard</NavLink>
          </Navbar.Brand>
          <Navbar.Brand>
            <NavLink exact to="/" activeStyle={{ color: '#f2f2f2' }}>Cars</NavLink>
          </Navbar.Brand>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
