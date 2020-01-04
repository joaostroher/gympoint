import React, { useCallback } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import theme from '~/styles/theme';

export default function useDeleteConfirmation(onConfirm) {
  const DeleteSwal = withReactContent(Swal);

  const handle = useCallback(
    data => {
      DeleteSwal.fire({
        title: <p>Confirmação?</p>,
        text: 'Deseja realmente apagar o registro?',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        confirmButtonColor: theme.primary,
        cancelButtonText: 'Não',
        cancelButtonColor: theme.secondary,
        reverseButtons: true,
      }).then(async result => {
        if (result.value) {
          if (onConfirm) onConfirm(data);
        }
      });
    },
    [DeleteSwal, onConfirm]
  );

  return handle;
}
