import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home";
import Signup from './pages/SignUp.jsx'
import Navbar from './components/common/Navbar.jsx'
import LogIn from "./pages/LogIn.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import UpdatePassword from "./pages/UpdatePassword.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import About from "./pages/About.jsx";
import MyProfile from "./components/core/dashboard/MyProfile.jsx";
import PrivateRoute from './components/core/auth/PrivateRoute.jsx';
import Dashboard from './pages/Dashboard.jsx'
import Error from './pages/Error.jsx'
import Settings from './components/core/dashboard/Settings/Index.jsx'
import EnrolledCourses from "./components/core/dashboard/EnrolledCourses.jsx";
export default function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/signup" element = {<Signup/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/update-password/:id" element={<UpdatePassword/>}/>
        <Route path="/verify-email" element={<VerifyEmail/>}/>
        <Route path="/about" element={<About/>}/>
        
         {/* Nested Routes for dashboard */}
        <Route  element={<PrivateRoute><Dashboard/></PrivateRoute>}>
          <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
          <Route path="/dashboard/settings" element={<Settings/>}/>
          <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
        </Route>
        <Route path="*" element={<Error/>}/>
      </Routes>
     
    </div>
  )
}