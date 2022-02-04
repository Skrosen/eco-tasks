import styled from "styled-components";

export const HeaderContainer = styled.div`
	display: block;
	position: absolute;
	height: 10%;
	width: 100vw;
	align-items: center;
	background-color: ${(props) => props.theme.darkGreen};
	text-align: center;
	top: 0;
	left: 0;
	z-index: 1;

	@media (min-width: 668px) {
		height: 130px;
	}
`;

export const MainContainer = styled.div`
	margin: 200px auto 0 auto;
	width: 80%;
	border-radius: 10px;
	background-color: white;
	padding: 30px;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

export const LoginContainer = styled.div`
	height: 100vh;
	margin-top: 10%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	@media (min-width: 668px) {
		margin-top: 0;
	}
`;

export const ModeContainer = styled.form`
	display: flex;
`;

export const Form = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 10px;
`;

export const FlexRowContainer = styled.div`
	display: flex;
	flex-direction: row;
`;
