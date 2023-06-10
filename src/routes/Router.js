import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import DashboardLayout from "../layout/DashboardLayout";
import UserAccount from "../pages/UserAccount";
import HomeAdmin from "../pages/HomeAdmin";
import PageNotFound from "../pages/PageNotFound";
import AddUser from "../pages/AddUser";
import Classes from "../pages/Classes";
import ClassDetails from "../pages/ClassDetails";
import AddClass from "../pages/AddClass";
import Questions from "../pages/Questions";
import AddSurveyTemplate from "../pages/AddSurveyTemplate";
import SurveyTemplates from "../pages/SurveyTemplates";
import AddSurvey from "../pages/AddSurvey";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import jwtDecode from "jwt-decode";
import MyProfile from "../pages/MyProfile";
import MySurvey from "../pages/MySurvey";
import FillSurvey from "../pages/FillSurvey";
import SurveyHistory from "../pages/SurveyHistory";
import SurveyHistoryDetail from "../pages/SurveyHistoryDetail";
import Home from "../pages/Home";
import SurveyList from "../pages/SurveyList";
import SurveyRecap from "../pages/SurveyRecap";

const Router = () => {
  const cookies = document.cookie.split(";"); // Get cookies
  const { userRole, setUser, survey } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthorized = () => {
    const cookieName = "Authorization";

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.startsWith(`${cookieName}=`)) {
        // Get the value of the Authorization cookie
        const token = cookie.substring(cookieName.length + 1);

        // Check if the cookie value is a JWT
        const parts = token.split(".");
        if (parts.length === 3) {
          try {
            // Decode the JWT header
            const header = JSON.parse(atob(parts[0]));

            // Check if the decoded header has the required properties for a JWT
            if (
              header &&
              typeof header === "object" &&
              header.alg &&
              header.typ
            ) {
              return true;
            }
          } catch (error) {
            // Ignore decoding error and continue checking other cookies
          }
        }
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

  // wait for userRole to be available
  useEffect(() => {
    if (userRole !== "") {
      setIsLoading(false);
    }
  }, [userRole]);

  if (isLoading) {
    // Render a loading state or a placeholder until userRole is available
    return (
      <div className="h-screen bg-gray-100 flex items-center justify-center"></div>
    );
  }

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
                {userRole === "ADMIN" && <HomeAdmin />}
                {(userRole === "MAHASISWA" ||
                  userRole === "DOSEN" ||
                  userRole === "ALUMNI") && <Home />}
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
              path="/survei-kepuasan/survei-aktif/tambah"
              element={
                <DashboardLayout>
                  <AddSurvey />
                </DashboardLayout>
              }
            />
            <Route
              path="/survei-kepuasan/tambah-survei"
              element={
                <DashboardLayout>
                  <AddSurvey />
                </DashboardLayout>
              }
            />
            <Route
              path="/survei-kepuasan/laporan-survei"
              element={
                <DashboardLayout>
                  <SurveyList />
                </DashboardLayout>
              }
            />
            <Route
              path="/survei-kepuasan/laporan-survei/:role/:idSurvey"
              element={
                <DashboardLayout>
                  <SurveyHistoryDetail />
                </DashboardLayout>
              }
            />
            <Route
              path="/survei-kepuasan/laporan-survei/rekap-survei/:role/:survey"
              element={
                <DashboardLayout>
                  <SurveyRecap />
                </DashboardLayout>
              }
            />
          </>
        )}

        {(userRole === "MAHASISWA" ||
          userRole === "ALUMNI" ||
          userRole === "DOSEN") &&
          isAuthenticated && (
            <>
              <Route
                path="/profil"
                element={
                  <DashboardLayout>
                    <MyProfile />
                  </DashboardLayout>
                }
              />
              <Route
                path="/survei-kepuasan/survei-saya"
                element={
                  <DashboardLayout>
                    <MySurvey />
                  </DashboardLayout>
                }
              />
              {survey && (
                <Route
                  path="/survei-kepuasan/survei-saya/:idSurvey"
                  element={
                    <DashboardLayout>
                      <FillSurvey />
                    </DashboardLayout>
                  }
                />
              )}
              <Route
                path="/survei-kepuasan/riwayat-survei"
                element={
                  <DashboardLayout>
                    <SurveyHistory />
                  </DashboardLayout>
                }
              />
              <Route
                path="/survei-kepuasan/riwayat-survei/hasil-survei/:idSurvey"
                element={
                  <DashboardLayout>
                    <SurveyHistoryDetail />
                  </DashboardLayout>
                }
              />
            </>
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
