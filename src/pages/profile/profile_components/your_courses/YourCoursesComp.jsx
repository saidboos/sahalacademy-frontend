import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { BubbleMenu, EditorContent, EditorProvider, FloatingMenu, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import parser from 'html-react-parser'

//Css
// import '../../profile_components/my_courses/mycourses.css'
import './yourcourse.css'
import '../../../../assets/styles/mycourses.css'

//images
import noFound from '../../../../assets/img/no_rec.png'

//API
import services from '../../../../services/common.services'
import validateCourse from '../../../../helpers/validations/NewCourseValidation'
import TipTap from '../../../../helpers/tiptap/TipTap'




const YourCoursesComp = (props) => {


    const navigate = useNavigate()

    const [courses, setCourses] = useState([])
    const [isC, setISC] = useState(true)
    const [isN, setISN] = useState(false)
    const [title, setTitle] = useState('Your courses')
    const [courseGain, setCourseGain] = useState('')




    useEffect(() => {
        getTeacherCourses()
    }, [])

    const getTeacherCourses = () => {
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

        services.teacherCourses(req)
            .then((res) => {
                Swal.close();
                setCourses(res.data.teacherCourses);
            })
            .catch(err => console.log(err));
    }

    const watchCourse = (course) => {
        navigate('/watch', { state: { course: course } })
    }

    const handleClick = (c, n) => {
        setISC(c)
        setISN(n)

        if (n) setTitle('Create course')
        else setTitle('Your courses')
    }

    const [course, setCourse] = useState(
        {
            courseName: '',
            courseFee: '',
            courseDesc: '',
            courseImage: ''
        }
    )
    //form errors
    const [errors, setErrors] = useState({})
    const createCourse = () => {
        setErrors(validateCourse(course))
        if (course.courseName && course.courseFee && course.courseDesc && course.courseImage) {
            Swal.fire({
                title: 'Please wait',
                html: 'We are preparing to create your course',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                }
            })

            services.createCourse({ ...course, userId: props.userId })
                .then(res => {
                    Swal.close()
                    const data = res.data
                    if (data.code === '100') {
                        handleClick(true, false)
                        getTeacherCourses()
                    } else alert(data.message)
                    console.log(data)
                }).catch(err => {
                    Swal.close()
                    console.log(err)
                })
        }
    }

    //Hanlde data changes
    const handleInput = (e) => {
        // setErrors(Validations(values))
        const newCourse = { ...course, [e.target.name]: e.target.value }
        setCourse(newCourse)

        // if (newValue !== undefined)
    }

    const mystyle = {
        marginBottom: "-40px"
    };

    return (
        <div>
            <div id="myc-title">
                <p>{title}</p>
                {isC && <button id='new-btn' onClick={() => handleClick(false, true)}>Create New Course</button>}
                {isN && <div id='new-course-btns'>
                    <button id='back-btn' onClick={() => createCourse()}>Save</button>
                    <button id='back-btn' onClick={() => handleClick(true, false)}>Go Back</button>
                </div>}
            </div>

            {isC &&
                <div id='course-content' style={mystyle}>

                    <div id="courses">
                        {courses ? courses.map((course, index) =>
                            <div key={index} id="course">
                                <img src={course.courseImg} alt="" />
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
                            </div>}
                    </div>

                </div>
            }

            {isN &&
                <div id='new-course-con'>
                    <div className="new-course-line">
                        <div className="new-course-field">
                            <label htmlFor="">Course Name</label>
                            <input type="text" placeholder='Course name' name='courseName'
                                className={errors.courseName && 'input-err'}
                                value={course.courseName === undefined ? '' : course.courseName} onChange={handleInput} />
                            {errors.courseName && <span>{errors.courseName}</span>}
                        </div>
                        <div className="new-course-field">
                            <label htmlFor="">Course Fee</label>
                            <input type="number" placeholder='Course fee' name='courseFee'
                                className={errors.courseFee && 'input-err'}
                                value={course.courseFee === undefined ? '' : course.courseFee} onChange={handleInput} />
                            {errors.courseFee && <span>{errors.courseFee}</span>}
                        </div>
                    </div>
                    <div className="new-course-line">
                        <div className="new-course-field">
                            <label htmlFor="">Course Description</label>
                            <input type="text" placeholder='Course description' name='courseDesc'
                                className={errors.courseDesc && 'input-err'}
                                value={course.courseDesc === undefined ? '' : course.courseDesc} onChange={handleInput} />
                            {errors.courseDesc && <span>{errors.courseDesc}</span>}
                        </div>
                        <div className="new-course-field">
                            <label htmlFor="">Course Image</label>
                            <input type="text" placeholder='Enter image link' name='courseImage'
                                className={errors.courseImage && 'input-err'}
                                value={course.courseImage === undefined ? '' : course.courseImage} onChange={handleInput} />
                            {errors.courseImage && <span>{errors.courseImage}</span>}
                        </div>
                    </div>

                    <p id='p-skill'>Enter the skills students will gain in this course</p>
                    <TipTap setCourseGain ={setCourseGain}/>
                    <p>{parser(courseGain)}</p>

                </div>
            }
        </div>
    )
}

export default YourCoursesComp
