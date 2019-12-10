import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import { parseISO, addMonths, format, startOfDay } from 'date-fns';

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
  start_date: Yup.date()
    .required()
    .min(startOfDay(new Date())),
});

export default function RegisterEnrollment() {
  const { enrollmentId } = useParams();
  const [enrollment, setEnrollment] = useState(null);
  const [endDate, setEndDate] = useState('');
  const [price, setPrice] = useState(0);
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

  useEffect(() => {
    if (enrollment && plans) {
      const plan = plans.find(p => p.id === enrollment.plan_id);
      if (plan) {
        const newPrice = plan ? plan.duration * plan.price : 0;
        setPrice(newPrice);
        if (enrollment.start_date) {
          const newEndDate = format(
            addMonths(enrollment.start_date, plan.duration),
            'dd/MM/yyyy'
          );
          setEndDate(newEndDate);
        }
      }
    }
  }, [enrollment, plans]);

  function handleChangePlan(event) {
    const planId = Number(event.target.value);
    setEnrollment({ ...enrollment, plan_id: planId });
  }

  function handleChangeStartDate(date) {
    setEnrollment({ ...enrollment, start_date: date });
  }

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
      {enrollment && !loadingStudents && !loadingPlans && (
        <StyledForm
          id="enrollment"
          onSubmit={handleSubmit}
          schema={schema}
          initialData={enrollment}
        >
          <label>
            Aluno
            <Select name="student_id" options={students || []} />
          </label>
          <Grid columns={4}>
            <label>
              Plano
              <Select
                name="plan_id"
                options={plans || []}
                onChange={handleChangePlan}
              />
            </label>
            <label>
              Date de Início
              <DatePicker
                name="start_date"
                minDate={new Date()}
                onChange={handleChangeStartDate}
              />
            </label>
            <label>
              Date de Término
              <input value={endDate} disabled />
            </label>
            <label>
              Valor Final
              <input value={price} disabled />
            </label>
          </Grid>
        </StyledForm>
      )}
    </Container>
  );
}
