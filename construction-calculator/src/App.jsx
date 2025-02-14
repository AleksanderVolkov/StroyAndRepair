import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import Account from './pages/AccountPage';
import Auth from './pages/Auth'; // Импортируем компонент страницы авторизации

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/account" element={<Account />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}