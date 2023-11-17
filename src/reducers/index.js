import cartReducer from "./cartReducer";
import { combineReducers } from 'redux'

const root = combineReducers({
    cartReducer
})

export default root;