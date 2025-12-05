import { Container } from 'react-bootstrap';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import TableDetails from './pages/TableDetails';
import Header from './components/views/Header';
import Footer from './components/views/Footer';

function App() {
  return (
    <Container>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:id" element={<TableDetails />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </Container>
  );
}

export default App;