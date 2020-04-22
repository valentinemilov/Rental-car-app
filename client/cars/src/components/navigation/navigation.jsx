import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './navigation.css';

function Navigation() {
  return (
    // <Navbar className="asd" sticky="top" collapseOnSelect expand="lg">
    //   <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //   <Navbar.Collapse id="responsive-navbar-nav">
    //     <Nav className="mr-auto">
    //       <Navbar.Brand>
    //         <NavLink to="/dashboard" activeStyle={{ color: '#f2f2f2' }}>Dashboard</NavLink>
    //       </Navbar.Brand>
    //       <Navbar.Brand>
    //         <NavLink exact to="/" activeStyle={{ color: '#f2f2f2' }}>Cars</NavLink>
    //       </Navbar.Brand>
    //     </Nav>
    //   </Navbar.Collapse>
    // </Navbar>
    <nav className="navigation">
      <ul>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink exact to="/">Cars</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
