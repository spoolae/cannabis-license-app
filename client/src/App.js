import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginTest } from "./screens/LoginTest";
import { HomeTest } from "./screens/HomeTest";
import "./App.scss";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<LoginTest />} />
            <Route path="/logintest" element={<LoginTest />} />
            <Route path="/hometest" element={<HomeTest />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
