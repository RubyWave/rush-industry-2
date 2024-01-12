import buildingTypesJSON from "../../../../common/building-types.json";

interface SingleBuildingType {
	name: string; //slugify name, this needs to be unique
	prettyName: string; //displayable name
	category: string; //TODO: make categories its own type as well
	ifSelected: boolean; //notifiy if this type is selected, as to be build
}
interface BuildingTypes extends Array<SingleBuildingType> {}

// super default building types
export const buildingTypes: BuildingTypes = Array.from(
	buildingTypesJSON,
	(singleType) => {
		return {
			name: singleType.name,
			prettyName: singleType.prettyName,
			category: singleType.category,
			ifSelected: false,
		};
	},
);

/**
 * Returns currectly selected building type
 * @returns build type slug, or null if no building is selected
 */
export function returnSelectedBuildingType(
	buildingTypes: BuildingTypes,
): number | string {
	let tempType: string | number = -1;
	buildingTypes.forEach((singleType) => {
		if (singleType.ifSelected === true) tempType = singleType.name;
	});
	return tempType;
}

// selectSpecificType: (state, action: PayloadAction<string>) => {
// 	state.forEach((singleType) => {
// 		if (singleType.name === action.payload)
// 			singleType.ifSelected = !singleType.ifSelected;
// 		else singleType.ifSelected = false; //reset every other selection
// 	});
// },

export type { SingleBuildingType };
