import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./features/board/boardSlice";
import gameStatesReducer from "./features/states/GameStatesSlice";

export const store = configureStore({
	reducer: {
		board: boardReducer,
		gameStates: gameStatesReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
