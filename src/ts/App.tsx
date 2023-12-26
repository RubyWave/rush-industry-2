import { BoardTable } from "./features/board/BoardTable";
import UI from "./ui/UI";

function App() {
	return (
		<div className="app">
			<BoardTable />
			{/* <StyledUI /> */}
			<UI />
		</div>
	);
}

export default App;
