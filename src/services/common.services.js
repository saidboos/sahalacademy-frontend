import axios from 'axios'
//dev url
const baseUrl = 'http://localhost:2000/api/';
//live url
// const baseUrl = 'https://api.galool.net/api/';

// const axiosInstance =  axios.create({
//   baseURL:baseUrl,
//   timeout: 5000,
//   headers: {
//     'Authorization': 'Bearer '+localStorage.getItem('token'),
//     'Content-Type': 'application/json'
//   }
// }); 

const services = {
    createAccount: (req) => {
        return axios.post(baseUrl + 'common/register', req);
    },
    login: (req) => {
        return axios.post(baseUrl + 'common/login', req);
    },
    profile: (req) => {
        return axios.post(baseUrl + 'common/profile', req);
    },
    students: (req) => {
        return axios.post(baseUrl + 'common/students', req);
    },
    createStudent: (req) => {
        return axios.post(baseUrl + 'common/createstudent', req);
    },
    updateStudent: (req) => {
        return axios.post(baseUrl + 'common/updatestudent', req);
    },
    courses: (req) => {
        return axios.post(baseUrl + 'common/courses', req);
    },
    createCourse: (req) => {
        return axios.post(baseUrl + 'common/createcourse', req);
    },
    // updateCourse: (req) => {
    //     return axios.post(baseUrl + 'common/updatecourse', req);
    // },
    studentenrolledcourses: (req) => {
        return axios.post(baseUrl + 'common/studentenrolledcourses', req);
    },
    teacherCourses: (req) => {
        return axios.post(baseUrl + 'common/teachercourses', req);
    },
    coursevideos: (req) => {
        return axios.post(baseUrl + 'common/coursevideos', req);
    },
    savebilling: (req) => {
        return axios.post(baseUrl + 'common/savebilling', req);
    },
    checkenrollment: (req) => {
        return axios.post(baseUrl + 'common/checkenrollment', req);
    },
    // pay: (req) => {
    //     return axios.post(process.env.U, req, {
    //         auth: {
    //             username: process.env.ONE,
    //             password: process.env.TWO
    //         }
    //     });
    // },
    pay: (req) => {
        return axios.post(baseUrl + 'common/makepayment', req);
    },

}

export default services;