import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react"
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
import { AppProvider } from "./utils/AppContext"
import Navigation from './components/Navigation.jsx';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Signup from './components/Signup.jsx';
import Header from './components/Header';
import Footer from './components/Footer';
import AllFeed from './components/AllFeed';
import './App.css'


function App() {

  const [userData, setUserData] = useState()



  const getUsers = async () => {
    const query = await fetch('/api/users', {
      method: 'GET'
    })
    const response = await query.json()
    setUserData(response)
  }


  useEffect(() => {
    getUsers()
    console.log(userData)
  }, [])



  return (
    <div >

      <AppProvider value={{}}>
        <Navigation />
        <Header />
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<Home userData={userData} setUserData={setUserData} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/feed' element={<AllFeed />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </AppProvider>

    </div>
  );
}

export default App;