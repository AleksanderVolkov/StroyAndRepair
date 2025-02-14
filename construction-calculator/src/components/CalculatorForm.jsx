import { useState } from 'react';
import './CalculatorForm.scss';

export default function CalculatorForm() {
  const [area, setArea] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    setResult(area * 0.5);
  };

  return (
    <div className="calculator">
      <div className="calculator__group">
        <label>Площадь помещения (м²)</label>
        <input
          type="number"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="Введите площадь"
        />
      </div>

      <button onClick={calculate} className="calculator__btn">
        Рассчитать
      </button>

      {result && (
        <div className="calculator__result">
          Необходимо материалов: <strong>{result} кг</strong>
        </div>
      )}
    </div>
  );
}