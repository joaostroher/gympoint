import styled from 'styled-components';

export const Container = styled.div`
  width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
`;

export const Content = styled.div`
  width: 100%;
  padding: 20px;
  background: #fff;
  font-size: 16px;
  border-radius: 5px;

  table {
    width: 100%;
    border-collapse: collapse;

    thead {
      text-transform: uppercase;
      text-align: left;
      padding: 20px 0;
      th {
        padding: 5px;
      }
    }

    tbody {
      padding: 20px;
      border-collapse: collapse;

      tr {
        height: 50px;
        &:hover {
          background-color: #ddd;
        }
      }

      tr + tr {
        border-top: 1px solid #ddd;
      }

      td {
        padding: 5px;
      }
    }
  }
`;
