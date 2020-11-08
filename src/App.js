import "./App.css";
import Graficas from "./components/Graficas/Graficas";
import Recomendaciones from "./components/Recomendaciones/Recomendaciones";
import "../node_modules/react-vis/dist/style.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Graficas />
      <Recomendaciones />
      <Footer />
    </div>
  );
}

export default App;
