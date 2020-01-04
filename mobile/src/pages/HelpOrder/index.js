import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';
import Button from '~/components/Button';
import HelpOrderItem from '~/components/HelpOrder';

import { Container, List, LoaderInicator } from './styles';

function HelpOrder({ isFocused, navigation }) {
  const student = useSelector(state => state.auth.student);

  const [helpOrders, setHelpOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const loadHelpOrders = useCallback(
    async (initialPage = 1, initialCheckIns = []) => {
      const response = await api.get(`/students/${student}/help-orders`, {
        params: { page: initialPage },
      });
      setHelpOrders([...initialCheckIns, ...response.data]);
      setPage(response.data.length > 0 ? initialPage + 1 : 0);
    },
    [student]
  );

  useEffect(() => {
    async function handle() {
      setHelpOrders([]);
      setLoading(true);
      try {
        await loadHelpOrders();
      } finally {
        setLoading(false);
      }
    }
    if (isFocused) handle();
  }, [isFocused, loadHelpOrders]);

  async function handleRefresh() {
    setHelpOrders([]);
    setRefreshing(true);
    try {
      await loadHelpOrders();
    } finally {
      setRefreshing(false);
    }
  }

  async function handleEndReached() {
    if (!loading && page !== 0) {
      setLoading(true);
      try {
        await loadHelpOrders(page, helpOrders);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <Container>
      <Button onPress={() => navigation.navigate('HelpOrderNew')}>
        Novo pedido de auxílio
      </Button>
      <List
        data={helpOrders}
        keyExtractor={item => String(item.id)}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <LoaderInicator />}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <HelpOrderItem
            data={item}
            onPress={() =>
              navigation.navigate('HelpOrderDetail', { data: item })
            }
          />
        )}
      />
    </Container>
  );
}

HelpOrder.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default withNavigationFocus(HelpOrder);
