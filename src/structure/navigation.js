import Home from "../pages/dashboard/d_home/Home"
import Courses from "../pages/coursepages/Courses"
import Login from "../pages/dashboard/d_login/LoginPage";
import Register from "../pages/dashboard/d_registration/Registration";
import Profile from "../pages/profile/Profile";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import WatchingPage from "../pages/coursepages/WatchingPage";

export const nav = [
     // { path:     "/",         name: "Home",        element: <Home />,       isMenu: true,     isPrivate: false  },
     // { path:     "/courses",         name: "Courses",        element: <Courses />,       isMenu: true,     isPrivate: false  },
     // { path:     "/about",         name: "About us",        element: <About />,       isMenu: true,     isPrivate: false  },
     // { path:     "/contact",         name: "Contact us",        element: <Contact />,       isMenu: true,     isPrivate: false  },
     { path:     "/login",    name: "Login",       element: <Login />,      isMenu: false,    isPrivate: false  },
     { path:     "/join",    name: "Register",       element: <Register />,      isMenu: false,    isPrivate: false  },
     { path:     "/profile",    name: "Profile",       element: <Profile />,      isMenu: false,    isPrivate: true  },
     { path:     "/watch",    name: "Watch",       element: <WatchingPage />,      isMenu: false,    isPrivate: true  },
]