import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import Button from '~/components/Button';
import CheckInItem from '~/components/CheckIn';

import { Container, List } from './styles';

function CheckIn({ isFocused }) {
  const [checkIns, setCheckIns] = useState([]);

  useEffect(() => {
    async function loadCheckIns() {
      const response = await api.get('/students/18/checkins');
      setCheckIns(response.data);
    }
    if (isFocused) loadCheckIns();
  }, [isFocused]);

  async function handleCheckIn() {
    const response = await api.post('/students/18/checkins');
    setCheckIns([response.data, ...checkIns]);
  }

  return (
    <Container>
      <Button onPress={handleCheckIn}>Novo Check-in</Button>
      <List
        data={checkIns}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <CheckInItem data={item} />}
      />
    </Container>
  );
}

CheckIn.navigationOptions = {
  tabBarLabel: 'Check-ins',
  // eslint-disable-next-line
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
  title: 'Selecione o horário',
};

export default withNavigationFocus(CheckIn);
