import * as yup from 'yup'

export const userSchema = yup.object().shape({
    firstName: yup.string()
    .matches(/^[A-Z][a-zA-Z]*$/, 'First name should start with a capital letter and not include special characters')
    .required('First name is required'),

    lastName: yup.string()
    .matches(/^[A-Z][a-zA-Z]*$/, 'Last name should start with a capital letter and not include special characters')
    .required('Last name is required'),

    username: yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(10, 'Username must be at most 10 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Username can only contain English letters and numbers')
    .required('Username is required'),

    email: yup.string()
    .email('Invalid email address')
    .required('Email is required'),

    password: yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/, 'Password must contain at least one number and one special character')
    .required('Password is required'),

    confirmPassword: yup.string().required('Passwords must match')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),

    phone: yup.string()
    .matches(/^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/, 'Invalid Israeli phone number')
    .required('Phone number is required'),

    dateOfBirth: yup.string().required('Must choose date of birth'),

    genres: yup.array().min(1, 'Must choose favorite genres'),

    gender:  yup.string()
    .required('Choose gender')
})