import { Route, Routes } from 'react-router'
import Login from './pages/Auth/Login'
import './index.css'
import { JSX } from 'react'
import Home from './pages/Protected/Home'
import ProtectedRoutes from './pages/ProtectedRoutes'
import Notfound404 from './pages/404Page'

function App(): JSX.Element {

  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />}></Route>
      </Route>
      <Route path="*" element={<Notfound404 />} />
    </Routes>
  )
}

export default App
