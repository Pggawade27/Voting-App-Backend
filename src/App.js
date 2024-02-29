import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar'
import Add from './components/pages/Add';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/add' element={<Add />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
