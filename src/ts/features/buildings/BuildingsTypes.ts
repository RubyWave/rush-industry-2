import buildingTypesJSON from "../../../../common/building-types.json";
import { SingleResourceType, resourceFromSlug } from "../resources/Resources";

interface SingleBuildingType {
	name: string; //slugify name, this needs to be unique
	prettyName: string; //displayable name
	category: string; //TODO: make categories its own type as well
	cost: number; //cost in cash to build building
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
	throughput: {
		//multiplicative modifier for input and output
		inputs: {
			base: 1; //base muliplier, should always be 1
			inputsModifier: number; //depends on % of input resources avaiable, must be between 0-1
		};
		outputs: {
			base: 1; //base muliplier, should always be 1
			inputsModifier: number; //depends on % of input resources avaiable, must be between 0-1
		};
	};
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
			cost: singleType.cost,
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
			throughput: {
				inputs: {
					base: 1,
					inputsModifier: 1,
				},
				outputs: {
					base: 1,
					inputsModifier: 1,
				},
			},
		};
	},
);

export type { SingleBuildingType };
