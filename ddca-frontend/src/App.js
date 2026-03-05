import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SideBarNav from "./components/SideBar";
import About from "./pages/About";
import Services from "./pages/Services";
import Admission from "./pages/Admission";
import Contact from "./pages/Contact";
import PersonalTraining from "./pages/PersonalTraining";
import Images from "./pages/Images";
import Achivement from "./pages/Achivement";
import Login from "./components/Login/Login";
import Profile from "./pages/profile";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/adminDashboard";
import AdminStudentPanel from "./pages/admin/adminStudentPanel";
import AcademyRevenue from "./pages/admin/AcademyFinance";
import ProtectedRoute from "./components/Login/ProtectedRoutes";
import Sidebar from "./components/SideBar";
function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/personal-training" element={<PersonalTraining />} />
        <Route path="/images" element={<Images />} />
        <Route path="/achievements" element={<Achivement />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/revenue" element={<AcademyRevenue />} />
        <Route
          path="/admin/studentManagement"
          element={<AdminStudentPanel />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
