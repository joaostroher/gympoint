import styled from 'styled-components';

export default styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || '1'}, 1fr);
  grid-gap: 10px;
`;
