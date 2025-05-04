import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.scss';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    password2: '' 
  });
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (!isLogin && formData.password !== formData.password2) {
      setError('Пароли не совпадают');
      return;
    }
  
    try {
      let success;
      if (isLogin) {
        success = await login({
          email: formData.email,
          password: formData.password
        });
      } else {
        // Добавляем password2 для регистрации
        success = await register({
          email: formData.email,
          password: formData.password,
          password2: formData.password2
        });
      }
  
      if (success) {
        navigate('/account');
      } else {
        setError(isLogin 
          ? 'Неверный email или пароль' 
          : 'Ошибка регистрации. Возможно, пользователь уже существует');
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('Произошла ошибка. Попробуйте позже');
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
        
        {error && <div className="error-message">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
        />
        
        <input
          type="password"
          placeholder="Пароль"
          required
          minLength="6"
          value={formData.password}
          onChange={e => setFormData({...formData, password: e.target.value})}
        />
        
        {!isLogin && (
          <input
            type="password"
            placeholder="Повторите пароль"
            required
            minLength="6"
            value={formData.password2}
            onChange={e => setFormData({...formData, password2: e.target.value})}
          />
        )}

        <button type="submit">
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>

        <p className="toggle-auth" onClick={() => setIsLogin(!isLogin)}>
          {isLogin 
            ? 'Нет аккаунта? Зарегистрируйтесь' 
            : 'Уже есть аккаунт? Войдите'}
        </p>
      </form>
    </div>
  );
};

export default Auth;