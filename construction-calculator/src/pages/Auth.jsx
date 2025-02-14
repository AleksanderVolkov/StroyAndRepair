import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.scss';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/account'); // После успешной авторизации
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
        
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Пароль" required />
        
        {!isLogin && (
          <input type="password" placeholder="Повторите пароль" required />
        )}

        <button type="submit">
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>

        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin 
            ? 'Нет аккаунта? Зарегистрируйтесь' 
            : 'Уже есть аккаунт? Войдите'}
        </p>
      </form>
    </div>
  );
};

export default Auth;