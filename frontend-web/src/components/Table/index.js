import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { Container } from './styles';

export default function Table({ columns, data, renderActions }) {
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
      </table>
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
};

Table.defaultProps = {
  data: [],
  renderActions: null,
};
