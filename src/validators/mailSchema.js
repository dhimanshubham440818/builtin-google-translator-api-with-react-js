import * as Yup from 'yup';
const emailSchema = Yup.object({

    name: Yup.string().required('first name required').matches(/^[a-z A-Z]*$/, 'Name must have only alpha values').min(3, 'Name must have atleast 3 character'),
    email: Yup.string().matches(/[a-z 0-9]+@[a-z]+.[a-z]{2,3}$/, 'invalid email format').required("email required"),
    phone: Yup.string().required('Phone number required'),
    subject: Yup.string().required('message required'),
    message: Yup.string().required('message required')

})
export default emailSchema;