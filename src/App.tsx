import React, { FC } from 'react';
import './styles.css';
import DeliveryFeeCalculator from './components/DeliveryFeeCalculator';

const App: FC = () => {
  return (
    <div className="App">
      <DeliveryFeeCalculator />
    </div>
  );
}

export default App;
