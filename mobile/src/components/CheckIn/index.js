import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { parseISO, formatRelative } from 'date-fns';
import locale from 'date-fns/locale/pt-BR';

import { Container, Title, DateTime } from './styles';

export default function CheckIn({ data }) {
  const dateTimeParsed = useMemo(
    () =>
      formatRelative(parseISO(data.created_at), new Date(), {
        locale,
      })
        .split('')
        .map((item, index) => (index === 0 ? item.toUpperCase() : item))
        .join(''),
    [data.created_at]
  );

  return (
    <Container>
      <Title>Check-in #{data.id}</Title>
      <DateTime>{dateTimeParsed}</DateTime>
    </Container>
  );
}

CheckIn.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    created_at: PropTypes.string,
  }).isRequired,
};
