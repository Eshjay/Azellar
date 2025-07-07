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
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import LiveChat from "./components/LiveChat";
import ThemeSettings from "./components/ThemeSettings";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <ThemeProvider>
      <div className="App bg-white dark:bg-gray-900 transition-colors duration-300">
        <BrowserRouter>
          <ScrollToTop />
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/support" element={<Support />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/portal" element={<ClientPortal />} />
          </Routes>
          <Footer />
          <LiveChat />
          <ThemeSettings />
          <Toaster 
            position="top-right"
            toastOptions={{
              className: 'dark:bg-gray-800 dark:text-white',
            }}
          />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;