import styled from 'styled-components/native';

export const Container = styled.View`
  background: #f5f5f5;
  flex: 1;
  padding: 20px;
`;

export const Detail = styled.View`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
`;

export const HeaderQuestion = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const Title = styled.Text`
  font-weight: bold;
  color: #444;
`;
export const DateTime = styled.Text`
  color: #666;
`;
export const Question = styled.Text`
  margin-top: 15px;
  color: #666;
`;
export const HeaderAnswer = styled.View`
  margin-top: 30px;
`;
export const Answer = styled.Text`
  margin-top: 15px;
  color: #666;
`;
