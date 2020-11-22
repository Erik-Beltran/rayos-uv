import "./App.css";
import "../node_modules/react-vis/dist/style.css";
import "../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
