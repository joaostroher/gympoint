import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;

  svg {
    margin-right: 5px;
  }

  input {
    flex: 1;
    border: 0;
    padding: 0;
    color: #999;
    &::placeholder {
      color: #999;
    }
  }
`;
