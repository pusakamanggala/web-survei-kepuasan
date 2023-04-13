import React from "react";
import Login from "./pages/Login";
import DashboardLayout from "./layout/DashboardLayout";
import UserAccount from "./pages/UserAccount";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/beranda" element={<DashboardLayout></DashboardLayout>} />
        <Route
          path="/pengguna"
          element={
            <DashboardLayout>
              <UserAccount />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
