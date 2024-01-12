import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import baseMap from "../../../../common/base-map.json";
import { SingleBuildingType } from "../buildings/BuildingsTypes";

export interface SingleTile {
	id: number; //tile ID is defined by concatenating its rows ID and itself ID, gotten from loop that render those tiles
	landType: string;
	resourceType: string;
	building?: Partial<SingleBuildingType>; //building build on this tile, if empty, no building is build
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
		rowWidth: baseMap.settings["row-width"],
	},
	rows: Array.from(baseMap.rows, (singleRow, i) => {
		return {
			id: i,
			tiles: Array.from(singleRow.tiles, (singleTile, j) => {
				return {
					id: parseInt(`${i}${j}`),
					landType: singleTile["land-type"],
					resourceType: singleTile["resource-type"],
				};
			}),
		};
	}),
};

export const boardSlice = createSlice({
	name: "board",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		addBuildingToTile: (
			state,
			action: PayloadAction<{
				tileID: number;
				buildingToBuild: Partial<SingleBuildingType>;
			}>,
		) => {
			// TODO: there must be better way of connecting elements to states, then those IDs and multiple foreach loops
			state.rows.forEach((singleRow) => {
				singleRow.tiles.forEach((singleTile) => {
					if (singleTile.id === action.payload.tileID)
						singleTile.building = action.payload.buildingToBuild;
				});
			});
		},
	},
});

export const { addBuildingToTile } = boardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBoard = (state: RootState) => state.board.rows;

export default boardSlice.reducer;

export type { BoardState };
