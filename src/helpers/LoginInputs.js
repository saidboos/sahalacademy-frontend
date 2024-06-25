import { useState } from "react";

const LoginInputsFun = () => {

    const loginInputs = [
        {
            id: 1,
            name: 'email',
            type: 'email',
            placeholder: 'Enter email',
            errorMessage: "Please enter a valid email address*",
            label: 'Email'
        },
        {
            id: 2,
            name: 'password',
            type:'password',
            placeholder: 'Enter password',
            errorMessage: "Password is required*",
            label: 'Password'
        }
    ]

    return loginInputs;
}


export default LoginInputsFun