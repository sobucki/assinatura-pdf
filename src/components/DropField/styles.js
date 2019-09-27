import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Field = styled.div`
  display: flex;
  margin: 10px;
  padding: 10px;
  height: 500px;
  max-width: 500px;
  border-color: #b34e7e;
  border-style: dashed;
  border-radius: 5px;
  justify-content: center;
  align-items: center;

  span {
    font-size: 22px;
    height: 20px;
    color: #b34e7e;
    font-weight: bold;
  }
`;

export const Button = styled.button`
  flex: 1;
  width: 80%;
  /* max-width: 500px; */
  height: 50%;
  margin-top: 5px;
  border: 3px solid #b34e7e;
  border-radius: 5px;
  font-weight: bold;
  background: #b34e7e;
  color: rgb(230, 230, 230);
  font-size: 18px;
  cursor: pointer;
`;
