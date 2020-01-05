import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TableContainer = styled.div`
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
  }
`;

export const TableAction = styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  border: 0;
  padding: 5px;
  color: ${props => (props.error ? '#DE3B3B' : '#4d85ee')};
`;

export const Pagination = styled.div`
  margin: 5px 0;
  display: flex;
`;

export const PaginationButton = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  background: ${props => (props.active ? props.theme.primary : '#fff')};
  font-size: 18px;
  height: 30px;
  width: 30px;
  margin: 0 1px;

  ${props =>
    props.first &&
    css`
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
    `}

  ${props =>
    props.last &&
    css`
      border-bottom-right-radius: 4px;
      border-top-right-radius: 4px;
    `}

  cursor: ${props => (props.active || props.disabled ? 'default' : 'pointer')};
  color: ${props => {
    if (props.active) return '#fff';
    if (props.disabled) return '#ddd';
    return '#000';
  }};
  svg {
    color: ${props => {
      if (props.active) return '#fff';
      if (props.disabled) return '#ddd';
      return '#000';
    }};
  }
`;

export const NoData = styled.td`
  text-align: center;
`;
