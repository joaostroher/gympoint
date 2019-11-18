import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 20px;
  background: #fff;
  font-size: 16px;
  border-radius: 5px;

  table {
    width: 100%;
    border-collapse: collapse;

    th.align-left,
    td.align-left {
      text-align: left;
    }
    th.align-right,
    td.align-right {
      text-align: right;
    }
    th.align-center,
    td.align-center {
      text-align: center;
    }

    thead {
      text-transform: uppercase;
      text-align: left;
      th {
        padding: 5px 5px 15px;
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

    button {
      background: transparent;
      border: 0;
      padding: 5px;
    }
  }
`;
