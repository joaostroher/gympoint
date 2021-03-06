import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { parseISO, format } from 'date-fns';
import br from 'date-fns/locale/pt-BR';

import Toolbar from '~/components/Toolbar';
import Table, { TableAction } from '~/components/Table';
import Button from '~/components/Button';

import history from '~/services/history';
import api from '~/services/api';
import { useDeleteConfirmation } from '~/hooks';

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
  const [enrollments, setEnrollments] = useState([]);
  const [pages, setPages] = useState(1);
  const [selectedPage, setSelectedPage] = useState(1);

  const loadEnrollments = useCallback(async page => {
    setLoading(true);
    try {
      const response = await api.get('enrollments', { params: { page } });
      setEnrollments(response.data.data);
      setPages(response.data.pages);
      setSelectedPage(page);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEnrollments(1);
  }, [loadEnrollments]);

  const handleDelete = useDeleteConfirmation(
    useCallback(
      async enrollmentId => {
        await api.delete(`/enrollments/${enrollmentId}`);
        setEnrollments(
          enrollments.filter(enrollment => enrollment.id !== enrollmentId)
        );
      },
      [enrollments]
    )
  );

  return (
    <Container>
      <Toolbar title="Matrículas">
        <Button type="button" onClick={() => history.push('/enrollments/new')}>
          <MdAdd size={24} /> CADASTRAR
        </Button>
      </Toolbar>
      <Table
        columns={columns}
        data={enrollments}
        loading={loading}
        pages={pages}
        page={selectedPage}
        onPageChange={page => loadEnrollments(page)}
        renderActions={enrollment => (
          <>
            <TableAction
              onClick={() => history.push(`/enrollments/${enrollment.id}`)}
            >
              editar
            </TableAction>
            <TableAction error onClick={() => handleDelete(enrollment.id)}>
              apagar
            </TableAction>
          </>
        )}
      />
    </Container>
  );
}
