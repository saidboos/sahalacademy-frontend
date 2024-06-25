import React, { useState } from 'react'

//Libraries
import Swal from 'sweetalert2'

// CSS
import './log.css'
import { useNavigate } from 'react-router-dom'
import Validations from '../../../helpers/Validations'

//Services
import services from '../../../services/common.services'

//imports
import { AuthData } from '../../../auth/AuthWrapper'

const LoginPage = () => {


    const { login } = AuthData();

    //navigation
    const navigate = useNavigate()

    //form data
    const [user, setUser] = useState({
        email: '',
        pass: ''
    })

    const [errorMessage, setErrorMessage] = useState(null)

    //errors
    const [errors, setErrors] = useState({})

    //submit login data
    const submitData = () => {
        setErrors(Validations(user))

        if (user.email && user.pass) {

            Swal.fire({
                title: 'Please wait',
                customClass: 'swal-height',
                html: 'To take you dashboard page',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                }
            })

            services.login(user)
                .then(res => {
                    const user = res.data
                    Swal.close()
                    if (user.code === '100') {
                        alert(user.code)
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: user.message,
                        });
                    }
                }).catch(err => {
                    Swal.close()
                    console.log(err)
                })
        }
    }

    const doLogin = async () => {

        setErrors(Validations(user))

        if (user.email && user.pass) {
            try {

                await login(user)
                navigate("/profile")

            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: error,
                });

            }

        }

    }

    //handle changes
    const handleInput = (e) => {
        //    setErrors(Validations(values))
        const newValue = { ...user, [e.target.name]: e.target.value }
        setUser(newValue)
    }



    return (
        <div id="login">
            <div id="login-container">
                <div id="login-title">
                    <p>Login</p>
                    <hr />
                </div>

                <div id="login-form">
                    <div className="input-field">
                        <label htmlFor="">Email</label>
                        <input type="text" placeholder='Enter email' name='email'
                            className={errors.email && 'input-err'}
                            value={user.email === undefined ? '' : user.email} onChange={handleInput} />
                        {errors.email && <span>{errors.email}</span>}
                    </div>

                    <div className="input-field">
                        <label htmlFor="">Password</label>
                        <input type="password" placeholder='Enter password' name='pass'
                            className={errors.pass && 'input-err'}
                            value={user.pass === undefined ? '' : user.pass} onChange={handleInput} />
                        {errors.pass && <span>{errors.pass}</span>}
                    </div>

                    <input id='submit-btn' type="submit" value={'Login'} onClick={doLogin} />
                    {errorMessage ?
                        <div className="error">{errorMessage}</div>
                        : null}
                </div>
            </div>
        </div>
    )
}

export default LoginPage