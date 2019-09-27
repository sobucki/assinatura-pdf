import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
`;

export const Button = styled.button`
  width: 80%;
  max-width: 500px;
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
