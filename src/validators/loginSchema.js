import * as Yup from 'yup';

const userSchema = Yup.object({

  email: Yup.string().matches(/[a-z 0-9]+@[a-z]+.[a-z]{2,3}$/, 'invalid email format').required("email required"),
  password: Yup.string().required('password must required'),

})
export default userSchema;