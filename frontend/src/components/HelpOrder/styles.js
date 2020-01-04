import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  h2 {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
    margin: 5px 0;
    color: #444;
  }

  div {
    font-size: 16px;
    margin: 5px 0 10px;
    text-align: justify;
    color: #666;
  }

  textarea {
    resize: none;
    padding: 10px;
    font-size: 16px;
    color: #999;
    border: 1px solid #ddd;
    border-radius: 4px;
    text-align: justify;
  }
`;
