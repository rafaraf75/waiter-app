import { Container, Navbar } from 'react-bootstrap';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import TableDetails from './pages/TableDetails';

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand href="/">Waiter App</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table/:id" element={<TableDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;