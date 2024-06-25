
const Validations = (values) => {
    const errors = {}

    if(values.fname === '') errors.fname = 'First name is required*';
    if(values.lname === '') errors.lname = 'Last name is required*';
    if(values.email === '') errors.email = 'Email is required*';
    if(values.phone === '') errors.phone = 'Phone number is required*';
    if(values.coursename === '') errors.coursename = 'Course Name is required*';
    if(values.courseId === '') errors.courseId = 'Course ID is required*';
    if(values.shift === '') errors.shift = 'Shift is required*';
    if(values.pass === '')errors.pass = 'Password is required*'
    if(values.cpass === '')errors.cpass = 'Confirm password is required*'
    if(values.coursefee === '')errors.coursefee = 'Course Fee is required*'
    if(values.startdate === '')errors.startdate = 'Start Date is required*'
    if(values.enddate === '')errors.enddate = 'End Date is required*'
    if(values.classstatus === '')errors.classstatus = 'Class status is required*'
    if(values.gender === '')errors.gender = 'Gender is required*'
    if(values.country === '')errors.country = 'Country is required*'
    if(values.city === '')errors.city = 'City is required*'

    return errors;
}

export default Validations
