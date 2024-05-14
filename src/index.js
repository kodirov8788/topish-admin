import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Routers from './Routers';
import { AuthContextProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './components/Loading';
import { Provider } from 'react-redux';
import { store } from './store/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
     <AuthContextProvider>
      <BrowserRouter>
        <Loading />
        <ToastContainer />
        <Routers />
      </BrowserRouter>
    </AuthContextProvider>
   </Provider>
);

