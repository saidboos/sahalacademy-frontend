import React, { useEffect, useState } from 'react'
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

//Css
import './profile.css'

//imges
import profile from '../../assets/img/default.png'
import { AuthData } from '../../auth/AuthWrapper';
import ProfileComp from './profile_components/profile_comp/ProfileComp';
import MyCoursesComp from './profile_components/my_courses/MyCoursesComp';
import getUserData from '../../auth/UserData';
import YourCoursesComp from './profile_components/your_courses/YourCoursesComp';

const Profile = () => {

    const { user, logout } = AuthData()


    const navigate = useNavigate();

    const [isMC, setMC] = useState(true)
    const [isYC, setYC] = useState(false)
    const [isP, setP] = useState(false)
    const [userType, setUserType] = useState('')
    const [uType, setUType] = useState('')
    const [userData, setUserData] = useState({})

    const data = getUserData();

    useEffect(() => {
        if (data) {
            setUserData(data)
            var uType = data.uType
            setUType(uType)
            if (uType == '1') uType = 'Admin'
            if (uType == '2') uType = 'Staff'
            if (uType == '3') uType = 'Student'
            if (uType == '4') uType = 'Teacher'
            setUserType(uType)
         //   alert('nice')
        } else {
            // navigate('/login')
            alert('hello')
        }
    }, [])



    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to logout!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff0000',
            cancelButtonColor: '#228b22',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.setItem('token', '')
                logout();
            }
        })
    }

    const handleMenu = (m, y, p) => {
        if (m) {
            setMC(m)
            setYC(false)
            setP(false)
        }
        if (y) {
            setMC(false)
            setYC(y)
            setP(false)
        }
        if (p) {
            setMC(false)
            setYC(false)
            setP(p)
        }
    }

    return (
        <div id='profile-container'>
            <div id="profile-left">
                <img src={profile} />
                <p id='p-name'>{data.firstName} {data.lastName}</p>
                <p id='p-type'>{userType}</p>

                <div id="my-courses" className={isMC ? 'p-active-item' : ''} onClick={() => handleMenu(true, false, false)}>
                    <p>My Courses</p>
                    <span>
                        <IoIosArrowDroprightCircle />
                    </span>
                </div>

                {uType == 4 && <div id="your-courses" className={isYC ? 'p-active-item' : ''} onClick={() => handleMenu(false, true, false)}>
                    <p>Your Courses</p>
                    <span>
                        <IoIosArrowDroprightCircle />
                    </span>
                </div>}

                <div id="p-profile" className={isP ? 'p-active-item' : ''} onClick={() => handleMenu(false, false, true)}>
                    <p>Profile</p>
                    <span>
                        <IoIosArrowDroprightCircle />
                    </span>
                </div>

                <div id="p-logout-btn" onClick={handleLogout}>
                    <p>Logout</p>
                    <span>
                        <IoLogOutSharp />
                    </span>
                </div>
            </div>


            <div id="profile-righ-con">


                {
                    isMC && <MyCoursesComp userId={data.userId} />
                }

                {
                    isYC && <YourCoursesComp userId={data.userId} />
                }
                {
                    isP && <ProfileComp />
                }

            </div>

        </div>
    )
}

export default Profile