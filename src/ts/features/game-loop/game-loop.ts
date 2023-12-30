import { GameStates, endTheGame, updateTime } from "../states/GameStatesSlice";
import { Dispatch } from "redux";

/**
 * Main game loop
 *
 * return handle to next loop iteration
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function theGameLoop(gameStates: GameStates, dispatch: Dispatch) {
	const intervalLoop = setInterval(() => {
		switch (gameStates.theState) {
			case "pre-start":
				break;
			case "running":
				//update timer
				dispatch(
					updateTime(
						gameStates.time + 1 / gameStates.settings.targetFPS,
					),
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
