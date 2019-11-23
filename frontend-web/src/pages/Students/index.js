import React, { useState, useEffect, useMemo } from 'react';
import { MdAdd } from 'react-icons/md';

import history from '~/services/history';
import Toolbar from '~/components/Toolbar';
import Table from '~/components/Table';
import Button from '~/components/Button';
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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function loadStudents() {
      setLoading(true);
      const response = await api.get('students');
      setStudents(response.data);
      setLoading(false);
    }
    loadStudents();
  }, []);

  async function handleDelete(studentId) {
    await api.delete(`/students/${studentId}`);
    setStudents(students.filter(student => student.id !== studentId));
  }

  return (
    <Container>
      <Toolbar title="Alunos">
        <Button type="button" onClick={() => history.push(`/students/new`)}>
          <MdAdd size={24} /> CADASTRAR
        </Button>
      </Toolbar>
      <Table
        columns={columns}
        data={students}
        loading={loading}
        renderActions={student => (
          <>
            <button
              type="button"
              onClick={() => history.push(`/students/${student.id}`)}
            >
              editar
            </button>
            <button type="button" onClick={() => handleDelete(student.id)}>
              apagar
            </button>
          </>
        )}
      />
    </Container>
  );
}
