import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import {store}  from './store';
import {persistor}  from './store';
import { Provider } from 'react-redux'
import CustomLoader from './components/CustomLoader';
import { PersistGate } from 'redux-persist/integration/react'
const App = React.lazy(() => import('./App'));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                  <Suspense fallback={<CustomLoader />}>
                        <App />
                  </Suspense>
            </PersistGate>
      </Provider>
);