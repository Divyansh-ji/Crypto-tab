import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import Home from "./pages/Home/Home";
import Coin from "./pages/Coin/Coin";
import NewsPage from "./pages/News/News";

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:coinId" element={<Coin />} />
        <Route path="/news" element={<NewsPage />} />
      </Routes>
    </div>
  );
};

export default App;
