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
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
        <Toaster position="top-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;