// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled, { css } from "styled-components";

const UnstyledButton = function ({ className }: { className?: string }) {
	return <button className={className}></button>;
};

const Button = styled(UnstyledButton)``;

export default Button;
