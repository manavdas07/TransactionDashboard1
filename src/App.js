import React from 'react';
import './App.css';
import Transactiontable from './Components/Transactiontable/Transactiontable';
import TransactionStatistics from './Components/TransactionStatistics/TransactionStatistics';
import TransactionBar from './Components/TransactionBar/TransactionBar';

function App() {
  return (
    <div className="App">
       <Transactiontable/>
       <TransactionStatistics/>
       <TransactionBar/>
    </div>
  );
}

export default App;
