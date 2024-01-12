import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import resourcesTable, { SingleResourceType } from "../resources/Resources";
import settings from "../../../../common/game-settings.json";
import { SingleBuildingType } from "../buildings/BuildingsTypes";
import equal from "fast-deep-equal";

interface RecourceInStockpile {
	resource: SingleResourceType; //type of resource
	count: number; //number of resource in stockpile
}

// Define a type for the slice state
interface GameStates {
	//creating interface for object
	theState: "pre-start" | "running" | "paused" | "ended"; //shows the state of the game
	time: number; //in seconds
	settings: {
		roundTime: number; //in seconds
		targetFPS: number; //in frames per seconds
	};
	stockpile: Array<RecourceInStockpile>; //array of all resources player curently owns and their count
	cash: number; //curent amount of player's cash
	selectedBuildingToBuild?: Partial<SingleBuildingType>; //curently selected building, to be build, if empty, no building is selected
}

// Define the initial state using that type
const initialState: GameStates = {
	theState: "pre-start",
	time: 0,
	settings: {
		roundTime: settings["round-time-in-seconds"],
		targetFPS: settings["desired-fps"],
	},
	stockpile: Array.from(resourcesTable, (singleResource) => {
		const temp: RecourceInStockpile = {
			resource: singleResource,
			count: 0,
		};
		return temp;
	}),
	cash: 0,
};

export const GameStatesSlice = createSlice({
	name: "gameStates",
	initialState,
	reducers: {
		startTheGame: (state) => {
			state.theState = "running";
		},
		endTheGame: (state) => {
			state.theState = "ended";
		},
		pauseResumeTheGame: (state) => {
			if (state.theState === "running") state.theState = "paused";
			else if (state.theState === "paused") state.theState = "running";
		},
		updateTime: (state, action: PayloadAction<number>) => {
			state.time = action.payload;
		},
		changeSelectedBuildingToBuild: (
			state,
			action: PayloadAction<{
				buildingType: Partial<SingleBuildingType>;
				gameStates: GameStates;
			}>,
		) => {
			if (
				equal(
					action.payload.gameStates.selectedBuildingToBuild,
					action.payload.buildingType,
				)
			)
				delete state.selectedBuildingToBuild;
			else state.selectedBuildingToBuild = action.payload.buildingType;
		},
		updateStockpile: (
			state,
			action: PayloadAction<{
				resourceSlug: string;
				changeValue: number;
			}>,
		) => {
			for (const singleResource of state.stockpile) {
				if (
					singleResource.resource.name === action.payload.resourceSlug
				)
					singleResource.count =
						singleResource.count + action.payload.changeValue;
			}
		},
	},
});

export const {
	startTheGame,
	endTheGame,
	pauseResumeTheGame,
	updateTime,
	changeSelectedBuildingToBuild,
	updateStockpile,
} = GameStatesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGameStates = (state: RootState) => state.gameStates;

export default GameStatesSlice.reducer;
export { GameStates };
