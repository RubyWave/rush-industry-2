// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled, { css } from "styled-components";
import { useAppSelector } from "../hooks";

const UnstyledTimer = function ({ className }: { className?: string }) {
	const gameStates = useAppSelector((state) => state.gameStates);

	return (
		<div className={className}>
			<span>Time: {Math.floor(gameStates.time)}</span>
			<span>Round Time: {gameStates.settings.roundTime}</span>
			<span>Game state: {gameStates.theState} (space)</span>
		</div>
	);
};

const Timer = styled(UnstyledTimer)`
	position: absolute;
	z-index: 11;
	right: 2rem;
	top: 1rem;
	display: block;
	font-size: 2rem;
	span {
		display: block;
	}
`;

export default Timer;
