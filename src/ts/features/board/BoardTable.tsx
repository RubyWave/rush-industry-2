import styled from "styled-components";
import { useAppSelector } from "../../hooks";
import { BoardTile } from "./BoardTile";

function UnstyledBoardTable({ className }: { className?: string }) {
	const rows = useAppSelector((state) => state.board.rows);
	return (
		<div className={className}>
			{rows.map((row) => (
				<div className="map-row" key={row.id}>
					{row.tiles.map((tile) => (
						<BoardTile key={tile.id} tileItself={tile} />
					))}
				</div>
			))}
		</div>
	);
}

export const BoardTable = styled(UnstyledBoardTable)`
	margin-top: 4rem;
	margin-left: auto;
	margin-right: auto;
	max-width: 60vw;

	.map-row {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		width: max-content;
		grid-column-gap: 0.5rem;
		&:nth-of-type(2n) {
			margin-left: 3.2rem;
			margin-top: -1rem;
			margin-bottom: -1rem;
		}
	}
`;
