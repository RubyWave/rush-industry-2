import styled from "styled-components";

//after colon it is typing of the object
export function UnstyledBoardTile({
	className,
	landType,
	resourceType,
}: {
	className?: string;
	landType: string;
	resourceType: string;
}) {
	return (
		<div className={className}>
			<span>land: {landType}</span>
			<span>resource: {resourceType}</span>
		</div>
	);
}
export const BoardTile = styled(UnstyledBoardTile)`
	width: 6rem;
	height: 6rem;
	clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
	background-color: #6c6;
	position: relative;
	display: flex;
	align-items: center;
	flex-direction: column;
	// margin-left: 3rem;
	span {
		display: block;
	}
`;
