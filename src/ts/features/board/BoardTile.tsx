import styled from "styled-components";
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
	const dispatch = useAppDispatch();
	const gameStates = useAppSelector((state) => state.gameStates);

	function handleClick() {
		const selectedBuildingType = structuredClone(
			gameStates.selectedBuildingToBuild,
		); //deep copy to not clear it when changing selected building throughn UI

		if (selectedBuildingType) {
			dispatch(
				addBuildingToTile({
					tileID: tileItself.id,
					buildingToBuild: selectedBuildingType,
				}),
			);
		}
	}
	return (
		<div className={className} onClick={handleClick}>
			{tileItself.building ? tileItself.building.prettyName : ""}
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
	cursor: pointer;
	flex-direction: column;
	// margin-left: 3rem;
	span {
		display: block;
	}
`;
