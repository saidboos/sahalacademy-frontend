import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'


//Css
import '../your_courses/yourcourse.css'
import '../../../../assets/styles/mycourses.css'


//images
import noFound from '../../../../assets/img/no_rec.png'

//API
import services from '../../../../services/common.services'
import getUserData from '../../../../auth/UserData'


const MyCoursesComp = (props) => {
  const navigate = useNavigate()

  const [courses, setCourses] = useState([])

  useEffect(() => {
    const req = { userId: props.userId };
    console.log(req)
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
    navigate('/watch', { state: { course: course } })
  }

  const mystyle = {
    marginBottom:"-40px"
  };

  return (
    <div id='course-content' style={mystyle}>

      <div id="myc-title">
        <p>My Courses</p>
      </div>

      <div id="courses">
        {courses ? courses.map((course, index) =>
          <div key={index} id="course" onClick={() => watchCourse(course)} >
            <img src={course.courseImage} alt="" />
            <div className="course-content">
              <p className='course-title'>{course.courseName}</p>
              <p id='course-desc'>{course.courseDesc}</p>
            </div>

            {/* <div className="course-buttons">
              <div className="start-btn" onClick={() => watchCourse(course)}>
                <ion-icon name="play"></ion-icon>
                <span>Start Learning</span>
              </div>
            </div> */}
          </div>)

          :

          <div className='no-found'>
            <img src={noFound} alt="" />
          </div>
          }
      </div>

    </div>
  )
}

export default MyCoursesComp