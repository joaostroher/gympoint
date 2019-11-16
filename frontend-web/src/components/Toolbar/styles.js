import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 0;

  div {
    display: inline-flex;
    align-items: center;

    * {
      margin-left: 10px;
    }

    button {
      border: 0;
      background: ${props => props.theme.primary};
      color: #fff;
      padding: 5px 15px;
      font-weight: bold;
      border-radius: 5px;
      display: inline-flex;
      align-items: center;

      svg {
        margin: 0 5px 0 0;
      }
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
      &:before {
      }
    }
  }
`;
