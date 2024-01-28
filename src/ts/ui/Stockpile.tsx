// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled, { css } from "styled-components";
import { useAppSelector } from "../hooks";
import { SingleResourceType } from "../features/resources/Resources";

function UnstyledSingleResourceDisplayer({
	className,
	singleResource,
	count,
	resourceName,
	extraSign,
}: {
	className?: string;
	singleResource?: SingleResourceType;
	count: number;
	resourceName?: string;
	extraSign?: string;
}) {
	return (
		<div className={className}>
			<span>
				{+count.toFixed(2)}
				{extraSign ? extraSign : ""}
			</span>
			<span>
				{singleResource ? singleResource.prettyName : resourceName}
			</span>
		</div>
	);
}

const SingleResourceDisplayer = styled(UnstyledSingleResourceDisplayer)`
	display: flex;
	gap: 0.75rem;
	justify-content: space-between;
	&.cash-resource {
		font-size: 2.125rem;
		color: red;
	}
`;

const UnstyledStockpile = function ({ className }: { className?: string }) {
	const gameStates = useAppSelector((state) => state.gameStates);

	return (
		<div className={className}>
			{gameStates.stockpile.map((SingleResource) => (
				<SingleResourceDisplayer
					key={SingleResource.resource.name}
					singleResource={SingleResource.resource}
					count={SingleResource.count}
				/>
			))}
			<SingleResourceDisplayer
				count={gameStates.cash}
				resourceName={"Cash"}
				className={"cash-resource"}
				extraSign={"€"}
			/>
		</div>
	);
};

const Stockpile = styled(UnstyledStockpile)`
	position: absolute;
	z-index: 11;
	right: 2rem;
	top: 15rem;
	display: block;
	font-size: 2rem;
	span {
		display: block;
	}
`;

export default Stockpile;
