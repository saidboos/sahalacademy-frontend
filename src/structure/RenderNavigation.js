import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { AuthData } from "../auth/AuthWrapper";
import { nav } from "./navigation";

//images
import profile from '../../src/assets/img/default.png'
import PrivateRoutes from "./PrivateRoutes";
import LoginPage from "../pages/dashboard/d_login/LoginPage";
import Home from "../pages/dashboard/d_home/Home";
import Profile from "../pages/profile/Profile";
import Courses from "../pages/coursepages/Courses";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import LoginRoute from "./LoginRoute";
import WatchingPage from "../pages/coursepages/WatchingPage";
import Registration from "../pages/dashboard/d_registration/Registration";
import CourseInfo from "../pages/coursepages/course_info/CourseInfo";
import CheckOut from "../pages/coursepages/course_enroll/CheckOut";


export const RenderRoutes = () => {

     return (
          <Routes>
               <Route element={<PrivateRoutes />}>
                    {/* {nav.map((r, i) => {

                         if (r.isPrivate && user.isAuthenticated) {
                              return <Route key={i} path={r.path} element={r.element} />
                         } else if (!r.isPrivate) {
                              return <Route key={i} path={r.path} element={r.element} />
                         } else return false
                    })} */}
                    <Route path="/profile" element={<Profile />} />
               </Route>

               <Route element={<LoginRoute />}>
                    <Route path="/login" element={<LoginPage />} />
               </Route>

               <Route path="/" element={<Home />} />
               <Route path="/courses" element={<Courses />} />
               <Route path="/courseinfo" element={<CourseInfo />} />
               <Route path="/about" element={<About />} />
               <Route path="/contact" element={<Contact />} />
               <Route path="/watch" element={<WatchingPage />} />
               <Route path="/join" element={<Registration />} />
               <Route path="/checkoutpage" element={<CheckOut />} />

          </Routes>

     )
}


export const RenderMenu = () => {

     const navigate = useNavigate();
     const { user } = AuthData()
     const MenuItem = ({ r }) => {
          return (
               <div id="menuItem"><Link to={r.path}>{r.name}</Link></div>
          )
     }

     return (
          <div id="menu">


               <MenuItem key={0} r={{ path: '/', name: 'Home' }} />
               <MenuItem key={0} r={{ path: '/courses', name: 'Courses' }} />
               <MenuItem key={0} r={{ path: '/about', name: 'About us' }} />
               <MenuItem key={0} r={{ path: '/contact', name: 'Contact us' }} />


               {/* {nav.map((r, i) => {

                    if (!r.isPrivate && r.isMenu) {
                         return (
                              <MenuItem key={i} r={r} />
                         )
                    } else if (user.isAuthenticated && r.isMenu) {
                         return (
                              <MenuItem key={i} r={r} />
                         )
                    } else return false
               })} */}

               {user.isAuthenticated ?
                    <div id="profile-menu" onClick={() => navigate('profile')}>
                         <img src={profile} />
                    </div>
                    :
                    <div id="access-buttons">
                         <div id="login-button"><Link to={'login'}>Log in</Link></div>
                         <div id="join-button"><Link to={'join'}>Join</Link></div>
                    </div>
               }
          </div>
     )
}