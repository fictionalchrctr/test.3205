import * as yup from 'yup'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Электронная почта обязательна для заполнения')
    .email('Email введён некорректно'),
  number: yup
    .string()
    .matches(/^\d*$/, 'Введите число или оставьте поле пустым')
})

export default validationSchema
