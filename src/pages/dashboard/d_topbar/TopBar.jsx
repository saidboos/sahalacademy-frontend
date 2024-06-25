//LIBRARIES FROM REACT
import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import { RenderMenu, RenderRoutes } from "../../../structure/RenderNavigation"

//CSS
import './topbar.css';

//IMAGES
import logo from '../../../assets/img/sahal_logo.jpeg'
import LoginButton from '../../../views/buttons/LoginButton';
import JoinButton from '../../../views/buttons/JoinButton';


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
                navigate('/')
                break
            case 'courses':
                navigate('/courses')
                break
            case 'teachers':
                navigate('/teachers')
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
                    {/* <div className="toggle" onClick={onToggle}>
                        <ion-icon name="menu-outline"></ion-icon>
                    </div>
                    <ul className={`${active ? 'active' : ''}`}>
                        <li className={`${path === 'dashboard' ? 'active' : ''}`} onClick={() => handleNavigations('dashboard')}>Home</li>
                        <li className={`${path === 'courses' ? 'active' : ''}`} id='courses-menu' onClick={() => handleNavigations('courses')}>Courses</li>
                        <li className={`${path === 'courses' ? 'active' : ''}`} onClick={() => handleNavigations('about')}>About us</li>
                        <li className={`${path === 'courses' ? 'active' : ''}`} onClick={() => handleNavigations('contact')}>Contact us</li>
                        <li className={`${path === 'courses' ? 'active' : ''}`} onClick={() => handleNavigations('books')}>Books</li>
                        <LoginButton className='login-btn' />
                        <JoinButton className='join-btn' />
                    </ul> */}


                <RenderMenu />
                </div>
            </div>

            <div id="main-routes">

            <RenderRoutes />
            </div>
        </div>
    )
}

export default TopBar
