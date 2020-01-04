import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;

  div {
    display: inline-flex;
    align-items: center;

    & > * {
      margin-left: 10px;
    }
  }
`;
