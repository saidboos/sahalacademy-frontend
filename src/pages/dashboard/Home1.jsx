
import { useNavigate, } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import services from '../../services/common.services'

//CSS
import '../../assets/styles/home.css'

//IMAGES
import founder from '../../assets/img/founder.png'
import student from '../../assets/img/student.jpg'


const Home1 = () => {



    return (
        <div className='home-main'>
            <div className="home-container">
                <div className="left">
                    <img src={student} alt="" />
                </div>
                <div className="right">
                    <p className='title'>Dear student!  <br /><span>Welcome to Galool academy</span></p>
                    <p className='body1'>Where you can find the best courses that helps you to build your future career. 
                        we have a good teachers with hight valuable experience and skills regarding on the subject they are teaching</p>
                        <p className='body2'>Please welcome, enroll a course and happy learning.</p>
                </div>
            </div>
        </div>
    )
}

export default Home1
