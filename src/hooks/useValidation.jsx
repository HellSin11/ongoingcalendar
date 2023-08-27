import React, {useEffect, useState} from 'react';

const useValidation = (value, validations) => {

    const [isEmpty, setIsEmpty] = useState("");
    const [minLengthError, setMinLengthError] = useState("");
    const [maxLengthError, setMaxLengthError] = useState("");
    const [isEmailError, setIsEmailError] = useState("");
    const [isEqualError, setIsEqualError] = useState("");

    const [inputValid, setInputValid] = useState(false)
    const errorMessages = {
        isEmptyMessage: 'The field cannot be empty',
        minLengthErrorMessage: 'Incorrect length',
        maxLengthErrorMessage: 'Incorrect length',
        lengthErrorMessage: 'Incorrect length',
        isEmailErrorMessage: 'Incorrect email format',
        isEqualPasswordMessage: 'Passwords do not match'
    }


    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break;
                case 'isEmpty':
                    value ? setIsEmpty(false) : setIsEmpty(true)
                    break;
                case 'isEmail':
                    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                    re.test(String(value).toLowerCase()) ? setIsEmailError(false) : setIsEmailError(true);
                    break;
                case 'maxLength':
                    value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
                    break;
                case 'isEqual':
                    value === validations[validation] ? setIsEqualError(false) : setIsEqualError(true);
                    break;
            }
        }
    }, [value]);


    useEffect(() => {
        if (isEmpty || maxLengthError || minLengthError || isEmailError || isEqualError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty, maxLengthError, minLengthError, isEmailError, isEqualError]);

    return {
        isEmpty,
        minLengthError,
        isEmailError,
        maxLengthError,
        inputValid,
        isEqualError,
        ...errorMessages
    }
}

export default useValidation;