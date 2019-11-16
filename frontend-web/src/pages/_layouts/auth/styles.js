import styled from 'styled-components';

export const Container = styled.div`
  background: ${props => props.theme.primary};
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  background: #fff;
  width: 370px;
  min-height: 400px;
  border-radius: 4px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.4);
  display: block;
  text-align: center;
  padding: 30px;

  img {
    width: 150px;
    margin-bottom: 30px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-weight: bold;

    label {
      text-transform: uppercase;
      color: #444;
      text-align: left;
      width: 100%;
      margin-top: 15px;
    }

    input {
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 4px;
      line-height: 30px;
      margin: 5px 0 0;
      padding: 5px 15px;
      color: #999;
      font-size: 16px;
    }

    span {
      margin: 5px 0;
      color: #999;
      font-size: 12px;
    }

    button {
      border: 0;
      padding: 15px;
      border-radius: 5px;
      text-transform: uppercase;
      background: ${props => props.theme.primary};
      color: #fff;
      font-weight: bold;
      width: 100%;
      margin: 10px 0;
      transition: background 300ms;

      &:hover {
        background: ${props => props.theme.dark.primary};
      }
    }
  }

  a {
    color: #999;
    text-align: center;
    width: 100%;
    margin: 10px 0;
  }
`;
