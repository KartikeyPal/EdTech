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
import Cart from './components/core/dashboard/Cart/Index.jsx'
import { useSelector } from "react-redux";
import AddCourse from './components/core/dashboard/AddCourse/index.jsx'
import MyCourses from './components/core/dashboard/MyCourses.jsx'
import EditCourse from "./components/core/dashboard/EditCourse/index.jsx";
import Catelog from "./pages/Catelog.jsx";
export default function App() {
  const {user} = useSelector((state)=>state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/catalog/:catelogName" element = {<Catelog/>}/>
        <Route path="/signup" element = {<Signup/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/update-password/:id" element={<UpdatePassword/>}/>
        <Route path="/verify-email" element={<VerifyEmail/>}/>
        <Route path="/about" element={<About/>}/>
        
         {/* Nested Routes for dashboard */}
        <Route  element={<PrivateRoute><Dashboard/></PrivateRoute>}>
          <Route path="/dashboard/my-courses" element={<MyCourses/>}/>
          <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
          <Route path="/dashboard/settings" element={<Settings/>}/>
          <Route path="/dashboard/cart" element={<Cart/>}/>
          <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
          <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>}/>
          {
            user?.accountType === "Instructor" && (
              <>
                <Route path="/dashboard/add-course" element={<AddCourse />}/>
              </>
            )
          }
        </Route>
        <Route path="*" element={<Error/>}/>
      </Routes>
     
    </div>
  )
}