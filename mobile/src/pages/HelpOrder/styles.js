import styled from 'styled-components/native';

export const Container = styled.View`
  background: #f5f5f5;
  flex: 1;
  padding: 20px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin: 10px 0px;
`;

export const LoaderInicator = styled.ActivityIndicator.attrs(props => ({
  size: 'large',
  color: props.theme.primary,
}))`
  margin: 10px 0;
`;
