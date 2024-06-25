// import React, { useEffect } from 'react'
import { useNavigate, Navigate, Routes, Route, } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import Home from './d_home/Home';
import TopBar from './d_topbar/TopBar';

//CSS
import './dashboard.css'
import MyCourses from '../coursepages/MyCourses';
import Courses from '../coursepages/Courses';
import CourseDetails from '../coursepages/CourseDetails';
import WatchingPage from '../coursepages/WatchingPage';
import Registration from './d_registration/Registration';
import LoginPage from './d_login/LoginPage';
import Footer from '../footer/Footer';


const Dashboard = ({ loggedIn, setLoggedIn }) => {

    const navigate = useNavigate();


    // const navigate = useNavigate();




    // const toDo = () => {

    // };

    // const isBackPressed = useBackButton(toDo);
    // useEffect(() => {
    //     if (isBackPressed) {
    //         Swal.fire({
    //             title: 'Are you sure?',
    //             text: "You want to logout!",
    //             icon: 'warning',
    //             showCancelButton: true,
    //             confirmButtonColor: '#ff0000',
    //             cancelButtonColor: '#228b22',
    //             confirmButtonText: 'Yes!',
    //             cancelButtonText: 'No'
    //         }).then((result) => {
    //             if (result.isConfirmed) {
    //                 navigate('/')
    //             }
    //         })

    //     }
    // })


    const handleNavigations = (navType) => {
        switch (navType) {
            case 'dashboard':
                navigate('/dashboard/')
                break
            case 'mycourses':
                navigate('/dashboard/mycourses')
                break
            case 'courses':
                navigate('/dashboard/courses')
                break
            case 'teachers':
                navigate('/dashboard/teachers')
                break
        }
    }

    const al = () => alert('helloddddd')
    if (!loggedIn) {
        return <Navigate to='/' />
    } else {
        return (
            <div className="dashboard-main">
                <div id="t-d">
                    <TopBar setLoggedIn={setLoggedIn} />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/courses' element={<Courses />} />
                        <Route path='/create-account' element={<Registration />} />
                        <Route path='/login-account' element={<LoginPage />} />
                        {/* <Route path='/enrollpage' element={<EnrollPage />} /> */}
                        <Route path='/watchcourse' element={<WatchingPage />} />
                    </Routes>
                </div>


                <Footer id="footer" />

                {/* */}
            </div>
        )
    }
}

export default Dashboard
