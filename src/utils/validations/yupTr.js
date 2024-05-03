import * as Yup from "yup";

Yup.setLocale({
    mixed: {
        default: 'Geçerli değil',
        required: 'Bu alan gereklidir', // Gerekli alanlar için genel mesaj
        oneOf: 'Aşağıdaki değerlerden biri olmalıdır: ${values}', // Enum validasyon hatası
        notOneOf: 'Aşağıdaki değerlerden hiçbiri olmamalıdır: ${values}', // Karaliste validasyon hatası
      },
      string: {
        length: 'Tam olarak ${length} karakter olmalıdır',
        min: 'En az ${min} karakter olmalıdır', // Minimum uzunluk hatası
        max: 'En fazla ${max} karakter olmalıdır', // Maksimum uzunluk hatası
        email: 'Geçerli bir e-posta adresi girin', // E-posta validasyon hatası
        url: 'Geçerli bir URL girin', // URL validasyon hatası
        trim: 'Boşluk içermemelidir',
        lowercase: 'Küçük harf içermelidir',
        uppercase: 'Büyük harf içermelidir'
      },
      number: {
        min: 'En az ${min} değerinde olmalıdır',
        max: 'En fazla ${max} değerinde olmalıdır',
        lessThan: '${less} değerinden küçük olmalıdır',
        moreThan: '${more} değerinden büyük olmalıdır',
        notEqual: '${notEqual} değerine eşit olmamalıdır',
        positive: 'Pozitif bir sayı olmalıdır',
        negative: 'Negatif bir sayı olmalıdır',
        integer: 'Tam sayı olmalıdır'
      },
      date: {
        min: '${min} tarihinden sonra olmalıdır',
        max: '${max} tarihinden önce olmalıdır'
      },
      array: {
        min: 'En az ${min} eleman içermelidir',
        max: 'En fazla ${max} eleman içermelidir'
      }
})

export default Yup;