import React, { useState, useEffect, useMemo } from 'react';
import { MdAdd } from 'react-icons/md';

import Toolbar from '~/components/Toolbar';
import Table from '~/components/Table';
import api from '~/services/api';

import { Container } from './styles';

export default function Plans() {
  const columns = useMemo(
    () => [
      { description: 'Título', field: 'title', align: 'left' },
      {
        description: 'Duração',
        field: 'duration',
        align: 'center',
        render: data => `${data} meses`,
      },
      {
        description: 'Mensalidade',
        field: 'price',
        align: 'center',
        render: data => data.toFixed(2),
      },
    ],
    []
  );
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');
      setPlans(response.data);
    }
    loadPlans();
  }, []);
  return (
    <Container>
      <Toolbar title="Planos">
        <button type="button">
          <MdAdd size={24} /> CADASTRAR
        </button>
      </Toolbar>
      <Table
        columns={columns}
        data={plans}
        renderActions={() => (
          <>
            <button type="button">editar</button>
            <button type="button">apagar</button>
          </>
        )}
      />
    </Container>
  );
}
