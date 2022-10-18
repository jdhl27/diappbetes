import React, { useState } from "react";

const useValidateEmail = () => {
    const [errors, setErrors] = useState({})
    
    const validateEmail = (email) => {
        let isValidEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email === '') {
            setErrors({isEmail: false,message:'Por favor ingresa tu correo electrónico.'})
            //errors.email = email.required || 'Por favor ingresa tu correo electrónico.';
        } else if (!isValidEmail.test(email)) {
            setErrors({isEmail: false,message:'Ingresa un correo electrónico válido.'})
            //errors.email = email.validEmail || 'Ingresa un correo electrónico válido.';
        }else {
            setErrors({isEmail: true})
        };
    }
    return [
        errors,
        validateEmail
    ];
}

const useValidateinput = () => {
    const [errors, setErrors] = useState({})
    
    const validateInput = (value='') => {
        const textValue = value
        if (value === '') {
            setErrors({isValid: false,message:'Por favor ingresa tu contraseña'})
            //errors.email = email.required || 'Por favor ingresa tu correo electrónico.';
        } else if (textValue.length < 4) {
            setErrors({isValid: false,message:'Debe tener mínimo 4 caracteres'})
            //errors.email = email.validEmail || 'Ingresa un correo electrónico válido.';
        }else {
            setErrors({isValid: true})
        };
    }
    return [
        errors,
        validateInput
    ];
}
  
export { useValidateEmail, useValidateinput }