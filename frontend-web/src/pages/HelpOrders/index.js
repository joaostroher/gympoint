import React, { useState, useEffect, useMemo } from 'react';

import Toolbar from '~/components/Toolbar';
import Table from '~/components/Table';
import api from '~/services/api';

import { Container } from './styles';

export default function HelpOrders() {
  const columns = useMemo(
    () => [{ description: 'Aluno', field: 'student.name', align: 'left' }],
    []
  );
  const [loading, setLoading] = useState(false);
  const [helpOrders, setHelpOrders] = useState([]);
  useEffect(() => {
    async function loadHelpOrders() {
      setLoading(true);
      const response = await api.get('help-orders');
      setHelpOrders(response.data);
      setLoading(false);
    }
    loadHelpOrders();
  }, []);
  return (
    <Container>
      <Toolbar title="Pedidos de Auxílio" />
      <Table
        columns={columns}
        data={helpOrders}
        loading={loading}
        renderActions={() => <button type="button">responder</button>}
      />
    </Container>
  );
}
