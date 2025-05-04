import React, { useState, useEffect } from 'react';
import API from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './Loader';
import './CalculatorForm.scss';

const CalculatorForm = ({ onClose, onCalculate }) => {
  const [calcType, setCalcType] = useState('');
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);
  const [calculationTypes, setCalculationTypes] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    API.get('/calculation-types/')
      .then(res => setCalculationTypes(res.data))
      .catch(err => console.error(err));
  }, []);

  const validateField = (name, value) => {
    if (!value || value <= 0) return 'Поле обязательно для заполнения';
    return null;
  };

  const handleCalculate = async () => {
    const newErrors = {};
    const numericParams = {};

    // Преобразование и валидация параметров
    calculationTypes[calcType]?.fields?.forEach(field => {
      const value = parseFloat(inputs[field.name]);

      if (isNaN(value) || value <= 0) {
        newErrors[field.name] = 'Введите корректное число';
      } else {
        numericParams[field.name] = value;
      }
    });

    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

    setLoading(true);
    try {
      const { data } = await API.post('/calculations/', {
        type: calcType,
        params: numericParams // Отправляем числовые значения
      });

      setResult(data.result);
      onCalculate && onCalculate(data);

    } catch (error) {
      console.error('Ошибка расчета:', error.response?.data);
      setErrors({ general: error.response?.data?.error || 'Ошибка сервера' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (fieldName, value) => {
    const numericValue = parseFloat(value);
    setInputs(prev => ({
      ...prev,
      [fieldName]: isNaN(numericValue) ? '' : numericValue
    }));
    setErrors(prev => ({ ...prev, [fieldName]: null }));
  };

  return (
    <motion.div
      className="calculator-modal"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="calculator-header">
        <h2>Калькулятор материалов</h2>
        {onClose && <button className="close-btn" onClick={onClose}>×</button>}
      </div>

      <div className="calculator-body">
        <div className="form-group">
          <label>Тип расчета:</label>
          <select
            value={calcType}
            onChange={(e) => {
              setCalcType(e.target.value);
              setInputs({});
              setErrors({});
            }}
            className="type-select"
          >
            <option value="">Выберите тип расчета</option>
            {Object.entries(calculationTypes).map(([key, item]) => (
              <option key={key} value={key}>{item.name}</option>
            ))}
          </select>
        </div>

        <div className="input-grid">
          {calcType && calculationTypes[calcType]?.fields?.map(field => (
            <div key={field.name} className="form-group">
              <label>{field.label}</label>
              <input
                type={field.type || 'number'}
                step={field.step || 1}
                value={inputs[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className={errors[field.name] ? 'error' : ''}
              />
              {errors[field.name] &&
                <span className="error-message">{errors[field.name]}</span>}
            </div>
          ))}
        </div>

        {loading ? (
          <Loader />
        ) : (
          <button
            className="calculate-btn"
            onClick={handleCalculate}
            disabled={!calcType}
          >
            Рассчитать
          </button>
        )}

        <AnimatePresence>
          {result && (
            <motion.div
              className="result-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3>Результаты расчета</h3>
              {Object.entries(result).map(([key, value]) => (
                <div key={key} className="result-item">
                  <span className="result-key">{key}:</span>
                  <span className="result-value">{value}</span>
                </div>
              ))}
              <button
                className="save-btn"
                onClick={() => onClose()}
              >
                Сохранить и закрыть
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CalculatorForm;