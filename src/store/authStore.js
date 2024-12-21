
import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../feature/authSlice.js';
import themeSlice from '../feature/themeSlice.js';

const store = configureStore({
    reducer: {
        auth : authSlice,
        theme: themeSlice
    }
});


export default store;