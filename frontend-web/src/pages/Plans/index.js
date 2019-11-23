import React, { useState, useEffect, useMemo } from 'react';
import { MdAdd } from 'react-icons/md';

import Toolbar from '~/components/Toolbar';
import Table from '~/components/Table';
import Button from '~/components/Button';
import api from '~/services/api';
import history from '~/services/history';

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
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    async function loadPlans() {
      setLoading(true);
      const response = await api.get('plans');
      setPlans(response.data);
      setLoading(false);
    }
    loadPlans();
  }, []);

  async function handleDelete(planId) {
    await api.delete(`/plans/${planId}`);
    setPlans(plans.filter(plan => plan.id !== planId));
  }
  return (
    <Container>
      <Toolbar title="Planos">
        <Button type="button">
          <MdAdd size={24} /> CADASTRAR
        </Button>
      </Toolbar>
      <Table
        columns={columns}
        data={plans}
        loading={loading}
        renderActions={plan => (
          <>
            <button
              type="button"
              onClick={() => history.push(`/plans/${plan.id}`)}
            >
              editar
            </button>
            <button type="button" onClick={() => handleDelete(plan.id)}>
              apagar
            </button>
          </>
        )}
      />
    </Container>
  );
}
