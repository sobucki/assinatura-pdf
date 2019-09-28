import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  /* align-items: center; */
  height: 100%;
  /* justify-content: center; */
  flex-direction: column;
`;

export const DrawContainer = styled.div`
  width: 100%;
  height: 80%;
  flex: 1;
  border-style: solid;
  border-color: #cccccc;
  border-radius: 5px;
`;

export const ButtonsContainer = styled.div`
  height: 20%;
  width: 100%;
  justify-content: flex-start;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  /* flex: 1; */
  width: 100%;
  /* flex-grow: 1; */
  /* max-width: 500px; */
  height: 50px;
  margin-top: 5px;
  border: 3px solid #b34e7e;
  border-radius: 5px;
  font-weight: bold;
  background: #b34e7e;
  color: rgb(230, 230, 230);
  font-size: 18px;
  cursor: pointer;
`;
