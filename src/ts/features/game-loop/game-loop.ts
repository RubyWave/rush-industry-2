import { BoardState } from "../board/boardSlice";
import {
	GameStates,
	endTheGame,
	updateStockpile,
	updateTime,
} from "../states/GameStatesSlice";
import { Dispatch } from "redux";

/**
 * Calculate income and cost for all buildings per pulse
 */
function calculateBuildingsOutputsInputs(
	gameStates: GameStates,
	dispatch: Dispatch,
	boardTable: BoardState,
) {
	for (const singleRow of boardTable.rows) {
		for (const singleTile of singleRow.tiles) {
			if (!singleTile.building) continue; //skips tile with no building
			console.log(singleTile.building);

			//calculate inputs
			for (const singleInput of singleTile.building.inputs) {
				console.log(singleInput.resource.name);
				let changeValue =
					singleInput.count / gameStates.settings.targetFPS; //this division is to compensate for framerate
				changeValue =
					Math.round((changeValue + Number.EPSILON) * 1000) / 1000;

				dispatch(
					updateStockpile({
						resourceSlug: singleInput.resource.name,
						changeValue: -changeValue,
					}),
				);
			}

			//calculate outputs
			for (const singleOutput of singleTile.building.outputs) {
				console.log(singleOutput.resource.name);

				let changeValue =
					singleOutput.count / gameStates.settings.targetFPS; //this division is to compensate for framerate
				changeValue =
					Math.round((changeValue + Number.EPSILON) * 1000) / 1000;
				dispatch(
					updateStockpile({
						resourceSlug: singleOutput.resource.name,
						changeValue: changeValue,
					}),
				);
			}
		}
	}
}

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
