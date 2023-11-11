import * as yup from "yup";

export const loginSchema = yup.object().shape({
    username: yup.string().required("Please input username!"),
    password: yup.string().min(8).required("Please input password!")
})