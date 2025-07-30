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
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/sobre" element={<About />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/agendamento" element={<Booking />} />
                  <Route path="/contato" element={<About />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
