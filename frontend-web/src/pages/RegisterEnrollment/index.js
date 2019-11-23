import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import { parseISO } from 'date-fns';

import { useApiSelect } from '~/hooks';
import api from '~/services/api';
import history from '~/services/history';
import { Button, Toolbar, StyledForm, Grid, DatePicker } from '~/components';
import { Container } from './styles';

const schema = Yup.object().shape({
  student_id: Yup.number()
    .integer()
    .required(),
  plan_id: Yup.number()
    .integer()
    .required(),
  start_date: Yup.date(),
  end_date: Yup.date(),
});

export default function RegisterEnrollment() {
  const { enrollmentId } = useParams();
  const [enrollment, setEnrollment] = useState(null);
  const { data: students, loading: loadingStudents } = useApiSelect(
    'students',
    'name'
  );
  const { data: plans, loading: loadingPlans } = useApiSelect('plans', 'title');
  useEffect(() => {
    async function loadEnrollment() {
      if (enrollmentId === 'new') {
        setEnrollment({});
      } else {
        const response = await api.get(`/enrollments/${enrollmentId}`);
        const { data } = response;
        setEnrollment({
          ...data,
          start_date: parseISO(data.start_date),
          end_date: parseISO(data.end_date),
        });
      }
    }
    loadEnrollment();
  }, [enrollmentId]);

  async function handleSubmit(data) {
    if (enrollmentId === 'new') await api.post('/enrollments', data);
    else await api.put(`/enrollments/${enrollmentId}`, data);
    history.goBack();
  }

  return (
    <Container>
      <Toolbar title="Cadstro de Matrículas">
        <Button
          type="button"
          color="secondary"
          onClick={() => history.goBack()}
        >
          <MdChevronLeft size={24} /> VOLTAR
        </Button>
        <Button type="submit" form="enrollment">
          <MdCheck size={24} /> SALVAR
        </Button>
      </Toolbar>
      {enrollment && (
        <StyledForm
          id="enrollment"
          onSubmit={handleSubmit}
          schema={schema}
          initialData={enrollment}
        >
          <label>
            Aluno
            <Select
              name="student_id"
              options={loadingStudents ? [] : students}
            />
          </label>
          <Grid columns={4}>
            <label>
              Plano
              <Select name="plan_id" options={loadingPlans ? [] : plans} />
            </label>
            <label>
              Date de Início
              <DatePicker name="start_date" />
            </label>
            <label>
              Date de Término
              <DatePicker name="end_date" disabled />
            </label>
            <label>
              Valor Final
              <Input name="price" disabled />
            </label>
          </Grid>
        </StyledForm>
      )}
    </Container>
  );
}
