// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled, { css } from "styled-components";
import Timer from "./Timer";
import BuildingSelector from "./BuildingSelector";
import Stockpile from "./Stockpile";

const UnstyledUI = function ({ className }: { className?: string }) {
	return (
		<div className={className}>
			<Timer />
			<BuildingSelector />
			<Stockpile />
		</div>
	);
};

const UI = styled(UnstyledUI)`
	// position: absolute;
	// z-index: 10;
	// left: 0;
	// top: 0;
	// width: 100vw;
	// height: 100vh;
`;

export default UI;
