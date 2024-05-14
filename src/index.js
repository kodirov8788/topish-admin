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
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/query-client';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <QueryClientProvider client={queryClient}>
    <Provider store={store}>
     <AuthContextProvider>
      <BrowserRouter>
        <Loading />
        <ToastContainer />
        <Routers />
      </BrowserRouter>
    </AuthContextProvider>
   </Provider>
   </QueryClientProvider>
);

