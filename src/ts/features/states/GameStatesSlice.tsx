import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import resourcesTable, { SingleResourceType } from "../resources/Resources";
import settings from "../../../../common/game-settings.json";

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
	stockpile: Array<RecourceInStockpile>; //array of all resources player currently owns and their count
	cash: number; //curent amount of player's cash
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
	},
});

export const { startTheGame, endTheGame, pauseResumeTheGame, updateTime } =
	GameStatesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGameStates = (state: RootState) => state.gameStates;

export default GameStatesSlice.reducer;
export { GameStates };
