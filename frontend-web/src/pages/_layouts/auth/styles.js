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
  width: 350px;
  height: 400px;
  border-radius: 4px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.4);
  display: block;
  text-align: center;
  padding: 30px 20px;

  img {
    width: 150px;
    margin-bottom: 30px;
  }

  form {
    display: block;

    label {
      text-transform: uppercase;
    }
  }
`;
