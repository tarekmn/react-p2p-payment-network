import React from 'react'
import { Route, Routes, useLocation } from "react-router-dom";
import Login from './Login'
import Home from './Home';
import Profile from './Profile';
import Signup from './Signup.jsx';
import AllFeed from './AllFeed';

import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes(){
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path='/feed' element={<AllFeed />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes