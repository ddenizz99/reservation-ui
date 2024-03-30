import * as Yup from "yup";

Yup.setLocale({
    mixed: {
        required: 'Bu alan boş olamaz.',
        string: 'Lütfen metinsel ifade giriniz.',
        email: 'E-posta formatına uygun veri giriniz.'
    },
    string: {
        email: 'E-posta formatına uygun veri giriniz.'
    }
})

export default Yup;