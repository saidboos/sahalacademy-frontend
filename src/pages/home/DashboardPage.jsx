// import React, { useEffect } from 'react'
import { useNavigate, Navigate, Routes, Route, } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import Home from './Home';
import TopBar from './TopBar';

//CSS
import '../../assets/styles/dashboard.css'
import MyCourses from '../coursepages/MyCourses';
import Courses from '../coursepages/Courses';
import CourseDetails from '../coursepages/CourseDetails';
import EnrollPage from '../coursepages/EnrollPage';
import WatchingPage from '../coursepages/WatchingPage';


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
            <div className="container">
                {/* <!-- =============== Navigation ================ --> */}
                <div className="navigation">

                </div>

                {/* <!-- ========================= Main ==================== --> */}
                <div className="dashboard-main">
                    <TopBar setLoggedIn = {setLoggedIn}/>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/mycourses' element={<MyCourses />} />
                        <Route path='/courses' element={<Courses />} />
                        <Route path='/coursedetails' element={<CourseDetails />} />
                        <Route path='/enrollpage' element={<EnrollPage />} />
                        <Route path='/watchcourse' element={<WatchingPage />} />
                    </Routes>

                    {/* */}
                </div>
            </div>
        )
    }
}

export default Dashboard
