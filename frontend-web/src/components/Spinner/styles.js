import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  svg {
    animation-name: spin;
    animation-duration: 800ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
`;
