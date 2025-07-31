import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { Homepage } from './pages/Homepage';
import { About } from './pages/About';
import { Portfolio } from './pages/Portfolio';
import { Booking } from './pages/Booking';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/" element={
              <Layout>
                <Homepage />
              </Layout>
            } />
            <Route path="/sobre" element={
              <Layout>
                <About />
              </Layout>
            } />
            <Route path="/portfolio" element={
              <Layout>
                <Portfolio />
              </Layout>
            } />
            <Route path="/agendamento" element={
              <Layout>
                <Booking />
              </Layout>
            } />
            <Route path="/contato" element={
              <Layout>
                <About />
              </Layout>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
