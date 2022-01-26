import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgb(255, 255, 255);
    font-family: "rubik";
  }
  `;

export const MainContainer = styled.div`
  width: 90%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.8);
  margin: 30px;
`;

export const SmallContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Form = styled.form`
  padding: 15px;
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

export const File = styled.input`
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
`;

export const LabelFile = styled.label`
  position: relative;
  margin-top: 15px;
  padding: 5px;
  text-align: center;
  font-family: inherit;
  font-size: 22px;
  color: #000000;
  background: rgb(255, 255, 255);
  cursor: pointer;
  transition: ease-out 0.5s;
  border-radius: 30px;
  border: 2px solid #000000;
  border-radius: 10px;

  &:hover {
    color: white;
    box-shadow: inset 0 -100px 0 0 #000000;
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const FileName = styled.p`
  position: absolute;
  bottom: -35px;
  left: 10px;
  font-size: 0.85rem;
  color: #555;
`;

export const StyledTable = styled.table`
  border: none;
  border-collapse: separate;
  border-spacing: 0 10px;

  tbody {
    vertical-align: middle;
  }
  td,
  th {
    border: 2px;
  }

  td {
    padding: 5px 10px;
    vertical-align: middle;
  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: #e3f6c9;
    }
  }
  thead > tr {
    background-color: #74b974;
  }
`;

export const Link = styled.a`
  color: #000000;
  font-size: var(--medium-text);
  text-decoration: none;
  margin-left: 5px;

  :hover {
    color: grey;
  }
`;

export const Button = styled.button`
  position: relative;
  text-align: center;
  font-family: inherit;
  font-size: 14px;
  letter-spacing: 1px;
  text-decoration: none;
  color: #000000;
  background: rgb(255, 255, 255);
  cursor: pointer;
  transition: ease-out 0.5s;
  border-radius: 30px;
  border: 2px solid #000000;
  border-radius: 10px;

  &:hover {
    color: white;
    box-shadow: inset 0 -100px 0 0 #000000;
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const SubmitButton = styled.button`
  position: relative;
  margin-top: 15px;
  text-align: center;
  font-family: inherit;
  font-size: 22px;
  color: #000000;
  background: rgb(255, 255, 255);
  cursor: pointer;
  transition: ease-out 0.5s;
  border-radius: 30px;
  border: 2px solid #000000;
  border-radius: 10px;

  &:hover {
    color: white;
    box-shadow: inset 0 -100px 0 0 #000000;
  }

  &:active {
    transform: scale(0.9);
  }
`;
