import React from 'react';
import './styles.css';
import DeliveryFeeCalculator from './components/DeliveryFeeCalculator';

const App: React.FC = () => {
  return (
    <div className="App">
      <DeliveryFeeCalculator />
    </div>
  );
}

export default App;
