import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Test1 } from "./screens/Test1";
import { Test2 } from "./screens/Test2";
import "./App.scss";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Test1 />} />
          <Route path="/test1" element={<Test1 />} />
          <Route path="/test2" element={<Test2 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
