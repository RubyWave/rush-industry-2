import buildingTypesJSON from "../../../../common/building-types.json";
import { SingleResourceType, resourceFromSlug } from "../resources/Resources";

interface SingleBuildingType {
	name: string; //slugify name, this needs to be unique
	prettyName: string; //displayable name
	category: string; //TODO: make categories its own type as well
	inputs: Array<{
		//resources that are consumed by buildig
		count: number; //units per second
		resource: SingleResourceType;
	}>;
	outputs: Array<{
		//resources that are produced by buildig
		count: number; //units per second
		resource: SingleResourceType;
	}>;
}
interface BuildingTypes extends Array<SingleBuildingType> {}

//load building types from common files
export const buildingTypes: BuildingTypes = Array.from(
	buildingTypesJSON,
	(singleType) => {
		return {
			name: singleType.name,
			prettyName: singleType.prettyName,
			category: singleType.category,
			inputs: Array.from(singleType.inputs, (singleInput) => {
				return {
					count: singleInput.count,
					resource: resourceFromSlug(singleInput.resource),
				};
			}),
			outputs: Array.from(singleType.outputs, (singleOutput) => {
				return {
					count: singleOutput.count,
					resource: resourceFromSlug(singleOutput.resource),
				};
			}),
		};
	},
);

export type { SingleBuildingType };
