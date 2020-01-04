import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { parseISO, formatRelative } from 'date-fns';
import locale from 'date-fns/locale/pt-BR';

import {
  Container,
  Detail,
  HeaderQuestion,
  Title,
  DateTime,
  Question,
  HeaderAnswer,
  Answer,
} from './styles';

export default function HelpOrderDetail({ navigation }) {
  const data = navigation.getParam('data');
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
      <Detail>
        <HeaderQuestion>
          <Title>PERGUNTA</Title>
          <DateTime>{dateTimeParsed}</DateTime>
        </HeaderQuestion>
        <Question>{data.question}</Question>
        {data.answer_at && (
          <>
            <HeaderAnswer>
              <Title>RESPOSTA</Title>
            </HeaderAnswer>
            <Answer>{data.answer}</Answer>
          </>
        )}
      </Detail>
    </Container>
  );
}

HelpOrderDetail.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
