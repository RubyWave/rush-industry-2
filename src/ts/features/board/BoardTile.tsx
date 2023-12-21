// import { useAppSelector, useAppDispatch } from "../../hooks";
// import { add } from "./boardSlice";

//after colon it is typing of the object
export function BoardTile({ landType }: { landType: string }) {
	// The `state` arg is correctly typed as `RootState` already
	// const tile = useAppSelector((state) => state.board.tiles[2]);
	// const dispatch = useAppDispatch();

	return (
		<div>
			{/* <button onClick={() => dispatch(add())}>Increment</button> */}
			<span>{landType}</span>
		</div>
	);
}
