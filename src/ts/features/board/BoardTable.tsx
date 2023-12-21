import { useAppSelector } from "../../hooks";
// import { add, remove } from "./boardSlice";
import { BoardTile } from "./BoardTile";

export function BoardTable() {
	// The `state` arg is correctly typed as `RootState` already
	const tiles = useAppSelector((state) => state.board.tiles);
	// const dispatch = useAppDispatch();

	return (
		<div>
			{tiles.map((tile) => (
				<BoardTile key={tile.id} landType={tile.landType} />
			))}
		</div>
	);
}
