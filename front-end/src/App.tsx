import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/Home";
import TutorRegisterPage from "./pages/Tutor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tutor" element={<TutorRegisterPage />} />
    </Routes>
  );
}

export default App;
