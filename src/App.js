import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./pages/Login";
import DashboardLayout from "./layout/DashboardLayout";
import UserAccount from "./pages/UserAccount";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import AddUser from "./pages/AddUser";
import Classes from "./pages/Classes";
import ClassDetails from "./pages/ClassDetails";
import AddClass from "./pages/AddClass";
import Questions from "./pages/Questions";
import AddSurveyTemplate from "./pages/AddSurveyTemplate";
import SurveyTemplates from "./pages/SurveyTemplates";
import ActiveSurveys from "./pages/ActiveSurveys";
import AddSurvey from "./pages/AddSurvey";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
            path="/pengguna/:role"
            element={
              <DashboardLayout>
                <UserAccount />
              </DashboardLayout>
            }
          />
          <Route
            path="/pengguna/tambah/:role"
            element={
              <DashboardLayout>
                <AddUser />
              </DashboardLayout>
            }
          />
          <Route
            path="/kelas"
            element={
              <DashboardLayout>
                <Classes />
              </DashboardLayout>
            }
          />
          <Route
            path="/kelas/tambah"
            element={
              <DashboardLayout>
                <AddClass />
              </DashboardLayout>
            }
          />
          <Route
            path="/kelas/:id"
            element={
              <DashboardLayout>
                <ClassDetails />
              </DashboardLayout>
            }
          />
          <Route
            path="/survei-kepuasan/pertanyaan"
            element={
              <DashboardLayout>
                <Questions />
              </DashboardLayout>
            }
          />
          <Route
            path="/survei-kepuasan/template-survei/"
            element={
              <DashboardLayout>
                <SurveyTemplates />
              </DashboardLayout>
            }
          />
          <Route
            path="/survei-kepuasan/template-survei/tambah"
            element={
              <DashboardLayout>
                <AddSurveyTemplate />
              </DashboardLayout>
            }
          />
          <Route
            path="/survei-kepuasan/survei-aktif"
            element={
              <DashboardLayout>
                <ActiveSurveys />
              </DashboardLayout>
            }
          />
          <Route
            path="/survei-kepuasan/survei-aktif/tambah"
            element={
              <DashboardLayout>
                <AddSurvey />
              </DashboardLayout>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
