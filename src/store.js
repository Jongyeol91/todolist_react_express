import {
    combineReducers,
    configureStore,
    getDefaultMiddleware
} from "@reduxjs/toolkit";

import todolistSlice from './reducers/todolist';

const rootReducer = combineReducers({todos: todolistSlice.reducer});

const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()],
    devTools: true
});

export default store;
