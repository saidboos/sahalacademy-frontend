import React from 'react'


//CSS
import '../../assets/styles/mycourses.css'
import '../../assets/styles/coursedetails.css'
import course from './model/Course'

const CourseDetails = () => {
  const courseUrl = course.url;
  return (
    <div className='watch-intro'>
      <div className="course-intro-container">
        <iframe src={courseUrl} allowFullScreen={true} allow="encrypted-media"></iframe>
      </div>


      <div className="course-detail-title">
        <p>Course Introduction</p>
      </div>
    </div>
  )
}

export default CourseDetails
