import styled from "styled-components";
import { returnSelectedBuildingType } from "../buildings/BuildingsTypes";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { SingleTile, addBuildingToTile } from "./boardSlice";

//after colon it is typing of the object
export function UnstyledBoardTile({
	className,
	tileItself,
}: {
	className?: string;
	tileItself: SingleTile;
}) {
	const buildingTypes = useAppSelector((state) => state.buildingTypes);
	const dispatch = useAppDispatch();

	function handleClick() {
		const selectedBuildingType =
			returnSelectedBuildingType(buildingTypes) + "";
		if (selectedBuildingType === "-1")
			return; //in case no building is selected
		else {
			dispatch(
				addBuildingToTile({
					tileID: tileItself.id,
					buildingSlug: selectedBuildingType,
				}),
			);
		}
	}
	return (
		<div className={className} onClick={handleClick}>
			{tileItself.building}
		</div>
	);
}
export const BoardTile = styled(UnstyledBoardTile)`
	width: 6rem;
	height: 6rem;
	clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
	background-color: #6c6;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	// margin-left: 3rem;
	span {
		display: block;
	}
`;
