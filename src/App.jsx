import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";
import Courses from "./components/Courses/Index";
import Subject from "./components/Subjects/index";
import Lecture from "./components/Lecture/Index";

 
export default function App() {
 return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Protected Dashboard Routes */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/course" element={<Courses />} />
          <Route path="/subject" element={<Subject />} />
          <Route path="/lecture" element={<Lecture />} />
        </Route>

        {/* Public Auth Routes */}
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}