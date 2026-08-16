
import { useState } from 'react'
import { AuthProvider } from "./context/AuthContext";
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ChangePassword from './pages/ChangePassword'
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Signup/>}/>
        <Route path='/change' element={<ChangePassword/>}/>
        <Route path='/forgot' element={<ForgotPassword/>}/>    
      </Routes>
      </BrowserRouter>
    </>
  )
}

<AuthProvider>
  <Routes>
    <Route path="/home" element={
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    } />
  </Routes>
</AuthProvider>

export default App