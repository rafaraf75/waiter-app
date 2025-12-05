// src/components/views/NavBar.js
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar
      bg="primary"
      variant="dark"
      className="mb-4 mt-3 rounded-3"
      expand="sm"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Waiter.app
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;