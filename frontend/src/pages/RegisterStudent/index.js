import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';
import { Button, Toolbar, StyledForm, Grid } from '~/components';
import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string()
    .required()
    .label('Nome'),
  email: Yup.string()
    .email()
    .required()
    .label('Email'),
  age: Yup.number()
    .integer()
    .positive()
    .required()
    .label('Idade'),
  weight: Yup.number()
    .required()
    .label('Peso'),
  height: Yup.number()
    .required()
    .label('Altura'),
});

export default function RegisterStudent() {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  useEffect(() => {
    async function loadStudent() {
      if (studentId === 'new') {
        setStudent({});
      } else {
        const response = await api.get(`/students/${studentId}`);
        setStudent(response.data);
      }
    }
    loadStudent();
  }, [studentId]);

  async function handleSubmit(data) {
    if (studentId === 'new') await api.post('/students', data);
    else await api.put(`/students/${studentId}`, data);
    history.goBack();
  }

  return (
    <Container>
      <Toolbar title="Cadstro de Aluno">
        <Button
          type="button"
          color="secondary"
          onClick={() => history.goBack()}
        >
          <MdChevronLeft size={24} /> VOLTAR
        </Button>
        <Button type="submit" form="student">
          <MdCheck size={24} /> SALVAR
        </Button>
      </Toolbar>
      {student && (
        <StyledForm
          id="student"
          onSubmit={handleSubmit}
          schema={schema}
          initialData={student}
        >
          <label>
            Nome Completo
            <Input id="name" name="name" autofocus="true" />
          </label>
          <label>
            Endereço de Email
            <Input name="email" />
          </label>
          <Grid columns={3}>
            <label>
              Idade
              <Input name="age" />
            </label>
            <label>
              Peso (Kg)
              <Input name="weight" />
            </label>
            <label>
              Altura
              <Input name="height" />
            </label>
          </Grid>
        </StyledForm>
      )}
    </Container>
  );
}
