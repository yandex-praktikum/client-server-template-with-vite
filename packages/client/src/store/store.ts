import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/auth.reducer';
import forumReducer from './reducers/forum.reducer';
import gameReducer from './reducers/game.reducer';
import leadersReducer from './reducers/leaders.reducer';

const store = configureStore({
  reducer: {
    game: gameReducer,
    auth: authReducer,
    leaders: leadersReducer,
    forum: forumReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
