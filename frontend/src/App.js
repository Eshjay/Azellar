import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Support from "./pages/Support";
import Academy from "./pages/Academy";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import ClientPortal from "./pages/ClientPortal";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import LiveChat from "./components/LiveChat";
import ThemeSettings from "./components/ThemeSettings";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from 'react-hot-toast';
import { preloadHeroImages } from "./utils/heroImages";
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Preload hero images for faster loading
    preloadHeroImages();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="App bg-white dark:bg-gray-900 transition-colors duration-300">
          <BrowserRouter>
            <ScrollToTop />
            <Navigation />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/support" element={<Support />} />
              <Route path="/academy" element={<Academy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/blog" element={<Blog />} />
              
              {/* Academy Routes */}
              <Route path="/akademy/courses" element={<Courses />} />
              <Route path="/akademy/course/:id" element={<CourseDetail />} />
              
              {/* Authentication Routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Signup />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/client-portal" element={
                <ProtectedRoute>
                  <ClientPortal />
                </ProtectedRoute>
              } />
            </Routes>
            <Footer />
            <LiveChat />
            <ThemeSettings />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  style: {
                    background: '#10b981',
                  },
                },
                error: {
                  style: {
                    background: '#ef4444',
                  },
                },
              }}
            />
          </BrowserRouter>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;