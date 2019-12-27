import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, formatRelative } from 'date-fns';
import locale from 'date-fns/locale/pt-BR';

import {
  Container,
  Info,
  Status,
  StatusText,
  DateTime,
  Question,
} from './styles';

export default function HelpOrder({ data }) {
  const answered = useMemo(() => Boolean(data.answer_at), [data.answer_at]);
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
      <Info>
        <Status>
          <Icon
            name="check-circle"
            size={16}
            color={answered ? '#42CB59' : '#999'}
          />
          <StatusText answered={answered}>
            {answered ? 'Respondido' : 'Sem resposta'}
          </StatusText>
        </Status>
        <DateTime>{dateTimeParsed}</DateTime>
      </Info>
      <Question>{data.question}</Question>
    </Container>
  );
}

HelpOrder.propTypes = {
  data: PropTypes.shape({
    question: PropTypes.string,
    answer_at: PropTypes.string,
    created_at: PropTypes.string,
  }).isRequired,
};
