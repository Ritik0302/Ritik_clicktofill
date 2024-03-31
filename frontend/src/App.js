import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./Pages/Auth/LoginPage";
import FormPage from "./Pages/FormPage";
import Dashboard from "./Pages/Dashboard";
import SuccessPage from "./Pages/SuccessPage";
import Wrapper from "./Pages/Auth/Wrapper";
import Landing from "./components/Landing/Index"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Wrapper>
                <Dashboard />
              </Wrapper>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/FormPage" element={<FormPage />} />
          <Route path="/SuccessPage" element={<SuccessPage/>} />
          <Route path="/landing" element={<Landing/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
