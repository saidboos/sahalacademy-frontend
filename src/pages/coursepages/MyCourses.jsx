
import { useNavigate, } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

//API
import services from '../../services/common.services'

//CSS
import '../../assets/styles/mycourses.css'

//IMAGES
import veditingcourse from '../../assets/img/veditingcourse.png'
import java from '../../assets/img/java.png'
import noFound from '../../assets/img/no_rec.png'

const MyCourses = () => {

    const navigate = useNavigate();

    const [courses, setCourses] = useState([])

    useEffect(() => {
        const req = { userId: localStorage.getItem('uid') };
        Swal.fire({
            title: 'Please wait',
            showConfirmButton: false,
            allowOutsideClick: false,
            willOpen: () => {
                Swal.showLoading();
            }
        })

        services.studentenrolledcourses(req)
            .then((res) => {
                Swal.close();
                setCourses(res.data.enrolledCourses);
            })
            .catch(err => console.log(err));
    }, [])

    const watchCourse = (course) => {
        navigate('/dashboard/watchcourse', { state: { course: course } })
    }

    return (
        <div className='home-main'>
            <div className="myc-title">
                <p>My Courses</p>
            </div>
            <div className="mycourses-container">
                {courses ? courses.map((course, index) =>
                    <div key={index} className="course">
                        <img src={course.courseImg} alt="" />
                        <div className="course-content">
                            <p className='course-title'>{course.courseName}</p>
                            <hr />
                            <p className='course-desc'>{course.courseDesc}</p>
                        </div>
                        <div className="course-buttons">
                            <div className="start-btn" onClick={() => watchCourse(course)}>
                                <ion-icon name="play"></ion-icon>
                                <span>Start Learning</span>
                            </div>
                        </div>
                    </div>) :

                    <div className='no-found'>
                        <img src={noFound} alt="" />
                    </div>}

            </div>
        </div>
    )
}

export default MyCourses
