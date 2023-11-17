// import { legacy_createStore as createStore } from 'redux';
// import root from "./reducers/index";

// const store = createStore(root, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )
// export default store; 








import root from "./reducers/index";
import { legacy_createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, root)

  let store = legacy_createStore(persistedReducer)
  let persistor = persistStore(store)

  export { store, persistor }