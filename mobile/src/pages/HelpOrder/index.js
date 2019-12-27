import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import Button from '~/components/Button';
import HelpOrderItem from '~/components/HelpOrder';

import { Container, List } from './styles';

function HelpOrder({ isFocused }) {
  const [helOrders, setHelOrders] = useState([]);

  useEffect(() => {
    async function loadHelOrders() {
      const response = await api.get('/students/18/help-orders');
      setHelOrders(response.data);
    }
    if (isFocused) loadHelOrders();
  }, [isFocused]);

  return (
    <Container>
      <Button onPress={() => {}}>Novo pedido de auxílio</Button>
      <List
        data={helOrders}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <HelpOrderItem data={item} />}
      />
    </Container>
  );
}

HelpOrder.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
  // eslint-disable-next-line
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(HelpOrder);
