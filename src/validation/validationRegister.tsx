import * as yup from "yup";

export const registerSchema = yup.object().shape({
    username: yup.string().required("Please input username!"),
    password: yup.string().min(8).required("Please input password!"),
    passwordConfirm: yup.string().oneOf([yup.ref('password')], 'Passwords do not match!').required("Please cofirm password!")
})