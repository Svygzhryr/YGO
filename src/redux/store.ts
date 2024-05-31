import { combineReducers, configureStore } from '@reduxjs/toolkit';
import controlledForm from './reducers/controlledSlice';
import uncontrolledForm from './reducers/uncontrolledSlice';
import notitication from './reducers/notificationSlice';

const rootReducer = combineReducers({
  controlledForm,
  uncontrolledForm,
  notitication,
});

export const setupStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof setupStore.dispatch;
