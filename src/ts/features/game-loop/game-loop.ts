import { BoardState } from "../board/boardSlice";
import { GameStates, endTheGame, updateTime } from "../states/GameStatesSlice";
import { Dispatch } from "redux";
import calculateBuildingsOutputsInputs from "./single-tick";

/**
 * Main game loop
 *
 * return handle to next loop iteration
 */
function theGameLoop(
	gameStates: GameStates,
	dispatch: Dispatch,
	boardTable: BoardState,
) {
	const intervalLoop = setInterval(() => {
		switch (gameStates.theState) {
			case "pre-start":
				break;
			case "running":
				//update timer
				dispatch(
					updateTime(
						gameStates.time + 1 / gameStates.settings.targetFPS, //this division is to compensate for framerate
					),
				);

				calculateBuildingsOutputsInputs(
					gameStates,
					dispatch,
					boardTable,
				);

				if (gameStates.time > gameStates.settings.roundTime) {
					dispatch(endTheGame());
				}
				break;
			case "paused":
				break;
			case "ended":
				break;
		}
	}, 1000 / gameStates.settings.targetFPS);
	return intervalLoop;
}

export default theGameLoop;
