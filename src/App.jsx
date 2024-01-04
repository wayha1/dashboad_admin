import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./component/Homepage/Homepage";
import { Navbar } from "./Navbar";
import { Aboutus } from "./component/Aboutus/Aboutus";
import { Dashboard } from "./component/Dashboard/Dashboard";
import { Account } from "./component/account/Account";
import { AddAuthor } from "./component/Author/AddAuthor";
import { AuthorList } from "./component/Author/AuthorList";
import Login from "./features/auth/Login";
import ProtectedRoute from "./ProtectedRoute"; // Update the path
import UnauthorizedPage from "./component/Unauthorized/UnauthorizedPage";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard/*" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/account" element={<ProtectedRoute element={<Account />} />} />
        <Route path="/inputauthor" element={<ProtectedRoute element={<AddAuthor />} />} />
        <Route path="/dashboard/author/list" element={<ProtectedRoute element={<AuthorList />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </Router>
  );
}

export default App;
