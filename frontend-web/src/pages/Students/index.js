import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';

import api from '~/services/api';
import { Container, Content } from './styles';

import Toolbar from '~/components/Toolbar';

export default function Students() {
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
      <Toolbar title="Gerenciando Alunos">
        <button type="button">
          <MdAdd size={24} /> CADASTRAR
        </button>
      </Toolbar>
      <Content>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Idade</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>
                  <button type="button">editar</button>
                  <button type="button">apagar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Content>
    </Container>
  );
}
