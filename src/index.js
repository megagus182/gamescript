import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import App from './App';
import { ColorContextProvider } from './components/Theme/Theme';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { PK_STRIPE } from './config';

const stripePromise = loadStripe(PK_STRIPE);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ColorContextProvider>
                <Elements stripe={stripePromise}>
                    <App />
                </Elements>
            </ColorContextProvider>
        </Provider>
    </React.StrictMode>
);
