import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Wrapper = styled.View`
  flex-direction: row;
`;

export const Container = styled(RectButton)`
  background: ${props => (props.enabled ? props.theme.primary : '#999')};
  height: 46px;
  border-radius: 4px;

  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
