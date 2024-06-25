
const validateCourse = (course) => {
    const errors = {}

    if(course.courseName === '') errors.courseName = 'Enter course name*';
    if(course.courseFee === '') errors.courseFee = 'Enter course fee*';
    if(course.courseDesc === '') errors.courseDesc = 'Enter course description*';
    if(course.courseImage === '') errors.courseImage = 'Enter course image url*';


    return errors;
}

export default validateCourse
