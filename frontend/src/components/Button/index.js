import styled from 'styled-components';

export default styled.button`
  background-color: ${props =>
    props.color === 'secondary' ? props.theme.secondary : props.theme.primary};
  border: 0;
  color: #fff;
  padding: 5px 15px;
  font-weight: bold;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;

  svg {
    margin: 0 5px 0 0;
  }
`;
