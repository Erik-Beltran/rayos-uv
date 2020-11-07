import logo from './logo.svg';
import './App.css';
import Graficas from './components/Graficas/Graficas';
import Recomendaciones from './components/Recomendaciones/Recomendaciones';

function App() {
  return (
    <div className="App">
      <Graficas />
      <Recomendaciones />
    </div>
  );
}

export default App;
