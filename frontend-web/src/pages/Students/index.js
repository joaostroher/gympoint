import React, { useState, useEffect, useMemo } from 'react';
import { MdAdd } from 'react-icons/md';

import Toolbar from '~/components/Toolbar';
import Table from '~/components/Table';
import api from '~/services/api';

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
  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');
      setStudents(response.data);
    }
    loadStudents();
  }, []);
  return (
    <Container>
      <Toolbar title="Alunos">
        <button type="button">
          <MdAdd size={24} /> CADASTRAR
        </button>
      </Toolbar>
      <Table
        columns={columns}
        data={students}
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
