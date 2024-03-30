import * as Yup from "yup";

const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/

export const LoginValidations = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email, please provide a valid email.")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
});

export const SignupValidations = Yup.object().shape({
        firstName: Yup.string()
        .min(2, "First Name must have a minimum of 2 characters")
        .max(20, "First Name must have a maximum of 20 characters")
        .required("First Name is required"),
        lastName: Yup.string()
        .min(2, "Last Name must have a minimum of 2 characters")
        .max(20, "Last Name must have a maximum of 20 characters")
        .required("Last Name is required"),
        email: Yup.string()
        .email("Invalid email, please provide a valid email.")
        .required("Email is required"),
        state: Yup.string()
        .required("State is required"),
        city: Yup.string()
        .required("Address is required"),
        password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(passwordRegExp, "Password must contain an uppercase letter,number and special character")
        .required("Password is required"),
        confirm_password:  Yup.string()
        .required('This is a required field.')
        .oneOf([Yup.ref('password')], 'Your passwords do not match.')
});