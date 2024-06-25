import { createContext, useContext, useState } from "react"
import TopBar from "../pages/dashboard/d_topbar/TopBar";
import { RenderRoutes } from "../structure/RenderNavigation";
import Footer from "../pages/footer/Footer";

//Libraries
import Swal from 'sweetalert2'

//Services
import services from '../services/common.services'
import validateToken from "./ValidateToken";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);


export const AuthWrapper = () => {

    const isAuth = validateToken()
    const navigate = useNavigate()

    console.log('' + isAuth)


    const [user, setUser] = useState({ userId: "", isAuthenticated: isAuth })

    const login = (user) => {
        // Make a call to the authentication API to check the username
        return new Promise((resolve, reject) => {
            Swal.fire({
                title: 'Please wait',
                customClass: 'swal-height',
                html: 'To take you dashboard page',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                }
            })


            console.log(localStorage.getItem('auth'))
            services.login(user)
                .then(res => {
                    const data = res.data
                    Swal.close()
                    if (data.code === '100') {
                        localStorage.setItem('token', data.token)

                        setUser({ email: user.email, isAuthenticated: true })
                        resolve("success")
                    } else {
                        reject(data.message)
                        console.log(user)
                        console.log(data)
                    }
                }).catch(err => {
                    Swal.close()
                    console.log(err)
                    reject(err)
                })
        })
    }
    const logout = () => {
        localStorage.setItem('auth', false)
        setUser({ ...user, isAuthenticated: false })
        navigate('/login')
    }

    return (

        <AuthContext.Provider value={{ user, login, logout }}>
            <>
                <TopBar />
                <Footer />
            </>

        </AuthContext.Provider>

    )

}