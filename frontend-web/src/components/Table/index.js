import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import Spinner from '~/components/Spinner';
import { Container } from './styles';

export default function Table({ columns, data, renderActions, loading }) {
  return (
    <Container>
      <table>
        <thead>
          <tr>
            {columns.map(c => (
              <th key={c.field} className={`align-${c.align}`}>
                {c.description}
              </th>
            ))}
            {renderActions && <th> </th>}
          </tr>
        </thead>
        {!loading && (
          <tbody>
            {data.map(d => (
              <tr key={d.id}>
                {columns.map(c => (
                  <td key={d.id + c.field} className={`align-${c.align}`}>
                    {c.render ? c.render(get(d, c.field)) : get(d, c.field)}
                  </td>
                ))}
                {renderActions && (
                  <td className="align-center">{renderActions(d)}</td>
                )}
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {loading && <Spinner />}
    </Container>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      field: PropTypes.string,
      align: PropTypes.oneOf(['left', 'right', 'center']),
      render: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  renderActions: PropTypes.func,
  loading: PropTypes.bool,
};

Table.defaultProps = {
  data: [],
  renderActions: null,
  loading: false,
};
