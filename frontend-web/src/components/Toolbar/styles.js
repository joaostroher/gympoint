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

    * {
      margin-left: 10px;
    }

    input {
      border-radius: 5px;
      border: 1px solid #ddd;
      height: 34px;
      padding: 5px;
      color: #999;
      &::placeholder {
        color: #999;
      }
    }
  }
`;
