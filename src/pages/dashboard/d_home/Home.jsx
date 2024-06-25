import { useNavigate, } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import services from '../../../services/common.services'

//CSS
import './home.css'

//IMAGES
import founder from '../../../assets/img/eng_mo.jpeg'
import java from '../../../assets/img/java.png'


const Home = () => {

    const navigate = useNavigate()

    const [courses, setCourses] = useState([])
    const [search, setSearch] = useState([])


    const navigateToCourseInfo = (course) => {
        navigate('/courseinfo', {state: {course: course}})
    }

    useEffect(() => {
        const user = { userId: localStorage.getItem('uid') };

        Swal.fire({
            title: 'Please wait',
            showConfirmButton: false,
            allowOutsideClick: false,
            willOpen: () => {
                Swal.showLoading();
            }
        })

        services.courses()
            .then((res) => {
                Swal.close();
                setCourses(res.data.courses);
            })
            .catch(err => console.log(err));
        //   services.profile();
    }, [])

    return (
        <div className='home-main'>
            <div id="home-header">
                <div id="header-content">
                    <div id="home-header-left">
                        <h2>Eng. Mohamed Jama Sahal</h2>
                        <p>"Baro xirfad aad ku shaqaysan kartid adiga oo gurigaaga jooga"</p>
                    </div>
                    <div id="home-header-right">
                        <div id="img-con">
                            <img src={founder} alt="" />
                        </div>
                    </div>
                </div>
            </div>

            {/* COURSES SECTION STARTS */}
            <section id='course-content'>
                <div id="title">
                    <p>Dooro koorso</p>
                    <hr />
                </div>

                <div id="courses">
                    {courses.map((course, index) =>
                        <div key={index} className="course" onClick={() => navigateToCourseInfo(course)}>
                            {/* <img src={java} alt="" /> */}
                                <img src={course.courseImage} alt="" />
                      
                            <div className="course-content">
                                <div id="info">
                                    <p className='course-title'>{course.courseName}</p>
                                    <p className='course-desc'>{course.courseDesc}</p>
                                    <p className='course-fee'>${course.courseFee}</p>
                                </div>

                                {/* <div className="course-buttons">
                                    <div className="see-btn">
                                        <span>See more</span>
                                        <ion-icon name="ellipsis-horizontal-sharp"></ion-icon>
                                    </div>
                                    <div className="enroll-btn">
                                        <ion-icon name="enter-sharp"></ion-icon>
                                        <span>Enroll</span>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    )}
                </div>
            </section>
            {/* COURSES SECTION ENDS */}
        </div>
    )
}

export default Home
