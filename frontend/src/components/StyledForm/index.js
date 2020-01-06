import styled from 'styled-components';
import { Form } from '@rocketseat/unform';

export default styled(Form)`
  background: #fff;
  padding: 30px;
  border-radius: 4px;

  label {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
    color: #444;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  *:not(.react-select__input) {
    & > input {
      border-radius: 4px;
      border: 1px solid #ddd;
      height: 44px;
      padding: 0px 10px;
      color: #999;
      margin-top: 5px;
      &::placeholder {
        color: #999;
      }
    }
  }

  .react-select-container {
    margin-top: 5px;
  }

  span {
    font-weight: normal;
    text-transform: none;
    color: #B00;
    margin-top: 2px;
  }

  select {
    border-radius: 4px;
    border: 1px solid #ddd;
    background: #fff;
    height: 44px;
    padding: 0px 10px;
    color: #999;
    margin-top: 5px;

    option {
      line-height: 20px;
    }
  }
`;
