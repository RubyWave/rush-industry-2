import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import baseMap from "../../../../common/base-map.json";

export interface SingleTile {
	id: number; //tile ID is defined by concatenating its rows ID and itself ID, gotten from loop that render those tiles
	landType: string;
	resourceType: string;
	building: string; //if left empty, it means there is no building
}
interface SingleRow {
	id: number;
	tiles: Array<SingleTile>;
}
interface BoardState {
	settings: {
		rowWidth: number;
	};
	rows: Array<SingleRow>;
}

// Define the initial state using that type
const initialState: BoardState = {
	settings: {
		rowWidth: 3,
	},
	rows: [
		{
			id: 1,
			tiles: [
				{
					id: 11,
					landType: "grassland",
					resourceType: "coal",
					building: "",
				},
				{
					id: 12,
					landType: "forest",
					resourceType: "iron",
					building: "",
				},
				{
					id: 13,
					landType: "mountain",
					resourceType: "none",
					building: "",
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
				// TODO: check why using here interface for single tile doesn't work
				const tempRow: {
					id: number;
					landType: string;
					resourceType: string;
					building: string; //if left empty, it means there is no building
				}[] = [];
				let j = 0;
				row.tiles.forEach((singleTile) => {
					j++;
					tempRow.push({
						id: parseInt(`${i}${j}`),
						landType: singleTile["land-type"],
						resourceType: singleTile["resource-type"],
						building: "",
					});
				});

				state.rows.push({
					id: i,
					tiles: tempRow,
				});
			});
		},
		addBuildingToTile: (
			state,
			action: PayloadAction<{ tileID: number; buildingSlug: string }>,
		) => {
			// TODO: there must be better way of connecting elements to states, then those IDs and multiple foreach loops
			state.rows.forEach((singleRow) => {
				singleRow.tiles.forEach((singleTile) => {
					if (singleTile.id === action.payload.tileID)
						singleTile.building = action.payload.buildingSlug;
				});
			});
		},
	},
});

export const { createNewMap, addBuildingToTile } = boardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBoard = (state: RootState) => state.board.rows;

export default boardSlice.reducer;
