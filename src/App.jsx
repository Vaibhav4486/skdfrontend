import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import DocumentsRequired from './pages/DocumentsRequired';
import EmiCalculator from './pages/EmiCalculator';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';
import Faq from './pages/Faq';
import TrackApplication from './pages/TrackApplication';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerDashboard from './pages/CustomerDashboard';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLeads from './pages/admin/AdminLeads';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminServices from './pages/admin/AdminServices';
import AdminFaqs from './pages/admin/AdminFaqs';
import AdminCases from './pages/admin/AdminCases';

export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <main key={location.pathname} className="route-fade">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/documents" element={<DocumentsRequired />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/emi-calculator" element={<EmiCalculator />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/track" element={<TrackApplication />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/admin" element={<ProtectedRoute requireRole="ADMIN"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/leads" element={<ProtectedRoute requireRole="ADMIN"><AdminLeads /></ProtectedRoute>} />
          <Route path="/admin/testimonials" element={<ProtectedRoute requireRole="ADMIN"><AdminTestimonials /></ProtectedRoute>} />
          <Route path="/admin/services" element={<ProtectedRoute requireRole="ADMIN"><AdminServices /></ProtectedRoute>} />
          <Route path="/admin/faqs" element={<ProtectedRoute requireRole="ADMIN"><AdminFaqs /></ProtectedRoute>} />
          <Route path="/admin/cases" element={<ProtectedRoute requireRole="ADMIN"><AdminCases /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
