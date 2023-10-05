import {Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Registration from './pages/Registrarion'
import { library } from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import './App.css'
import Home from './pages/Home'

library.add(fas)

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />}/> 
      <Route path='/Registration' element={<Registration />}/> 
      <Route path='/Home' element={<Home />}/> 
      <Route path='*' element={<h1>Not Found</h1>}/> 
    </Routes>
  )
}

export default App
