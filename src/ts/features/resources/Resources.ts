import resources from "../../../../common/resources.json";

interface SingleResourceType {
	name: string; //slugify name, this needs to be unique
	prettyName: string; //displayable name
	baseValue: number; //in cash per one unit
}
interface Resources extends Array<SingleResourceType> {}

// super default building types
const resourcesTable: Resources = Array.from(resources, (singleResource) => {
	return {
		name: singleResource.name,
		prettyName: singleResource.prettyName,
		baseValue: singleResource.baseValue,
	};
});

export default resourcesTable;
export type { SingleResourceType };
