import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-simple.png';
import { Container } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  return (
    <Container>
      <nav>
        <Link to="/">
          <img src={logo} alt="GymPoint" />
          <h1>GYMPOINT</h1>
        </Link>
        <NavLink to="/students">Alunos</NavLink>
        <NavLink to="/plans">Planos</NavLink>
        <NavLink to="/enrollments">Matrículas</NavLink>
        <NavLink to="/help-orders">Pedidos de Auxilio</NavLink>
      </nav>
      <aside>
        <strong>João Miguel Ströher</strong>
        <button type="button" onClick={() => dispatch(signOut())}>
          sair do sistema
        </button>
      </aside>
    </Container>
  );
}
