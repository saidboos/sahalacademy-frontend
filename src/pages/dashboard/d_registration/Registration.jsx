import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

//Librariesb
import Swal from 'sweetalert2'

//Services
import services from '../../../services/common.services';

// CSS
import './reg.css'
import Validations from '../../../helpers/Validations';

const Registration = () => {

    //navigation
    const navigate = useNavigate();

    //form data
    const [values, setValues] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        pass: '',
        cpass: '',
        userType: ''
    })

    //form errors
    const [errors, setErrors] = useState({})

    //submit data
    const submitForm = () => {
        setErrors(Validations(values))

        if (values.fname && values.lname && values.email && values.phone && values.pass && values.cpass) {
            if (values.userType) {
                Swal.fire({
                    title: 'Please wait',
                    html: 'We are preparing to register your account',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    willOpen: () => {
                        Swal.showLoading();
                    }
                })

                services.createAccount(values)
                    .then(res => {
                        Swal.close()
                        const user = res.data
                        if (user.code === '100') {
                            navigate('/dashboard');
                        }
                        console.log(user)
                    }).catch(err => {
                        Swal.close()
                        console.log(err)
                    })

            } else {
                alert('Please select the user type')
            }
        }
    }

    //Hanlde data changes
    const handleInput = (e) => {
        // setErrors(Validations(values))
        const newValue = { ...values, [e.target.name]: e.target.value }
        setValues(newValue)

        // if (newValue !== undefined)
    }

    return (
        <div id="registration">
            <div id="registration-container">
                <div id="reg-title">
                    <p>Registrion</p>
                    <hr />
                </div>

                <div id="reg-form">
                    <div className="input-lines">
                        <div className="input-field">
                            <label htmlFor="">First Name</label>
                            <input type="text"
                                placeholder='Enter first name' name='fname'
                                className={errors.fname && 'input-err'}
                                value={values.fname === undefined ? '' : values.fname} onChange={handleInput} />
                            {errors.fname && <span>{errors.fname}</span>}
                        </div>
                        <div className="input-field">
                            <label htmlFor="">Last Name</label>
                            <input type="text" placeholder='Enter first name' name='lname'
                                className={errors.lname && 'input-err'}
                                value={values.lname === undefined ? '' : values.lname} onChange={handleInput} />
                            {errors.lname && <span>{errors.lname}</span>}
                        </div>
                    </div>
                    <div className="input-lines">
                        <div className="input-field">
                            <label htmlFor="">Email</label>
                            <input type="text" placeholder='Enter email' name='email'
                                className={errors.email && 'input-err'}
                                value={values.email === undefined ? '' : values.email} onChange={handleInput} />
                            {errors.email && <span>{errors.email}</span>}
                        </div>
                        <div className="input-field">
                            <label htmlFor="">Phone Number</label>
                            <input type="text" placeholder='Enter phone number' name='phone'
                                className={errors.phone && 'input-err'}
                                value={values.phone === undefined ? '' : values.phone} onChange={handleInput} />
                            {errors.phone && <span>{errors.phone}</span>}
                        </div>
                    </div>
                    <div className="input-lines">
                        <div className="input-field">
                            <label htmlFor="">Password</label>
                            <input type="password" placeholder='Enter password' name='pass'
                                className={errors.pass && 'input-err'}
                                value={values.pass === undefined ? '' : values.pass} onChange={handleInput} />
                            {errors.pass && <span>{errors.pass}</span>}
                        </div>
                        <div className="input-field">
                            <label htmlFor="">Confirm Password</label>
                            <input type="password" placeholder='Confirm password' name='cpass'
                                className={errors.cpass && 'input-err'}
                                value={values.cpass === undefined ? '' : values.cpass} onChange={handleInput} />
                            {errors.cpass && <span>{errors.cpass}</span>}
                        </div>
                    </div>

                    <div id="user-type-lines">
                        <div id="u-title">
                            <p>User Type</p>
                        </div>
                        <div id="u-types">
                            <div id="u-type">
                                <input type="radio" id="st1" name="userType" value="3"
                                    onChange={e => setValues({ ...values, [e.target.name]: e.target.value })} />
                                <label for="age1">Student</label>
                            </div>
                            <div id="u-type">
                                <input type="radio" id="te" name="userType" value="4"
                                    onChange={e => setValues({ ...values, [e.target.name]: e.target.value })} />
                                <label for="age1">Teacher</label>
                            </div>

                        </div>
                    </div>

                    <input id='submit-btn' type="submit" value={'Submit'} onClick={submitForm} />
                </div>
            </div>
        </div>
    )
}

export default Registration