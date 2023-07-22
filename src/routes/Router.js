import React, { useContext, useEffect, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import DashboardLayout from "../layout/DashboardLayout";
import PageNotFound from "../pages/PageNotFound";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import jwtDecode from "jwt-decode";

const UserAccount = lazy(() => import("../pages/UserAccount"));
const HomeAdmin = lazy(() => import("../pages/HomeAdmin"));
const Questions = lazy(() => import("../pages/Questions"));
const AddSurveyTemplate = lazy(() => import("../pages/AddSurveyTemplate"));
const SurveyTemplates = lazy(() => import("../pages/SurveyTemplates"));
const AddSurvey = lazy(() => import("../pages/AddSurvey"));
const Home = lazy(() => import("../pages/Home"));
const SurveyList = lazy(() => import("../pages/SurveyList"));
const SurveyRecap = lazy(() => import("../pages/SurveyRecap"));
const AddUser = lazy(() => import("../pages/AddUser"));
const Classes = lazy(() => import("../pages/Classes"));
const ClassDetails = lazy(() => import("../pages/ClassDetails"));
const AddClass = lazy(() => import("../pages/AddClass"));
const MyProfile = lazy(() => import("../pages/MyProfile"));
const MySurvey = lazy(() => import("../pages/MySurvey"));
const FillSurvey = lazy(() => import("../pages/FillSurvey"));
const SurveyHistory = lazy(() => import("../pages/SurveyHistory"));
const SurveyHistoryDetail = lazy(() => import("../pages/SurveyHistoryDetail"));
const ResetUserPassword = lazy(() => import("../pages/ResetUserPassword"));

const Router = () => {
  const cookies = document.cookie.split(";"); // Get cookies
  const { userRole, setUser, survey } = useContext(UserContext);
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
            <Route
              path="/atur-ulang-password-pengguna"
              element={
                <DashboardLayout>
                  <ResetUserPassword />
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
