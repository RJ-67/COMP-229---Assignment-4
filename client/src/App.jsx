import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Education from "./pages/Education";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Messages from "./pages/Messages";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import AddProject from "./project/AddProject";
import EditProject from "./project/EditProject";

import AddQualification from "./qualification/AddQualification";
import EditQualification from "./qualification/EditQualification";

import { AuthContext } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";
import { signout } from "./api-auth";

import "./App.css";

export default function App() {
  const { user, logout } = React.useContext(AuthContext);

  const handleLogout = async () => {
    await signout();
    logout();
  };

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="logo">RJ</div>
        <h1>My Portfolio</h1>
      </header>

      {/* NAVBAR */}
      <nav className="navbar">
        {/* ALWAYS show Home */}
        <NavLink className="nav-item" to="/" end>
          Home
        </NavLink>

        {/* LOGGED OUT */}
        {!user && (
          <>
            <NavLink className="nav-item" to="/signin">
              Sign In
            </NavLink>
            <NavLink className="nav-item" to="/signup">
              Sign Up
            </NavLink>
          </>
        )}

        {/* LOGGED IN */}
        {user && (
          <>
            {/* Main pages for all users */}
            {[
              { to: "/about", label: "About Me" },
              { to: "/projects", label: "Projects" },
              { to: "/education", label: "Education" },
              { to: "/services", label: "Services" }
            ].map((item) => (
              <NavLink key={item.to} className="nav-item" to={item.to}>
                {item.label}
              </NavLink>
            ))}

            {/* CONTACT ONLY FOR NON-ADMIN USERS */}
            {user?.user?.role !== "admin" && (
              <NavLink className="nav-item" to="/contact">
                Contact
              </NavLink>
            )}

            {/* MESSAGES ONLY FOR ADMIN */}
            {user?.user?.role === "admin" && (
              <NavLink className="nav-item" to="/messages">
                Messages
              </NavLink>
            )}

            {/* SIGN OUT */}
            <button className="nav-item nav-btn" onClick={handleLogout}>
              Sign Out
            </button>
          </>
        )}
      </nav>

      {/* ROUTES */}
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />

        <Route
          path="/education"
          element={
            <PrivateRoute>
              <Education />
            </PrivateRoute>
          }
        />

        <Route
          path="/services"
          element={
            <PrivateRoute>
              <Services />
            </PrivateRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/projects/add"
          element={user?.user?.role === "admin" ? <AddProject /> : <Home />}
        />

        <Route
          path="/projects/edit/:projectId"
          element={user?.user?.role === "admin" ? <EditProject /> : <Home />}
        />

        <Route
          path="/education/add"
          element={
            user?.user?.role === "admin" ? <AddQualification /> : <Home />
          }
        />

        <Route
          path="/education/edit/:qualificationId"
          element={
            user?.user?.role === "admin"
              ? <EditQualification />
              : <Home />
          }
        />

        <Route
          path="/messages"
          element={user?.user?.role === "admin" ? <Messages /> : <Home />}
        />
      </Routes>

      {/* FOOTER */}
      <footer className="footer">
        © Ron Joshua Concepcion – Built with React
      </footer>
    </>
  );
}
