import React, { useState, useEffect, useMemo } from 'react';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { parseISO, format } from 'date-fns';
import br from 'date-fns/locale/pt-BR';

import Toolbar from '~/components/Toolbar';
import Table from '~/components/Table';
import Button from '~/components/Button';
import history from '~/services/history';
import api from '~/services/api';

import { Container } from './styles';

export default function Enrollments() {
  const columns = useMemo(
    () => [
      { description: 'Aluno', field: 'student.name', align: 'left' },
      {
        description: 'Plano',
        field: 'plan.title',
        align: 'center',
      },
      {
        description: 'Início',
        field: 'start_date',
        align: 'center',
        render: data =>
          format(parseISO(data), "dd 'de' MMMM 'de' yyyy", { locale: br }),
      },
      {
        description: 'Término',
        field: 'end_date',
        align: 'center',
        render: data =>
          format(parseISO(data), "dd 'de' MMMM 'de' yyyy", { locale: br }),
      },
      {
        description: 'Ativa',
        field: 'active',
        align: 'center',
        render: data =>
          data ? <MdCheckCircle size={24} color="#42cb59" /> : null,
      },
    ],
    []
  );
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    async function loadPlans() {
      setLoading(true);
      const response = await api.get('enrollments');
      setPlans(response.data);
      setLoading(false);
    }
    loadPlans();
  }, []);
  return (
    <Container>
      <Toolbar title="Matrículas">
        <Button type="button" onClick={() => history.push('/enrollments/new')}>
          <MdAdd size={24} /> CADASTRAR
        </Button>
      </Toolbar>
      <Table
        columns={columns}
        data={plans}
        loading={loading}
        renderActions={enrollment => (
          <>
            <button
              type="button"
              onClick={() => history.push(`/enrollments/${enrollment.id}`)}
            >
              editar
            </button>
            <button type="button">apagar</button>
          </>
        )}
      />
    </Container>
  );
}
