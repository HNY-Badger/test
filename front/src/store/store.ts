import { applyMiddleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./reducers/tasksReducer";
import createSagaMiddleware from 'redux-saga';
import rootWatcher from "./saga";

const rootReducer = combineReducers({
  tasksReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootWatcher);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;