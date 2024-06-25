import React, { useEffect, useState } from 'react'
import '../../assets/styles/login.css';
import logo from '../../assets/img/logo.png'
import { useNavigate } from 'react-router-dom';
import Validations from '../../helpers/Validations';
import Swal from 'sweetalert2'

import services from '../../services/common.services'

const Login = ({ setLoggedIn }) => {

  //API
  

  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})


  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }, [])

  const submitForm = (e) => {
    e.preventDefault();
    
    setErrors(Validations(values))

    if (values.email && values.password) {
      Swal.fire({
        title: 'Please wait',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        }
      })

      services.login(values)
        .then(res => {
          const user = res.data;
          if (user.code === '100') {
            Swal.close();
            setLoggedIn(true)
            localStorage.setItem('token', user.token)
            localStorage.setItem('uid', user.userId)
            navigate('/dashboard');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: user.message,
              confirmButtonColor: '#D10000'
            });
          }
        })
        .catch(err => console.log(err))
    }
  }

  const handleInput = (e) => {

    const newValue = { ...values, [e.target.name]: e.target.value }
    setValues(newValue)

  }
  return (
    <div className='login-container'>
      <form action="" onSubmit={submitForm}>
        <img src="" alt="" />
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="login-title">
          <p>Welcome</p>
        </div>
        <div className="form-control">
          <label htmlFor="">Email</label><br />
          <input type="email"
            placeholder='Enter your email' name='email'
            value={values.email === undefined ? '' : values.email}
            onChange={handleInput} />
          {errors.email && <span className='error-span-rg'>{errors.email}</span>}

        </div>
        <div className="form-control">
          <label htmlFor="">Password</label><br />
          <input type="password" placeholder='Enter your email' name='password'
            value={values.password === undefined ? '' : values.password}
            onChange={handleInput} />
          {errors.password && <span className='error-span-rg'>{errors.password}</span>}
        </div>

        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default Login
