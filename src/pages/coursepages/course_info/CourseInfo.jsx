import React, { useEffect, useState } from 'react'
import dateFormat from 'dateformat'
//css
import './cinfo.css'
import { useLocation, useNavigate } from 'react-router-dom'
import validateToken from '../../../auth/ValidateToken'
import getUserData from '../../../auth/UserData'
import Swal from 'sweetalert2'
import services from '../../../services/common.services'
import parser from 'html-react-parser';
import ReactHtmlParser from 'html-react-parser';


const CourseInfo = () => {
    const location = useLocation()
    const navigate = useNavigate()

    let auth = validateToken()
    const data = getUserData();

    const htmlString = '<ul><li><p>Coding</p></li><li><p>Design</p></li><li><p>Developing</p></li><li><p>Query</p></li></ul>'

    const transform = (node, index) => {
        console.log(node.type)
        if (node.type === 'tag' && node.name === 'p') {
            return <div>This was a bold tag</div>;
          }
    }


    const [isCourseEnrolled, setIsCourseEnrolled] = useState(false)
    const [course, setCourse] = useState({})
    const [objs, setObjs] = useState([])
    const [buttonTitle, setButtonTitle] = useState('Enroll')

    var name = ""

    useEffect(() => {
        if (location !== null) {
            setCourse(location.state.course)
            setObjs(location.state.course.objs)
        }

        if (auth) {
            setButtonTitle('Enroll')
            Swal.fire({
                title: 'Please wait',
                html: 'We are checking enrollment',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                }
            })
            const req = { userId: data.userId, courseId: location.state.course.courseId }
            console.log(req)
            services.checkenrollment(req)
                .then(res => {
                    Swal.close()
                    const data = res.data
                    if (data.code === '100') {
                        setButtonTitle('Watch')
                        setIsCourseEnrolled(true)
                    }
                    else setIsCourseEnrolled(false)
                }).catch(err => {
                    Swal.close()
                    console.log(err)
                })
        } else
            setButtonTitle('Login to enroll')

    }, [])


    const checkOut = () => {
        const tok = validateToken()
        if (tok) {
            if (isCourseEnrolled) navigate('/watch', { state: { course: course } })
            else navigate('/checkoutpage', { state: { course: course } })
        } else {
            navigate('/login')
        }
    }

    const firstLetter = location.state.course.teacher ? location.state.course.teacher.substring(0, 1) : '';
    const objsLength = location.state.course.objs.length
    return (

        <div id='course-info-con'>
            <div id="c-info-left">
                <iframe width="358" height="200" src="https://www.youtube.com/embed/BuWG1G6XisU?si=qXUtVbOQ0UygS_uj"
                    title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

                <div id="c-info-l-content">
                    <p id="c-info-t1">This course includes</p>
                    <div id="course-includes">
                        <div className="c-i-ln">
                            <span><ion-icon name="desktop-outline"></ion-icon></span>
                            <p>2 Hours and 51 Minutes Of HD videos</p>
                        </div>
                        <div className="c-i-ln">
                            <span><ion-icon name="people-outline"></ion-icon></span>
                            <p>{course.enrolls} Students are already enrolled</p>
                        </div>
                        <div className="c-i-ln">
                            <span><ion-icon name="sunny-outline"></ion-icon></span>
                            <p>Certificate of Completion</p>
                        </div>
                        <div className="c-i-ln">
                            <span><ion-icon name="wallet-outline"></ion-icon></span>
                            <p>$ 30</p>
                        </div>

                        <button id='login-enroll' onClick={checkOut}>{buttonTitle}</button>
                    </div>
                </div>
            </div>

            <div id="c-info-right">
                <div id="c-info-r-header">
                    <div id="c-info-transparent-bg">
                        <div>
                            <p id='c-info-name'>{course.courseName}</p>
                            <p id='c-info-desc'>{course.courseDesc}</p>
                            <p id='cdate'>Last Updated : <span>{dateFormat(course.registerDate, 'dd-MM-yyyy')} </span></p>
                            <div id='c-info-teacher'> <p>{firstLetter}</p> <p>{course.teacher}</p></div>
                        </div>
                    </div>
                </div>

                {objsLength !== 0 ?
                    <div id="c-info-details">
                        <p id='c-d-title'>What You Will Learn</p>
                        <div id="what-u-learn">

                            {
                                objs.map((obj, index) =>
                                    <div className="u-learn-line" key={index}>
                                        <span><ion-icon name="checkbox-outline"></ion-icon></span>
                                        <p>{obj.obj}</p>
                                    </div>
                                )
                            }
                            {/* <div className="u-learn-l"> */}

                            {/* <div className="u-learn-line">
                                    <span><ion-icon name="checkbox-outline"></ion-icon></span>
                                    <p>Social Media Designs</p>
                                </div> */}
                            {/* <div className="u-learn-line">
                                    <span><ion-icon name="checkbox-outline"></ion-icon></span>
                                    <p>Understand Print Materials</p>
                                </div>
                                <div className="u-learn-line">
                                    <span><ion-icon name="checkbox-outline"></ion-icon></span>
                                    <p>Understanding is Typography</p>
                                </div> */}
                            {/* </div> */}

                            {/* <div className="u-learn-l"> */}
                            {/* <div className="u-learn-line">
                                    <span><ion-icon name="checkbox-outline"></ion-icon></span>
                                    <p>Graphic Design</p>
                                </div>

                                <div className="u-learn-line">
                                    <span><ion-icon name="checkbox-outline"></ion-icon></span>
                                    <p>Banner and Billboard Design</p>
                                </div>

                                <div className="u-learn-line">
                                    <span><ion-icon name="checkbox-outline"></ion-icon></span>
                                    <p>Basic Tools of Photoshop</p>
                                </div>
                                
                                <div className="u-learn-line">
                                    <span><ion-icon name="checkbox-outline"></ion-icon></span>
                                    <p>Color Theory</p>
                                </div> */}
                            {/* </div> */}

                        </div>
                    </div> : null
                }

                <div id='course-learn'>{ReactHtmlParser(htmlString, { transform })}</div>
            </div>
        </div>
    )
}

export default CourseInfo