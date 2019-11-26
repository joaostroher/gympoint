import React, { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Toolbar from '~/components/Toolbar';
import Table from '~/components/Table';
import api from '~/services/api';

import { Container } from './styles';

export default function HelpOrders() {
  const HelpOrderSwal = withReactContent(Swal);
  const columns = useMemo(
    () => [{ description: 'Aluno', field: 'student.name', align: 'left' }],
    []
  );
  const [loading, setLoading] = useState(false);
  const [helpOrders, setHelpOrders] = useState([]);
  useEffect(() => {
    async function loadHelpOrders() {
      setLoading(true);
      const response = await api.get('help-orders');
      setHelpOrders(response.data);
      setLoading(false);
    }
    loadHelpOrders();
  }, []);

  function handleDialogRensponse() {
    HelpOrderSwal.fire({
      title: <p>Confirmação?</p>,
      html: 'Resposta',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      reverseButtons: true,
    }).then(() => {});
  }

  return (
    <Container>
      <Toolbar title="Pedidos de Auxílio" />
      <Table
        columns={columns}
        data={helpOrders}
        loading={loading}
        renderActions={helpOrder => (
          <button
            type="button"
            onClick={() => handleDialogRensponse(helpOrder)}
          >
            responder
          </button>
        )}
      />
    </Container>
  );
}
