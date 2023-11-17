import * as Yup from 'yup';
const productSchema = Yup.object({

    name: Yup.string().required('Product name required'),
    price: Yup.string().required('Product price required'),
    size: Yup.string().required('Product size required'),
    category: Yup.string().required('Product category required'),
    description: Yup.string(),
    image: Yup.string().required('Product image required'),

})
export default productSchema;