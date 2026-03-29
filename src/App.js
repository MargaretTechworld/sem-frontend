import React from 'react';
import {
  Route, Routes, Outlet, Navigate,
} from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactUs from './components/pages/ContactUs';
import Admission from './components/pages/Admission';
import NewsEvents from './components/pages/NewsEvents';
import AllCourses from './components/pages/AllCourses';
import OurTeam from './components/pages/OurTeam';
import CeoBio from './components/pages/CeoBio';
import Navigation from './components/pages/Navigation';
import Footer from './components/pages/Footer';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import CourseList from './components/admin/CourseList';
import CourseEdit from './components/admin/CourseEdit';
import CourseCreate from './components/admin/CourseCreate';
import ContentManager from './components/admin/ContentManager';
import OrderList from './components/admin/OrderList';
import ApplicationList from './components/admin/ApplicationList';
import ContactStudent from './components/admin/ContactStudent';
import Checkout from './components/pages/Checkout';
import CourseApplicationForm from './components/pages/CourseApplicationForm';
import MyApplications from './components/pages/MyApplications';

const PublicLayout = () => (
  <div className="app-container">
    <Navigation />
    <div className="content-container">
      <Outlet />
    </div>
    <Footer />
  </div>
);

function App() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />}>
        <Route path="dashboard" element={<h2>Overview Panel</h2>} />
        <Route path="courses" element={<CourseList />} />
        <Route path="course/create" element={<CourseCreate />} />
        <Route path="course/:id/edit" element={<CourseEdit />} />
        <Route path="content" element={<ContentManager />} />
        <Route path="applications" element={<ApplicationList />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="orders/:id/contact" element={<ContactStudent />} />
      </Route>

      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/news-events" element={<NewsEvents />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/application" element={<CourseApplicationForm />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/all-courses" element={<AllCourses />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/ceo-bio" element={<CeoBio />} />
      </Route>
      <Route path="/login/admin" element={<Navigate to="/admin/login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
