import { Route, Routes } from "react-router-dom";
import { About } from "./pages/About";
import { Quotes } from "./pages/Quotes";
import { NotFound } from "./pages/NotFound";
import { Layout } from "./components/Layout";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<About />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
