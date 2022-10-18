import { Layout } from "./components/Layout.jsx";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { profile } from "./redux/slice/auth/authSlice.js";
import { CryptoPage } from "./pages/CryptoPage.jsx";
import RequireAuth from "./routes/RequireAuth.js";
import AuthRoutes from "./routes/AuthRoutes.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profile());
  });

  return (
    <div className="bg-[#E5E5E5] dark:bg-[#000000] min-h-screen">
      <Layout>
        <Routes>
          {/* Public routes */}
          {/* <Route path="/" element={<MainPage />} /> */}

          {/* Auth routes */}
          <Route element={<AuthRoutes />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          {/* Private routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<CryptoPage />} />
          </Route>
        </Routes>
        <ToastContainer position="bottom-right" />
      </Layout>
    </div>
  );
}

export default App;
