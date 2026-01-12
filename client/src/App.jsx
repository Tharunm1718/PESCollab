// src/App.jsx
import React, { useEffect } from 'react';
import DashboardPage from './dashboard';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import YourProjects from './Yourprojects';
import CreateProject from './CreateProject';
import SingleProject from './Singleproject';
import Community from './Community';
import Profileview from './ProfileView';
import Publicview from './PublicProjectView';
import Contribution from './Contribution'

function App() {
    return (
        <>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/yourprojects" element={<YourProjects />} />
                    <Route path="/uploadproject" element={<CreateProject />} />
                    <Route path="/yourprojects/:id" element={<SingleProject />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/profileview/:id" element={<Profileview />} />
                    <Route path="/projects/:id" element={<Publicview />} />
                    <Route path="/contribute/:id" element={<Contribution />} />
                </Routes>
        </>
    )
}

export default App;