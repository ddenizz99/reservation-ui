import Yup from "./yupTr";

export const LoginSchema =  Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
});

/* export const createReservationSchema = Yup.object().shape({
    
    customer_id: Yup.number().positive().integer().required(),
    email: Yup.string().email().required(),
}); */

export const createReservationSchema = (newCustomer) => {
    return Yup.object().shape({
      customer_id: newCustomer
        ? Yup.number().positive().integer().notRequired()
        : Yup.number().positive().integer().required(),
      full_name: newCustomer ? Yup.string().min(2).max(255).required() : Yup.string().notRequired(),
      phone: newCustomer ? Yup.number().typeError('Lütfen geçerli bir telefon numarası giriniz').required() : Yup.number().notRequired(),
      telephone_code: newCustomer ? Yup.number().integer().required() : Yup.number().integer().notRequired(),
      email: Yup.string().min(2).max(255).email(),
      level: Yup.number().integer(),
      language: Yup.string(),
      customer_note: Yup.string().min(2).max(255),
      number_of_people: Yup.number().min(1).integer().required(),
      location: Yup.number().integer().required(),
      reservation_note: Yup.string().min(2).max(255),
      date: Yup.string().required(),
      time: Yup.string().required(),
      cake_order: Yup.string().max(3),
      flower_order: Yup.string().max(3),
      platform: Yup.string().max(255),
      assistant_full_name: Yup.string().min(2).max(255),
      assistant_phone: Yup.number().typeError('Lütfen geçerli bir telefon numarası giriniz'),
      assistant_email: Yup.string().min(2).max(255).email()
    });
  };

  export const changeReservationDataTimeSchema = Yup.object().shape({
    date: Yup.string().required(),
    time: Yup.string().required()
  });

  export const changeReservationInfoSchema = Yup.object().shape({
    reservation_id: Yup.number().required(),
    notes: Yup.string(),
    cake_order: Yup.string().max(3),
    flower_order: Yup.string().max(3),
    platform: Yup.string().max(255),
  });

  export const smallUpdateCustomerSchema = Yup.object().shape({
    full_name: Yup.string().min(2).max(255).required(),
    phone: Yup.number().typeError('Lütfen geçerli bir telefon numarası giriniz').required(),
    country_telephone_code_id: Yup.number().integer().required(),
    email: Yup.string().min(2).max(255).email(),
    level_id: Yup.number().integer(),
    language_code: Yup.string(),
    customer_note: Yup.string().min(2).max(255),
    birth_date: Yup.string(),
    anniversary_date: Yup.string(),
    gender: Yup.string().min(2).max(6),
    assistant_full_name: Yup.string().min(2).max(255),
    assistant_phone: Yup.number().typeError('Lütfen geçerli bir telefon numarası giriniz'),
    assistant_email: Yup.string().min(2).max(255).email()
  });