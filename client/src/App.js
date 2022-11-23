import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react"
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
import { AppProvider } from "./utils/AppContext"
import Navigation from './components/Navigation.jsx';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Signup from './components/Signup.jsx';
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'

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
      <ChakraProvider>
        <AppProvider value={{}}>
          <Navigation />
          <BrowserRouter >
            <Routes>
              <Route path="/" element={<Home userData={userData} setUserData={setUserData} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/signup" element={<Signup />} /> */}

            </Routes>
          </BrowserRouter>
        </AppProvider>
      </ChakraProvider>    
    </div>
  );
}

export default App;