import {
	GameStates,
	pauseResumeTheGame,
	startTheGame,
} from "../states/GameStatesSlice";
import { Dispatch } from "redux";

/**
 * Main function to capture button presses
 *
 * return handle to event function
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function readKeyInputs(gameStates: GameStates, dispatch: Dispatch) {
	const eventFunction = function (event: KeyboardEvent) {
		//prevents event firing multiple times in row on just one button press
		if (event.repeat) return;
		switch (event.key) {
			case " ":
				switch (gameStates.theState) {
					case "pre-start":
						dispatch(startTheGame());
						break;
					case "running":
					case "paused":
						dispatch(pauseResumeTheGame());
						break;
					case "ended":
						break;
				}
				break;
		}
	};
	document.addEventListener("keydown", eventFunction, { once: true });
	return eventFunction;
}

export default readKeyInputs;
