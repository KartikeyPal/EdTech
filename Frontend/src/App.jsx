import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home";
import Signup from './pages/SignUp.jsx'
import Navbar from './components/common/Navbar.jsx'
import LogIn from "./pages/LogIn.jsx";
export default function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/signup" element = {<Signup/>}/>
        <Route path="/login" element={<LogIn/>}/>
      </Routes>
    </div>
  )
}