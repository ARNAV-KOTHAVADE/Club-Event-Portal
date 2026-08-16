
import { useState } from 'react'
import { AuthProvider } from "./context/AuthContext";
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ChangePassword from './pages/ChangePassword'
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Admin from "./pages/Admin";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/home' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/' element={<Signup/>}/>
            <Route path='/change' element={<ChangePassword/>}/>
            <Route path='/forgot' element={<ForgotPassword/>}/>    
            <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />

            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}




export default App