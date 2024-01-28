// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled, { css } from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
	SingleBuildingType,
	buildingTypes,
} from "../features/buildings/BuildingsTypes";
import { changeSelectedBuildingToBuild } from "../features/states/GameStatesSlice";

function SingleBuildingSelector({
	singleType,
}: {
	singleType?: SingleBuildingType;
}) {
	const gameStates = useAppSelector((state) => state.gameStates);
	const ifSelected = gameStates.selectedBuildingToBuild;
	let buyable: boolean;
	if (gameStates.cash > singleType.cost) buyable = true;
	else buyable = false;

	const dispatch = useAppDispatch();
	function handleClick() {
		dispatch(
			changeSelectedBuildingToBuild({
				buildingType: singleType,
				gameStates: gameStates,
			}),
		);
	}
	return (
		<div
			className={
				"single-type " + (ifSelected === singleType ? "selected" : "")
			}
			onClick={handleClick}
		>
			<span
				className={
					"building-name " + (buyable ? "buyable" : "not-buyable")
				}
			>
				{singleType.prettyName}
			</span>
			<span>cost: {singleType.cost}€</span>
			<div className="inputs">
				<span>Inputs:</span>
				{singleType.inputs.map((singleResource, i) => (
					<span className="single-inputoutput" key={i}>
						{singleResource.count}{" "}
						{singleResource.resource.prettyName}
					</span>
				))}
			</div>
			<div className="outputs">
				<span>Outputs:</span>
				{singleType.outputs.map((singleResource, i) => (
					<span className="single-inputoutput" key={i}>
						{singleResource.count}{" "}
						{singleResource.resource.prettyName}
					</span>
				))}
			</div>
		</div>
	);
}

const UnstyledBuildingSelector = function ({
	className,
}: {
	className?: string;
}) {
	return (
		<div className={className}>
			{buildingTypes.map((singleType) => (
				<SingleBuildingSelector
					key={singleType.name}
					singleType={singleType}
				/>
			))}
		</div>
	);
};

const BuildingSelector = styled(UnstyledBuildingSelector)`
	position: absolute;
	z-index: 11;
	bottom: 2rem;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	gap: 0.5rem;
	.single-type {
		width: 8rem;
		height: 8rem;
		border: 0.125rem solid black;
		padding: 0.25rem;
		cursor: pointer;
		&.selected {
			transform: translateY(-0.5rem);
			box-shadow: 0px 0px 5px red;
		}
		span {
			display: block;
			font-size: 0.875rem;
		}
		.building-name {
			font-size: 1.25rem;
			&.not-buyable {
				color: red;
			}
		}
		.inputs,
		.outputs {
			.single-inputoutput {
				margin-left: 0.375rem;
			}
		}
		.inputs {
			color: brown;
		}
		.outputs {
			color: green;
		}
	}
`;

export default BuildingSelector;
