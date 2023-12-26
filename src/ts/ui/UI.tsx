/* eslint-disable @typescript-eslint/no-unused-vars */
import styled, { css } from "styled-components";

const UnstyledUI = function ({ className }: { className?: string }) {
	return (
		<div className={className}>
			<span>hola</span>
		</div>
	);
};

const UI = styled(UnstyledUI)`
	color: red;
	background: blue;
	display: block;
`;

export default UI;
