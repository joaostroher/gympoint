import React from 'react';

// import { Container } from './styles';
import logo from '~/assets/logo.png';

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="GymPoint" />
      <form>
        <label htmlFor="email">Seu Email</label>
        <input type="email" name="email" id="email" />

        <label htmlFor="password">Sua Senha</label>
        <input type="password" name="password" id="password" />
      </form>
    </>
  );
}
