// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled, { css } from "styled-components";
import { useAppSelector } from "../hooks";
import { SingleResourceType } from "../features/resources/Resources";

function UnstyledSingleResourceDisplayer({
	className,
	singleResource,
	count,
	resourceName,
}: {
	className?: string;
	singleResource?: SingleResourceType;
	count: number;
	resourceName?: string;
}) {
	return (
		<div className={className}>
			<span>
				{singleResource ? singleResource.prettyName : resourceName}:
			</span>
			<span>{count}</span>
		</div>
	);
}

const SingleResourceDisplayer = styled(UnstyledSingleResourceDisplayer)`
	display: flex;
	gap: 0.75rem;
	justify-content: space-between;
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
