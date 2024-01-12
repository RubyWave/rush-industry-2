import { BoardTable } from "./features/board/BoardTable";
import UI from "./ui/UI";
import theGameLoop from "./features/game-loop/game-loop";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import readKeyInputs from "./features/inputs/read-keys-inputs";

function App() {
	const gameStates = useAppSelector((state) => state.gameStates);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const eventFunHandler = readKeyInputs(gameStates, dispatch);
		const loopID = theGameLoop(gameStates, dispatch);
		//clears game loop, coz useEffect is called twice in development mode
		return () => {
			clearInterval(loopID);
			document.removeEventListener("keydown", eventFunHandler);
		};
	});

	return (
		<div className="app">
			<BoardTable />
			<UI />
		</div>
	);
}

export default App;
