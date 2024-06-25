import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import cities from 'cities.json';

import dateFormat from 'dateformat'


//CSS
import '../../../assets/styles/enrollpage.css';
import './ce.css'

//Images
import java from '../../../assets/img/java.png';
import sifalo from '../../../assets/img/sifalo_logo.png';
import evc from '../../../assets/img/evc_logo.jpeg';
import sahal from '../../../assets/img/sahal_logo.png';
import zaad from '../../../assets/img/telesom_logo.png';
import edahab from '../../../assets/img/edahab_logo.jpeg';
import premier from '../../../assets/img/premier_wallet.png';
import countriesArray from '../../../helpers/countries';
import validateToken from '../../../auth/ValidateToken';
import Validations from '../../../helpers/Validations';
import getUserData from '../../../auth/UserData';
import services from '../../../services/common.services';
import Swal from 'sweetalert2';

const CheckOut = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const inputRef = useRef(null)

    const [course, setCourse] = useState({})
    const [countries, setCountries] = useState([])
    const [city, setCities] = useState([])


    const data = getUserData();


    //Active Sifalo Item 
    const [isEvc, setEvc] = useState(false)
    const [isSahal, setSahal] = useState(false)
    const [isZaad, setZaad] = useState(false)
    const [isEdahab, setEdahab] = useState(false)
    const [isPremier, setPremier] = useState(false)
    const [currency, setCurrency] = useState('')
    const [servicePlaceHolder, setServicePlaceHolder] = useState('')
    const [refNo, setRefNo] = useState('')
    const [phoneCode, setPhoneCode] = useState('')
    const [showField, setShowField] = useState(false)


    //form data
    const [values, setValues] = useState({
        userId: '',
        fname: data.firstName,
        lname: data.lastName,
        email: data.userEmail,
        phone: data.phoneNumber,
        country: undefined,
        city: undefined,
        refno: '',
        product: '',
        service: '',
        serviceAccount: undefined
    })

    const validateForm = () => {
        if (values.fname !== '' && values.lname !== '' && values.email !== ''
            && values.phone !== '' && values.country !== ''
            && values.city !== '') return true
        else return false
    }

    //form errors
    const [errors, setErrors] = useState({})


    const countriesOps = () => {
        var opss = []
        var op = {}
        countriesArray.forEach(con => {
            op = { ...op, value: con.cca2, label: con.name }
            opss.push(op)
        })


        opss = opss.sort()

        setCountries(opss)
        // citiesOps()
    }
    const citiesOps = (concode) => {
        var opss = []
        var op = {}
        cities.forEach(city => {
            if (city.country.toLowerCase() === concode.toLowerCase()) {
                op = { ...op, value: city.name, label: city.name }
                opss.push(op)
            }
        })



        // console.log(opss.length)
        // console.log(opss)

        setCities(opss)
    }

    useEffect(() => {
        // console.log(currentDate.getTime() + '-'+crypto.randomUUID())
        if (validateToken()) {
            if (location !== null)
                setCourse(location.state.course)
            countriesOps()
        } else {
            navigate('/login')
        }

    }, [])

    const handleCountryChange = (selectedCountry) => {
        citiesOps(selectedCountry.value)
        setValues({ ...values, country: selectedCountry.label })
    }

    const handleCityChange = (selectedCity) => {
        citiesOps(selectedCity.value)
        setValues({ ...values, city: selectedCity.label })
    }

    const handleActiveMenu = (ev, sa, za, ed, pr) => {

        setShowField(true)
        setEvc(ev)
        setSahal(sa)
        setZaad(za)
        setEdahab(ed)
        setPremier(pr)

        inputRef.current.value = "";

        let localService = ''


        if (ev) {
            setPhoneCode('252')
            setServicePlaceHolder('Enter your Evc Plus number')
            localService = 'waafi'
            setCurrency('USD')
            // setValues({ ...values, service: 'Evc Plus' })
        }

        if (sa) {
            setPhoneCode('25290')
            setServicePlaceHolder('Enter your Sahal number')
            localService = 'waafi'
            setCurrency('USD')
            // setValues({ ...values, service: 'Sahal' })
        }

        if (za) {
            setPhoneCode('25263')
            setServicePlaceHolder('Enter your Zaad number')
            localService = 'waafi'
            setCurrency('USD')
            // setValues({ ...values, service: 'Zaad' })
        }

        if (ed) {
            setPhoneCode('25265')
            setServicePlaceHolder('Enter your E-Dahab number')
            localService = 'E-Dahab'
            setCurrency('USD')
            // setValues({ ...values, service: 'E-Dahab' })
        }

        if (pr) {
            setServicePlaceHolder('Enter your Premier Wallet account')
            localService = 'Premier Wallet'
            setCurrency('USD')
            // setValues({ ...values, service: 'Premier Wallet' })
        }

        const currentDate = new Date()
        console.log(currentDate.getTime())

        setValues({ ...values, serviceAccount: '', userId: data.userId, service: localService, refno: currentDate.getTime(), product: course.courseName })


    }

    //Hanlde data changes
    const handleInput = (e) => {
        // setErrors(Validations(values))
        const newValue = { ...values, [e.target.name]: e.target.value }

        setValues(newValue)

        // if (newValue !== undefined)
    }


    const submitData = () => {
        setErrors(Validations(values))


        // alert(values.serviceAccount)
        // alert(updatedServiceAccount)

        if (values.country === undefined) values.country = ''
        if (values.city === undefined) values.city = ''

        if (values.serviceAccount === undefined && showField) values.serviceAccount = ''

        if (validateForm()) {
            if (values.serviceAccount === '' || values.serviceAccount === undefined) {
                alert('Please select  the method of payment')
                return
            }

            Swal.fire({
                title: 'Please wait',
                html: 'please make sure to check your mobile device to pay the fee! Thankz.',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                }
            })

            const updatedServiceAccount = phoneCode + values.serviceAccount
            const payReq = { account: updatedServiceAccount, gateway: values.service, amount: course.courseFee, currency: 'USD', order_id: values.refno }
            console.log(payReq)
            services.pay(payReq)
                .then(res => {
                    Swal.close()
                    const data = res.data
                    if(data.code === '601'){
                        saveBillings()
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops..!",
                            text: data.message,
                        })
                    }
                }).catch(err => {
                    Swal.close()
                    console.log(err)
                })

   
        }

    }

    const saveBillings = (updatedServiceAccount) => {
         services.savebilling({ ...values, courseId: course.courseId, serviceAccount: updatedServiceAccount })
                .then(res => {
                    Swal.close()
                    const data = res.data
                    if (data.code === '100') {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: data.message,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate('/profile')
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops..!",
                            text: data.message,
                        })
                    }
                }).catch(err => {
                    Swal.close()
                    console.log(err)
                })
    }

    return (
        <div id='course-e-con'>
            <div id="c-e-title">
                <p>Check out</p>
                <hr />
            </div>
            <div id="c-e-content">
                <div id="c-e-left">

                    <h3>Billing details</h3>
                    <hr />

                    <div className="input-lines">
                        <div className="input-field">
                            <label htmlFor="">First Name</label>
                            <input type="text"
                                placeholder='Enter first name' name='fname'
                                className={errors.email && 'input-err'}
                                value={values.fname === undefined ? '' : values.fname} onChange={handleInput}
                            />
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
                            <input type="number" placeholder='Enter phone number' name='phone'
                                className={errors.phone && 'input-err'}
                                value={values.phone === undefined ? '' : values.phone} onChange={handleInput} />
                            {errors.phone && <span>{errors.phone}</span>}

                        </div>
                    </div>


                    <div id="c-country-city">
                        <div id="select-country">
                            <label htmlFor="">Country</label>
                            <Select options={countries}
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderColor: state.isFocused ? '' : 'grey',
                                        border: values.country === '' ? '1px solid red' : '1px solid grey',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            border: '1px solid grey',
                                        },
                                        marginTop: '5px'
                                    }),
                                }}
                                onChange={handleCountryChange}

                            />

                            {values.country === '' ? <span style={{ color: 'red', fontSize: '13px', marginLeft: '10px', marginTop: '2px' }}>Country is required*</span> : null}
                        </div>


                        <div id="select-city">
                            <label htmlFor="">City</label>
                            <Select options={city}
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderColor: state.isFocused ? '' : 'grey',
                                        border: values.city === '' ? '1px solid red' : '1px solid grey',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            border: '1px solid grey',
                                        },
                                        marginTop: '5px'
                                    }),
                                }}

                                onChange={handleCityChange}
                            />

                            {values.city === '' ? <span style={{ color: 'red', fontSize: '13px', marginLeft: '10px', marginTop: '2px' }}>City is required*</span> : null}
                        </div>
                    </div>

                    <h3 id='order-title1'>Your order</h3>
                    <div id="order-title">
                        <p>Product</p>
                        <p>Total</p>
                    </div>
                    <hr style={{height:'1px', background:'gray'}} />

                    <div id="order-content">
                        <div id='c-detail'>
                            <img src={course.courseImage} />
                            <p id='name'>{course.courseName}</p>
                        </div>
                        <p id='price'>$ {course.courseFee}</p>
                    </div>

                    <hr style={{height:'1px', background:'gray'}} />
                </div>


                <div id="c-e-right">


                    <div id="pay-with-sifalo">
                        <img src={sifalo} alt="" />
                        <p>Select the method of payment</p>
                        <br />
                        <div className={`sifalo-item ${isEvc ? 'sifalo-active' : ''}`} onClick={() => handleActiveMenu(true, false, false, false, false)}>
                            <div className="sleft">
                                <img src={evc} alt="" />
                                <p>Evc Plus</p>
                            </div>
                            {isEvc && <span><ion-icon name="checkmark-circle"></ion-icon></span>}
                        </div>
                        <div className={`sifalo-item ${isSahal ? 'sifalo-active' : ''}`} onClick={() => handleActiveMenu(false, true, false, false, false)}>
                            <div className="sleft">
                                <img src={sahal} alt="" />
                                <p>Sahal</p>
                            </div>
                            {isSahal && <span><ion-icon name="checkmark-circle"></ion-icon></span>}
                        </div>
                        <div className={`sifalo-item ${isZaad ? 'sifalo-active' : ''}`} onClick={() => handleActiveMenu(false, false, true, false, false)}>

                            <div className="sleft">
                                <img src={zaad} alt="" />
                                <p>Zaad</p>
                            </div>
                            {isZaad && <span><ion-icon name="checkmark-circle"></ion-icon></span>}
                        </div>
                        <div className={`sifalo-item ${isEdahab ? 'sifalo-active' : ''}`} onClick={() => handleActiveMenu(false, false, false, true, false)}>

                            <div className="sleft">
                                <img src={edahab} alt="" />
                                <p>E-Dahab</p>
                            </div>
                            {isEdahab && <span><ion-icon name="checkmark-circle"></ion-icon></span>}
                        </div>
                        <div className={`sifalo-item ${isPremier ? 'sifalo-active' : ''}`} onClick={() => handleActiveMenu(false, false, false, false, true)}>

                            <div className="sleft">
                                <img src={premier} alt="" />
                                <p>Premier Wallet</p>
                            </div>
                            {isPremier && <span><ion-icon name="checkmark-circle"></ion-icon></span>}
                        </div>

                        {/* <div id="sifalo-mobile" style={showField ? { display: 'flex' } : { display: 'none' }}> */}
                        <div id="sifalo-mobile" style={{ display: showField ? 'flex' : 'none', border: values.serviceAccount === '' ? '1px solid red' : '' }}>
                            {isPremier ? null : <div id="mobile-code">
                                <p>{phoneCode}</p>
                            </div>
                            }
                            {isPremier ? null : <hr />}
                            <input type="number" ref={inputRef} name='serviceAccount' value={values.serviceAccount === undefined ? '' : values.serviceAccount}
                                placeholder={servicePlaceHolder} onChange={handleInput} />
                        </div>
                        {showField && values.serviceAccount === '' ? <span style={{ color: 'red', fontSize: '13px', marginLeft: '10px', marginTop: '2px' }}>Service account is required*</span> : null}

                        <button id="pay-btn" onClick={submitData}>Pay</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CheckOut
