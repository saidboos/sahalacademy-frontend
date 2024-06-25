
//LIBRARIES FROM REACT
import React from 'react'
import { useNavigate, } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Swal from 'sweetalert2'
import services from '../../services/common.services'

//CSS
import '../../assets/styles/mycourses.css'
import '../../assets/styles/courses.css'

//IMAGES

const Courses = () => {

    const navigate = useNavigate();



    const [courses, setCourses] = useState([])
    const [search, setSearch] = useState([])


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



    const navigateToCourseInfo = (course) => {
        navigate('/courseinfo', {state: {course: course}})
    }

    return (
        <div id='course-content'>

            <div id="myc-title">
                <p>Courses</p>
            </div>

            <div className="search-holder">
                <div className="search-course">
                    <ion-icon name="search"></ion-icon>
                    <input type="text" placeholder='search a course' />
                </div>
            </div>

            <div id="courses">

                {courses.map((course, index) =>
                    <div id="course" onClick={() => navigateToCourseInfo(course)}>
                        {/* <img src={java} alt="" /> */}
                        <img src={course.courseImage} alt="" />
                        <div className="course-content">
                            <div id="info">
                                <p className='course-title'>{course.courseName}</p>
                                <p id='course-desc'>{course.courseDesc}</p>
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
                )
                }
            </div>
        </div>
    )
}

export default Courses
