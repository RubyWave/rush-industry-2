//TODO: make general Button element, and extend it here
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled, { css } from "styled-components";
import { useAppDispatch } from "../hooks";
import { sellStockpile } from "../features/states/GameStatesSlice";

const UnstyledSellButton = function ({ className }: { className?: string }) {
	const dispatch = useAppDispatch();
	function handleClick() {
		dispatch(
			sellStockpile({
				sellPercentage: 0.5,
			}),
		);
	}
	return (
		<button className={className} onClick={handleClick}>
			Sell 50% of resources (s)
		</button>
	);
};

const SellButton = styled(UnstyledSellButton)`
	position: absolute;
	z-index: 11;
	right: 2rem;
	top: 26rem;
	display: block;
	font-size: 1.625rem;
`;

export default SellButton;
