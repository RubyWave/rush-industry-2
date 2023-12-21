import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Define a type for the slice state
interface BoardState {
	//creating interface for object
	tiles: Array<{
		id: number;
		landType: string;
	}>;
}

// Define the initial state using that type
const initialState: BoardState = {
	tiles: [
		{
			id: 0,
			landType: "grassland",
		},
		{
			id: 1,
			landType: "forest",
		},
		{
			id: 2,
			landType: "mountain",
		},
	],
};

export const boardSlice = createSlice({
	name: "board",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		add: (state) => {
			state.tiles.push({ id: 3, landType: "123" });
		},
		// Use the PayloadAction type to declare the contents of `action.payload`
		remove: (state, action: PayloadAction<number>) => {
			if (action.payload > -1) {
				state.tiles.splice(action.payload, 1);
			}
		},
		// incrementByAmount: (state, action: PayloadAction<number>) => {
		// 	state.value += action.payload;
		// },
	},
});

export const { add, remove } = boardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBoard = (state: RootState) => state.board.tiles;

export default boardSlice.reducer;
