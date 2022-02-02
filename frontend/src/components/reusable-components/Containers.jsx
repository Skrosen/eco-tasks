import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: block;
  /* position: fixed; */
  height: 200px;
  width: 100vw;
  align-items: center;
  background-color: green;
  text-align: center;
  top: 0;
  left: 0;
`;

export const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
