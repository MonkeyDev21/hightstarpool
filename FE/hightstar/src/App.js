import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import AdminLayout from "./admin/layout/AdminLayout";
import SiteLayout from "./site/layout/SiteLayout";
import LoginPage from "./site/views/Auth/LoginPage";
import SignUpPage from "./site/views/Auth/SignUpPage";
import ForgotPasswordPage from "./site/views/Auth/ForgotPasswordPage";
import PrivateRoute from "./common/PrivateRoute"; // Import PrivateRoute
import Page403 from "./common/pages/Page403";
import Page404 from "./common/pages/Page404";
import Page500 from "./common/pages/Page500";
import { UserProvider } from "./contexts/UserContext";
import VerifyOtpPage from "./site/views/Auth/VerifyOtpPage";
import ResetPasswordPage from "./site/views/Auth/ResetPasswordPage";

function App() {
  return (
    <div className="app w-100" style={{ backgroundColor: "#f3f4f7" }}>
      <Router>
        <UserProvider>
          <Routes>
            {/* Sử dụng PrivateRoute để bảo vệ các đường dẫn cần xác thực, kiểm tra quyền truy cập của người dùng. */}
            <Route
              path="/admin/*"
              element={
                <PrivateRoute roles={["ADMIN", "EMPLOYEE", "TRAINER"]}>
                  <AdminLayout />
                </PrivateRoute>
              }
            />
            <Route path="/*" element={<SiteLayout />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verify-otp" element={<VerifyOtpPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/page403" element={<Page403 />} />
            <Route path="/page404" element={<Page404 />} />
            <Route path="/page500" element={<Page500 />} />
          </Routes>
        </UserProvider>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default App;
