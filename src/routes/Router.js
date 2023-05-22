import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import DashboardLayout from "../layout/DashboardLayout";
import UserAccount from "../pages/UserAccount";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import AddUser from "../pages/AddUser";
import Classes from "../pages/Classes";
import ClassDetails from "../pages/ClassDetails";
import AddClass from "../pages/AddClass";
import Questions from "../pages/Questions";
import AddSurveyTemplate from "../pages/AddSurveyTemplate";
import SurveyTemplates from "../pages/SurveyTemplates";
import ActiveSurveys from "../pages/ActiveSurveys";
import AddSurvey from "../pages/AddSurvey";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import jwtDecode from "jwt-decode";
import MyProfile from "../pages/MyProfile";

const Router = () => {
  const cookies = document.cookie.split(";"); // Get cookies
  const { userRole, setUser } = useContext(UserContext);

  const isAuthorized = () => {
    const cookieName = "Authorization";

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.startsWith(`${cookieName}=`)) {
        return true;
      }
    }

    return false;
  };

  const isAuthenticated = isAuthorized();

  useEffect(() => {
    if (isAuthenticated) {
      const decodedToken = jwtDecode(
        document.cookie.split("Authorization=")[1].split(";")[0]
      );

      setUser(decodedToken.role, decodedToken.userId);
    }
  }, [setUser, isAuthenticated]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/beranda" /> : <Login />}
        />
        <Route
          path="/beranda"
          element={
            isAuthenticated ? (
              <DashboardLayout>
                <Home />
              </DashboardLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {userRole === "ADMIN" && isAuthenticated && (
          <>
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
          </>
        )}

        {(userRole === "MAHASISWA" ||
          userRole === "ALUMNI" ||
          userRole === "DOSEN") &&
          isAuthenticated && (
            <Route
              path="/profil"
              element={
                <DashboardLayout>
                  <MyProfile />
                </DashboardLayout>
              }
            />
          )}

        <Route
          path="*"
          element={isAuthenticated ? <PageNotFound /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
