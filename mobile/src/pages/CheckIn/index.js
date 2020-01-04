import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import Button from '~/components/Button';
import CheckInItem from '~/components/CheckIn';

import { Container, List, LoaderInicator } from './styles';

function CheckIn({ isFocused }) {
  const student = useSelector(state => state.auth.student);

  const [checkIns, setCheckIns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const loadCheckIns = useCallback(
    async (initialPage = 1, initialCheckIns = []) => {
      const response = await api.get(`/students/${student}/checkins`, {
        params: { page: initialPage },
      });
      setCheckIns([...initialCheckIns, ...response.data]);
      setPage(response.data.length > 0 ? initialPage + 1 : 0);
    },
    [student]
  );

  useEffect(() => {
    async function handle() {
      setCheckIns([]);
      setLoading(true);
      try {
        await loadCheckIns();
      } finally {
        setLoading(false);
      }
    }
    if (isFocused) handle();
  }, [isFocused, loadCheckIns]);

  async function handleRefresh() {
    setCheckIns([]);
    setRefreshing(true);
    try {
      await loadCheckIns();
    } finally {
      setRefreshing(false);
    }
  }

  async function handleEndReached() {
    if (!loading && page !== 0) {
      setLoading(true);
      try {
        await loadCheckIns(page, checkIns);
      } finally {
        setLoading(false);
      }
    }
  }

  async function handleCheckIn() {
    try {
      const response = await api.post(`/students/${student}/checkins`);
      setCheckIns([response.data, ...checkIns]);
    } catch (err) {
      if (err.response.status === 429) {
        Alert.alert(
          'Falha ao realizar check-in',
          'Você atingiu o limite de 5 check-ins em um período de 7 dias!'
        );
      }
    }
  }

  return (
    <Container>
      <Button onPress={handleCheckIn}>Novo Check-in</Button>
      <List
        data={checkIns}
        keyExtractor={item => String(item.id)}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <LoaderInicator />}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        renderItem={({ item }) => <CheckInItem data={item} />}
      />
    </Container>
  );
}

CheckIn.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

CheckIn.navigationOptions = {
  tabBarLabel: 'Check-ins',
  // eslint-disable-next-line
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
  title: 'Selecione o horário',
};

export default withNavigationFocus(CheckIn);
