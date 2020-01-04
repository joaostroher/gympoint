import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required()
    .label('Email'),
  password: Yup.string()
    .required()
    .label('Senha'),
});

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GymPoint" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input type="email" name="email" label="Seu E-mail" />
        <Input type="password" name="password" label="Sua Senha" />
        <button type="submit">Entrar no Sistema</button>
        <Link to="/register">Ainda não tenho uma conta</Link>
      </Form>
    </>
  );
}
