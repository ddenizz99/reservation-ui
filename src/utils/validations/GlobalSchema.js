import Yup from "./yupTr";

export const LoginSchema =  Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
});