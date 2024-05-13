import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Verification from './pages/Verification/Verification';
import Success from './pages/Success/Success';
import Failed from './pages/Success/Failed';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Verification />} />
      <Route exact path='/success' element={<Success/>} />
      <Route exact path='/failed' element={<Failed/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
