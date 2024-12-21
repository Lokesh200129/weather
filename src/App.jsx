import './App.css'
import {Routes, Route} from "react-router-dom"
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import Header from './component/Header'
import { useSelector } from 'react-redux'
import PrivateRoute from './component/PrivateRoute.jsx'


function App() {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <>
      <div  className={`${theme === "light" ? "bg-white text-black" : "bg-black text-white"} min-h-screen w-full m-auto  sm:w-3/4 flex justify-center items-center ` }>
        <Header/>
        <Routes>
          <Route path="/home" element={<PrivateRoute Component={Home} />}/>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup/>} />
          
        </Routes>
      </div>
    
    </>
  )
}

export default App
