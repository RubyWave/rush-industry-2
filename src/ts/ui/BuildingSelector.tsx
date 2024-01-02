// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled, { css } from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { SingleBuildingType } from "../features/buildings/BuildingsTypes";
import { selectSpecificType } from "../features/buildings/BuildingsTypes";

function SingleBuildingSelector({
	singleType,
}: {
	singleType?: SingleBuildingType;
}) {
	const dispatch = useAppDispatch();
	function handleClick() {
		dispatch(selectSpecificType(singleType.name));
	}
	return (
		<div
			className={
				"single-type " + (singleType.ifSelected ? "selected" : "")
			}
			onClick={handleClick}
		>
			<span>{singleType.prettyName}</span>
		</div>
	);
}

const UnstyledBuildingSelector = function ({
	className,
}: {
	className?: string;
}) {
	const buildingTypes = useAppSelector((state) => state.buildingTypes);

	return (
		<div className={className}>
			{buildingTypes.map((singleType) => (
				<SingleBuildingSelector
					key={singleType.name}
					singleType={singleType}
				/>
			))}
		</div>
	);
};

const BuildingSelector = styled(UnstyledBuildingSelector)`
	position: absolute;
	z-index: 11;
	bottom: 2rem;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	gap: 0.5rem;
	.single-type {
		width: 8rem;
		height: 8rem;
		border: 0.125rem solid black;
		padding: 0.25rem;
		cursor: pointer;
		&.selected {
			transform: translateY(-0.5rem);
			box-shadow: 0px 0px 5px red;
		}
	}
`;

export default BuildingSelector;
