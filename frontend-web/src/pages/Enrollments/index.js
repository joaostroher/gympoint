import React, { useState, useEffect, useMemo } from 'react';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { parseISO, format } from 'date-fns';
import br from 'date-fns/locale/pt-BR';

import Toolbar from '~/components/Toolbar';
import Table from '~/components/Table';
import api from '~/services/api';

import { Container } from './styles';

export default function Enrollments() {
  const [plans, setPlans] = useState([]);
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
  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('enrollments');
      setPlans(response.data);
    }
    loadPlans();
  }, []);
  return (
    <Container>
      <Toolbar title="Matrículas">
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
