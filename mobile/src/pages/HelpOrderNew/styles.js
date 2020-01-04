import styled from 'styled-components/native';

export const Container = styled.View`
  background: #f5f5f5;
  flex: 1;
  padding: 20px;
`;

export const HelpOrderTextInput = styled.TextInput.attrs({
  multiline: true,
  placeholderTextColor: '#999',
  textAlignVertical: 'top',
})`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
  flex: 1;
  font-size: 16px;
  padding: 20px;
`;
