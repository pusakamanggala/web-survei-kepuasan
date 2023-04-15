import React from "react";
import Login from "./pages/Login";
import DashboardLayout from "./layout/DashboardLayout";
import UserAccount from "./pages/UserAccount";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/beranda"
          element={
            <DashboardLayout>
              <Home />
            </DashboardLayout>
          }
        />
        <Route
          path="/pengguna"
          element={
            <DashboardLayout>
              <UserAccount />
            </DashboardLayout>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
