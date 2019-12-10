import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import HelpOrder from '~/components/HelpOrder';
import Toolbar from '~/components/Toolbar';
import Table, { TableAction } from '~/components/Table';
import api from '~/services/api';
import theme from '~/styles/theme';

import { Container } from './styles';

export default function HelpOrders() {
  const HelpOrderSwal = withReactContent(Swal);
  const columns = useMemo(
    () => [{ description: 'Aluno', field: 'student.name', align: 'left' }],
    []
  );
  const [loading, setLoading] = useState(false);
  const [helpOrders, setHelpOrders] = useState([]);

  const loadHelpOrders = useCallback(async () => {
    setLoading(true);
    const response = await api.get('help-orders');
    setHelpOrders(response.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadHelpOrders();
  }, [loadHelpOrders]);

  function handleDialogRensponse(helpOrder) {
    let answer = '';

    function handleChangeAnswer(event) {
      answer = event.target.value;
    }

    HelpOrderSwal.fire({
      html: (
        <HelpOrder
          question={helpOrder.question}
          onChange={handleChangeAnswer}
        />
      ),
      confirmButtonText: 'Responder Aluno',
      confirmButtonColor: theme.primary,
      preConfirm: () => {
        return answer.trim() !== '';
      },
      showLoaderOnConfirm: true,
    }).then(async ({ value }) => {
      if (value) {
        await api.put(`/help-orders/${helpOrder.id}`, { answer });
        await loadHelpOrders();
      }
    });
  }

  return (
    <Container>
      <Toolbar title="Pedidos de Auxílio" />
      <Table
        columns={columns}
        data={helpOrders}
        loading={loading}
        renderActions={helpOrder => (
          <TableAction
            type="button"
            onClick={() => handleDialogRensponse(helpOrder)}
          >
            responder
          </TableAction>
        )}
      />
    </Container>
  );
}
