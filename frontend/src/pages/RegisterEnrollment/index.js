import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import * as Yup from 'yup';
import { parseISO, addMonths, format, startOfDay } from 'date-fns';

import { useApiSelect } from '~/hooks';
import api from '~/services/api';
import history from '~/services/history';
import {
  Button,
  Toolbar,
  StyledForm,
  Grid,
  DatePicker,
  Select,
} from '~/components';
import { Container } from './styles';

export default function RegisterEnrollment() {
  const { enrollmentId } = useParams();
  const [enrollment, setEnrollment] = useState(null);
  const [defaultStudents, setDefaultStudents] = useState(null);
  const [endDate, setEndDate] = useState('');
  const [updateStartDate, setUpdateStartDate] = useState(false);
  const [price, setPrice] = useState(0);

  const schema = useMemo(
    () =>
      Yup.object().shape({
        student_id: Yup.number()
          .integer()
          .required()
          .label('Estudante'),
        plan_id: Yup.number()
          .integer()
          .required()
          .label('Plano'),
        start_date: updateStartDate
          ? Yup.date()
              .required()
              .min(startOfDay(new Date()))
              .label('Data de Início')
          : Yup.date().label('Data de Início'),
      }),
    [updateStartDate]
  );

  const { data: plans, loading: loadingPlans } = useApiSelect('plans', 'title');

  useEffect(() => {
    async function loadEnrollment() {
      if (enrollmentId === 'new') {
        setEnrollment({});
        setDefaultStudents([]);
        setUpdateStartDate(true);
      } else {
        const response = await api.get(`/enrollments/${enrollmentId}`);
        const { data } = response;

        const responseStudent = await api.get(`/students/${data.student_id}`);
        const { data: studentData } = responseStudent;

        setDefaultStudents([{ ...studentData, title: studentData.name }]);
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

  function handleChangeStudent(student) {
    setDefaultStudents([student]);
  }

  function handleChangePlan(plan) {
    setEnrollment({ ...enrollment, plan_id: plan.id });
  }

  function handleChangeStartDate(date) {
    setUpdateStartDate(true);
    setEnrollment({ ...enrollment, start_date: date });
  }

  async function handleSubmit(data) {
    const { student_id, plan_id, start_date } = data;
    const optionalStartDate = updateStartDate ? { start_date } : {};
    const submitData = { student_id, plan_id, ...optionalStartDate };
    if (enrollmentId === 'new') await api.post('/enrollments', submitData);
    else await api.put(`/enrollments/${enrollmentId}`, submitData);
    history.goBack();
  }

  async function loadStudents(q) {
    const response = await api.get('students', { params: { q } });
    return response.data.map(student => ({
      ...student,
      title: student.name,
    }));
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
      {enrollment && defaultStudents && !loadingPlans && (
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
              onChange={handleChangeStudent}
              defaultOptions={defaultStudents}
              loadOptions={loadStudents}
              cacheOptions
              autoFocus
            />
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
