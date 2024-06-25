
import { useNavigate, } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import services from '../../services/common.services'

//CSS
import '../../assets/styles/home.css'

//IMAGES
import founder from '../../assets/img/eng_mo.jpeg'
import student from '../../assets/img/student.jpg'


const Home = () => {



    return (
        <div className='home-main'>
            <div id="home-header">
                <div id="header-content">
                    <div id="home-header-left">
                        <h2>Eng. Mohamed Jama Sahal</h2>
                        <p>"Baro xirfad aad ku shaqaysan kartid mustaqbalkana aad u aayi kartid aduun iyo aakhirana ku anfici karta"</p>
                    </div>
                    <div id="home-header-right">
                        <div id="img-con">
                            <img src={founder} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
