import { Dispatch } from "redux";
import { BoardState } from "../board/boardSlice";
import {
	GameStates,
	RecourceInStockpile,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	updateStockpile,
	updateWholeStockpile,
} from "../states/GameStatesSlice";
import { SingleResourceType } from "../resources/Resources";

//return specific resource from temporary stockpile
function findInStockpile(
	stockpile: Array<RecourceInStockpile>,
	singleResourceFromBuilding: SingleResourceType,
) {
	return stockpile.find((resource) => {
		return resource.resource.name === singleResourceFromBuilding.name;
	});
}

/**
 * Calculate income and cost for all buildings per pulse
 */
export default function calculateBuildingsOutputsInputs(
	gameStates: GameStates,
	dispatch: Dispatch,
	boardTable: BoardState,
) {
	//temporary stockpile is created, to dispatch agregated updates only once, to limit desynchros
	const newStockpille: Array<RecourceInStockpile> = [];
	gameStates.stockpile.forEach((resurceInStockpile) => {
		newStockpille.push(structuredClone(resurceInStockpile)); //this loop with deepcopies is needed, as deep coping top level stockpile, wont work
	});

	for (const singleRow of boardTable.rows) {
		for (const singleTile of singleRow.tiles) {
			if (!singleTile.building) continue; //skips tile with no building
			let notWorking = false; //to skip output part when there is lack of input resources

			//calculate inputs
			for (const singleInput of singleTile.building.inputs) {
				let changeValue =
					singleInput.count / gameStates.settings.targetFPS; //this division is to compensate for framerate
				changeValue =
					Math.round((changeValue + Number.EPSILON) * 1000) / 1000;

				//TODO: make that output is gradually decreased with input resource missing

				const resourceInStockpile = findInStockpile(
					newStockpille,
					singleInput.resource,
				);

				//in case there was not enough input resource, building is disabled
				if (changeValue > resourceInStockpile.count) {
					notWorking = true;
					continue;
				}

				resourceInStockpile.count =
					resourceInStockpile.count - changeValue;
				// dispatch(
				// 	updateStockpile({
				// 		resourceSlug: singleInput.resource.name,
				// 		changeValue: -changeValue,
				// 	}),
				// );
			}

			//calculate outputs
			for (const singleOutput of singleTile.building.outputs) {
				if (notWorking === true) continue; //if building doesnt work, no resources are outputed

				const resourceInStockpile = findInStockpile(
					newStockpille,
					singleOutput.resource,
				);

				let changeValue =
					singleOutput.count / gameStates.settings.targetFPS; //this division is to compensate for framerate
				changeValue =
					Math.round((changeValue + Number.EPSILON) * 1000) / 1000;

				resourceInStockpile.count =
					resourceInStockpile.count + changeValue;

				// dispatch(
				// 	updateStockpile({
				// 		resourceSlug: singleOutput.resource.name,
				// 		changeValue: changeValue,
				// 	}),
				// );
				// newStockpille.find();
			}
		}
	}
	dispatch(
		updateWholeStockpile({
			newStockpile: newStockpille,
		}),
	);
}
