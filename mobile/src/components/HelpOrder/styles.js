import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 3px 0px;

  padding: 12px;
`;

export const Info = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

export const Status = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StatusText = styled.Text`
  font-weight: bold;
  color: ${props => (props.answered ? '#42CB59' : '#999')};
  padding: 0 10px;
`;

export const DateTime = styled.Text`
  color: #666;
`;

export const Question = styled.Text.attrs({
  numberOfLines: 3,
})`
  color: #666;
  padding: 10px 0;
  line-height: 24px;
  text-align: justify;
`;
