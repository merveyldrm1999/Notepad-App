import NavComponent from "./compenents/NavComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotCard from "./compenents/NotCard";
import AddNote from "./compenents/AddNote";
import { MainContext, useContext } from "./context";
import { useState } from "react";

function App() {
  const [nots, setNots] = useState([]);
  const [modalSendNote, setModalSendNote] = useState({});

  const data = { nots, setNots, modalSendNote, setModalSendNote };
  return (
    <MainContext.Provider value={data}>
      <BrowserRouter>
        <NavComponent />
        <Routes>
          <Route path="/notlariekle" element={<AddNote />} />
          <Route path="/" element={<NotCard />} />
        </Routes>
      </BrowserRouter>
    </MainContext.Provider>
  );
}

export default App;
