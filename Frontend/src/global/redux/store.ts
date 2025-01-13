import { configureStore } from "@reduxjs/toolkit";

import { authSlice, SecurityController } from "../../security";
import { AppController } from "../../app/AppControler";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,

    [SecurityController.reducerPath]: SecurityController.reducer,
    [AppController.reducerPath]: AppController.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(SecurityController.middleware)
      .concat(AppController.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
