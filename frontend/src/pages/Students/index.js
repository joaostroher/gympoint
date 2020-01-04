import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';

import Toolbar from '~/components/Toolbar';
import Table, { TableAction } from '~/components/Table';
import Button from '~/components/Button';
import SearchInput from '~/components/SearchInput';

import history from '~/services/history';
import api from '~/services/api';
import { useDeleteConfirmation, useDebounce } from '~/hooks';

import { Container } from './styles';

export default function Students() {
  const columns = useMemo(
    () => [
      { description: 'Nome', field: 'name', align: 'left' },
      { description: 'Email', field: 'email', align: 'left' },
      { description: 'Idade', field: 'age', align: 'center' },
    ],
    []
  );
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(null);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    async function loadStudents(q) {
      setLoading(true);
      const response = await api.get('students', { params: { q } });
      setStudents(response.data);
      setLoading(false);
    }
    loadStudents(debouncedQuery);
  }, [debouncedQuery]);

  const handleDelete = useDeleteConfirmation(
    useCallback(
      async studentId => {
        await api.delete(`/students/${studentId}`);
        setStudents(students.filter(student => student.id !== studentId));
      },
      [students]
    )
  );

  const handleChangeSearch = event => {
    setQuery(event.target.value);
  };

  return (
    <Container>
      <Toolbar title="Alunos">
        <Button type="button" onClick={() => history.push(`/students/new`)}>
          <MdAdd size={24} /> CADASTRAR
        </Button>
        <SearchInput placeholder="Buscar Aluno" onChange={handleChangeSearch} />
      </Toolbar>
      <Table
        columns={columns}
        data={students}
        loading={loading}
        renderActions={student => (
          <>
            <TableAction
              onClick={() => history.push(`/students/${student.id}`)}
            >
              editar
            </TableAction>
            <TableAction error onClick={() => handleDelete(student.id)}>
              apagar
            </TableAction>
          </>
        )}
      />
    </Container>
  );
}
