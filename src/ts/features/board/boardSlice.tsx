import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import baseMap from "../../../../common/base-map.json";

//creating interface for object
interface BoardState {
	settings: {
		rowWidth: number;
	};
	rows: Array<{
		id: number;
		tiles: Array<{
			id: number;
			landType: string;
			resourceType: string;
		}>;
	}>;
}

// Define the initial state using that type
const initialState: BoardState = {
	settings: {
		rowWidth: 3,
	},
	rows: [
		{
			id: 0,
			tiles: [
				{
					id: 0,
					landType: "grassland",
					resourceType: "coal",
				},
				{
					id: 1,
					landType: "forest",
					resourceType: "iron",
				},
				{
					id: 2,
					landType: "mountain",
					resourceType: "none",
				},
			],
		},
	],
};

export const boardSlice = createSlice({
	name: "board",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		createNewMap: (state) => {
			state.settings.rowWidth = baseMap.settings["row-width"];
			state.rows.splice(0, state.rows.length); //clears super default map

			let i = 0;
			baseMap.rows.forEach((row) => {
				i++;
				const tempRow: {
					id: number;
					landType: string;
					resourceType: string;
				}[] = [];
				let j = 0;
				row.tiles.forEach((singleTile) => {
					j++;
					tempRow.push({
						id: j,
						landType: singleTile["land-type"],
						resourceType: singleTile["resource-type"],
					});
				});

				state.rows.push({
					id: i,
					tiles: tempRow,
				});
			});
		},
	},
});

export const { createNewMap } = boardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBoard = (state: RootState) => state.board.rows;

export default boardSlice.reducer;
