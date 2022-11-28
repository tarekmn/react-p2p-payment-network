import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./utils/AppContext"
import Navigation from './components/Navigation.jsx';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Signup from './components/Signup.jsx';
import './App.css'


function App() {

  const [trans, setTrans] = useState()

  return (
    <div >

      <AppProvider value={{}}>
        <Navigation />

        <BrowserRouter >
          <Routes>
            <Route path="/" element={<Home  />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

          </Routes>
        </BrowserRouter>

      </AppProvider>

    </div>
  );
}

export default App;