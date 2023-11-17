import * as Yup from "yup";

const registerSchema = Yup.object({

  name: Yup.string().required('first name required').matches(/^[a-z A-Z]*$/, 'first name must have only alpha values').min(3, 'first name must have atleast 3 character'),
  email: Yup.string().matches(/^[a-z 0-9]+@[a-z]+.[a-z]{2,3}$/, 'invalid email format').required("email required"),
  password: Yup.string().required('password must required'),
  confirmPassword: Yup.string().required('password must required').oneOf([Yup.ref('password')], 'should be match')

});
export default registerSchema;
