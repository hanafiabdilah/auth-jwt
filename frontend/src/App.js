import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { Adminpanel } from './layouts/Adminpanel'
import { Auth } from './layouts/Auth'
import { Dashboard } from './pages/adminpanel/Dashboard'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          <Route element={<Auth />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<Adminpanel />}>
            <Route path="/adminpanel/*" element={
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            } />
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
