import { createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { Adminpanel } from './layouts/Adminpanel'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/dashboard/index'

const AuthContext = createContext();


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<Adminpanel />}>
            <Route path="/adminpanel/*" element={
              <Routes>
                <Route path="/dashboard" element={<>Adminpanel</>} />
              </Routes>
            } />
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
