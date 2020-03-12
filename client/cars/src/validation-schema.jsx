import * as yup from 'yup';

const validation = yup.object().shape({
  firstName: yup.string().required('asdasd').min(3, 'ttt!'),
  lastName: yup.string().required().min(3),
  age: yup.number().required().integer().min(18),
});

export default validation;
