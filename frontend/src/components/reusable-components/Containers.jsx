import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: absolute;
  height: 10%;
  width: 100vw;
  align-items: center;
  background-color: ${(props) => props.theme.darkGreen};
  text-align: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 1;

  @media (min-width: 768px) {
    height: 90px;
  }

  @media (min-width: 1024px) {
    height: 130px;
  }
`;

export const HeaderFlexContainer = styled.div`
  display: inline-flex;
  grid-column: span 1;
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
  margin: 100px auto 0 auto;
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
  margin: 20px;
`;

export const FlexRowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
