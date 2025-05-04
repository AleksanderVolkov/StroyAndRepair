import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './AccountPage.scss';
import { useAuth } from '../context/AuthContext';
import API from '../api/index';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const { user } = useAuth();
  const [calculations, setCalculations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projects] = useState([
    { id: 1, name: 'Квартира 54м²', progress: 85, lastUpdate: '12.08.2023' },
    { id: 2, name: 'Дачный дом', progress: 45, lastUpdate: '05.08.2023' }
  ]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await API.get('/calculations/');
        setCalculations(data);
      } catch (error) {
        console.error('Error loading data:', error);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const [history] = useState([
    { id: 1, date: '2023-08-12', material: 'Плитка керамическая', amount: 150 },
    { id: 2, date: '2023-08-10', material: 'Гипсокартон', amount: 85 }
  ]);

  const sidebarVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <div className="account-page">
      <motion.nav 
        className="sidebar"
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="user-card">
          <div className="avatar">JD</div>
          <h3>John Doe</h3>
          <p>Профессиональный план</p>
        </div>

        <ul className="nav-menu">
          <li className="active">Мои проекты</li>
          <li>История расчетов</li>
          <li>Избранные материалы</li>
          <li>Настройки</li>
        </ul>
      </motion.nav>

      <div className="main-content">
        <motion.div 
          className="greeting"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Добро пожаловать, John!</h1>
          <p>Ваши последние действия:</p>
        </motion.div>

        <div className="dashboard-grid">
          <AnimatePresence>
            {projects.map(project => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ y: -5 }}
              >
                <h3>{project.name}</h3>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <p>Обновлен: {project.lastUpdate}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div 
          className="history-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2>История расчетов</h2>
          <table className="history-table">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Материал</th>
                <th>Количество</th>
              </tr>
            </thead>
            <tbody>
              {history.map(item => (
                <motion.tr
                  key={item.id}
                  whileHover={{ backgroundColor: 'rgba(42,95,127,0.05)' }}
                >
                  <td>{item.date}</td>
                  <td>{item.material}</td>
                  <td>{item.amount} м²</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default AccountPage;