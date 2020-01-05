import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';
import { Button, Toolbar, StyledForm, Grid } from '~/components';
import { Container } from './styles';

const schema = Yup.object().shape({
  title: Yup.string()
    .required()
    .label('Título'),
  duration: Yup.number()
    .integer()
    .positive()
    .required()
    .label('Duração'),
  price: Yup.number()
    .positive()
    .required()
    .label('Preço'),
});

export default function RegisterPlan() {
  const { planId } = useParams();
  const [plan, setPlan] = useState(null);
  const [total, setTotal] = useState(0);

  const calculatePlanTotal = useCallback(p => {
    try {
      const planTotal = Number(p.duration * p.price);
      return Number.isNaN(planTotal) ? 0 : planTotal;
    } catch {
      return 0;
    }
  }, []);

  const handleRecalcTotal = useCallback(
    e => {
      const newPlan = { ...plan, [e.target.name]: e.target.value };
      setPlan(newPlan);
      setTotal(calculatePlanTotal(newPlan));
    },
    [calculatePlanTotal, plan]
  );

  useEffect(() => {
    async function loadPlan() {
      if (planId === 'new') {
        setPlan({});
      } else {
        const response = await api.get(`/plans/${planId}`);
        const responsePlan = response.data;
        setPlan(responsePlan);
        setTotal(calculatePlanTotal(responsePlan));
      }
    }
    loadPlan();
  }, [calculatePlanTotal, planId]);

  async function handleSubmit(data) {
    if (planId === 'new') await api.post('/plans', data);
    else await api.put(`/plans/${planId}`, data);
    history.goBack();
  }

  return (
    <Container>
      <Toolbar title="Cadstro de Plano">
        <Button
          type="button"
          color="secondary"
          onClick={() => history.goBack()}
        >
          <MdChevronLeft size={24} /> VOLTAR
        </Button>
        <Button type="submit" form="plan">
          <MdCheck size={24} /> SALVAR
        </Button>
      </Toolbar>
      {plan && (
        <StyledForm
          id="plan"
          schema={schema}
          onSubmit={handleSubmit}
          initialData={plan}
        >
          <label>
            Título do Plano
            <Input id="title" name="title" />
          </label>
          <Grid columns={3}>
            <label>
              Duração (meses)
              <Input name="duration" onChange={handleRecalcTotal} />
            </label>
            <label>
              Mensalidade
              <Input name="price" onChange={handleRecalcTotal} />
            </label>
            <label>
              Preço Total
              <input disabled value={total.toFixed(2)} />
            </label>
          </Grid>
        </StyledForm>
      )}
    </Container>
  );
}
