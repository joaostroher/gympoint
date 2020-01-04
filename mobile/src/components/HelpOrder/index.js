import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, formatRelative } from 'date-fns';
import locale from 'date-fns/locale/pt-BR';

import {
  Container,
  Wrapper,
  Info,
  Status,
  StatusText,
  DateTime,
  Question,
} from './styles';

export default function HelpOrder({ data, onPress }) {
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
    <Container onPress={onPress}>
      <Wrapper>
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
      </Wrapper>
    </Container>
  );
}

HelpOrder.propTypes = {
  data: PropTypes.shape({
    question: PropTypes.string,
    answer_at: PropTypes.string,
    created_at: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func,
};

HelpOrder.defaultProps = {
  onPress: null,
};
