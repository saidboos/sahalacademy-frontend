//LIBRARIES FROM REACT
import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"

//CSS
import '../../assets/styles/topbar.css';

//IMAGES
import logo from '../../assets/img/sahal_logo.jpeg'
import LogoutButton from '../../views/buttons/LogoutButton';
import LoginButton from '../../views/buttons/LoginButton';


const TopBar = ({ setLoggedIn }) => {

    const navigate = useNavigate();
    const [path, setPath] = useState('dashboard')

    //assigning location variable
    let location = useLocation();

    //destructuring pathname from location
    let pathname;

    const handleNavigations = (navType) => {
        setActive(false)
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
        setPath(navType)
    }

    const [active, setActive] = useState(false)
    const onToggle = () => {
        setActive(active => !active)
    }

    return (
        <div>
            <div className="topbar">
                <div className="left">
                    <div className="logo" onClick={() => handleNavigations('dashboard')}>
                        <img src={logo} alt="" />
                    </div>
                </div>
                <div className="right">
                    <div className="toggle" onClick={onToggle}>
                        <ion-icon name="menu-outline"></ion-icon>
                    </div>
                    <ul className={`${active ? 'active' : ''}`}>
                        <li className={`${path === 'dashboard' ? 'active' : ''}`} onClick={() => handleNavigations('dashboard')}>Home</li>
                        <li className={`${path === 'courses' ? 'active' : ''}`} id='courses' onClick={() => handleNavigations('courses')}>Courses</li>
                        <li className={`${path === 'courses' ? 'active' : ''}`} onClick={() => handleNavigations('about')}>About us</li>
                        <li className={`${path === 'courses' ? 'active' : ''}`} onClick={() => handleNavigations('contact')}>Contact us</li>
                        <li className={`${path === 'courses' ? 'active' : ''}`} onClick={() => handleNavigations('books')}>Books</li>
                        <li className={`${path === 'mycourses' ? 'active' : ''}`} id='my-courses' onClick={() => handleNavigations('mycourses')}>My Courses</li>
                        <LogoutButton className='logout-btn' setLoggedIn={setLoggedIn} />
                        <LoginButton className='login-btn' setLoggedIn={setLoggedIn} />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TopBar
