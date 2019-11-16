import React from 'react';
import { Link } from 'react-router-dom';

// import { Container } from './styles';
import logo from '~/assets/logo.png';

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="GymPoint" />
      <form>
        <label htmlFor="name">
          Seu Nome
          <input type="text" name="name" id="name" />
        </label>

        <label htmlFor="email">
          Seu E-mail
          <input type="email" name="email" id="email" />
        </label>

        <label htmlFor="password">
          Sua Senha
          <input type="password" name="password" id="password" />
        </label>

        <button type="submit">Entrar no Sistema</button>
        <Link to="/login">Já tenho uma Conta</Link>
      </form>
    </>
  );
}
