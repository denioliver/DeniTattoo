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

// Componente wrapper para páginas com Layout
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Layout>{children}</Layout>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Rotas sem Layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            
            {/* Rotas com Layout */}
            <Route path="/" element={<LayoutWrapper><Homepage /></LayoutWrapper>} />
            <Route path="/sobre" element={<LayoutWrapper><About /></LayoutWrapper>} />
            <Route path="/portfolio" element={<LayoutWrapper><Portfolio /></LayoutWrapper>} />
            <Route path="/agendamento" element={<LayoutWrapper><Booking /></LayoutWrapper>} />
            <Route path="/contato" element={<LayoutWrapper><About /></LayoutWrapper>} />
            
            {/* Fallback para rotas não encontradas */}
            <Route path="*" element={<LayoutWrapper><Homepage /></LayoutWrapper>} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
