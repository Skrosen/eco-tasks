import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: absolute;
  height: 80px;
  width: 100vw;
  align-items: center;
  background-color: ${(props) => props.theme.darkGreen};
  text-align: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: auto;

  @media (min-width: 768px) {
    height: 90px;
  }

  @media (min-width: 1024px) {
    height: 100px;
  }

  @media (min-width: 1920px) {
    height: 110px;
  }
`;

export const HeaderFlexContainer = styled.div`
  display: inline-flex;
  grid-column: span 2;

  @media (min-width: 768px) {
    grid-column: span 1;
  }
`;

export const MainContainer = styled.div`
  margin: 120px auto 0 auto;
  width: 80%;
  max-width: 768px;
  border-radius: 10px;
  background-color: white;
  padding: 30px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  @media (min-width: 768px) {
    margin: 130px auto 0 auto;
  }

  @media (min-width: 1024px) {
    margin: 140px auto 0 auto;
  }

  @media (min-width: 1920px) {
    margin: 150px auto 0 auto;
  }
`;

export const LoginContainer = styled.div`
  margin: 130px auto 0 auto;
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
  align-items: baseline;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MainFlexContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    padding: 0 50px 50px 50px;
  }
`;

export const ChildFlexContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
  }
`;
