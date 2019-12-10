import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';

import Toolbar from '~/components/Toolbar';
import Table, { TableAction } from '~/components/Table';
import Button from '~/components/Button';

import api from '~/services/api';
import history from '~/services/history';
import { useDeleteConfirmation } from '~/hooks';

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

  const handleDelete = useDeleteConfirmation(
    useCallback(
      async planId => {
        await api.delete(`/plans/${planId}`);
        setPlans(plans.filter(plan => plan.id !== planId));
      },
      [plans]
    )
  );

  return (
    <Container>
      <Toolbar title="Planos">
        <Button type="button" onClick={() => history.push('/plans/new')}>
          <MdAdd size={24} /> CADASTRAR
        </Button>
      </Toolbar>
      <Table
        columns={columns}
        data={plans}
        loading={loading}
        renderActions={plan => (
          <>
            <TableAction onClick={() => history.push(`/plans/${plan.id}`)}>
              editar
            </TableAction>
            <TableAction error onClick={() => handleDelete(plan.id)}>
              apagar
            </TableAction>
          </>
        )}
      />
    </Container>
  );
}
