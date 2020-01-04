import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1px solid #999;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);

  nav {
    display: flex;
    align-items: center;

    img {
      height: 22px;
    }

    h1 {
      font-size: 15px;
      font-weight: bold;
      color: ${props => props.theme.primary};
      margin: 0 30px 0 10px;
      padding-right: 30px;
      border-right: 1px solid #ddd;
      height: 30px;
      display: flex;
      align-items: center;
    }

    a {
      display: flex;
      align-items: center;
    }

    a + a {
      text-transform: uppercase;
      margin: 0 20px;
      font-size: 15px;
      color: #999;
      font-weight: bold;

      &.active {
        color: #444;
      }
    }
  }

  aside {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    strong {
      font-weight: bold;
      color: #666;
    }

    button {
      border: 0;
      background: transparent;
      color: ${props => props.theme.primary};
    }
  }
`;
