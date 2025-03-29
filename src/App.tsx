import { Route, Routes } from 'react-router'
import Login from './pages/Auth/Login'
import './index.css'
import { JSX } from 'react'
import Home from './pages/Protected/Home'
import ProtectedRoutes from './pages/ProtectedRoutes'
import Notfound404 from './pages/404Page'
import { Provider } from 'react-redux'
import rootStore from './redux/rootStore'

//TODO: Make sure all dates are stored in ISO format
function App(): JSX.Element {

  return (
    <Provider store={rootStore}>
      <Routes>
        <Route path="/auth" element={<Login />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />}></Route>
        </Route>
        <Route path="*" element={<Notfound404 />} />
      </Routes>
    </Provider>

  )
}

export default App
