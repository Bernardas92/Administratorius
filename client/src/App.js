import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Header from './components/header/Header'
import Registration from './components/registration/Registration'
import Login from './components/login/Login'
import AdminArea from './components/admin_area/AdminArea'
import ClientArea from './components/client_area/ClientArea'
import 'bootstrap/dist/css/bootstrap.min.css'

export default () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userRole, setUserRole] = useState('')
  
    useEffect(()=>{
      axios.get('/checkAuth', {withCredentials: true})
      .then(resp =>{
        if(resp.data.id){
          setIsLoggedIn(true)
          setUserRole(resp.data.role)
        }
      })
    }, [])
  
    const handleLoginState = (loggedIn, role)=>{
      setIsLoggedIn(loggedIn)
      setUserRole(role)
    }
  
    return (
        <Router>
            <Header />
            <Routes>
                {!isLoggedIn && ( <Route path="/login" element={<Login state={handleLoginState} />} />)}
                {!isLoggedIn && ( <Route path="/registration" element={<Registration />} />)}
                {userRole === 1 && ( <Route path="/admin" element={<AdminArea />} />)}
                <Route path="/" element={<ClientArea />} />
            </Routes>
        </Router>
    )
}