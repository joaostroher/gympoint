import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import {
  MdNavigateBefore,
  MdNavigateNext,
  MdFirstPage,
  MdLastPage,
} from 'react-icons/md';

import Spinner from '~/components/Spinner';
import {
  Container,
  TableContainer,
  TableAction,
  Pagination,
  PaginationButton,
  NoData,
} from './styles';

export { TableAction };
export default function Table({
  columns,
  data,
  renderActions,
  loading,
  pages,
  page,
  onPageChange,
}) {
  const renderPages = useMemo(() => {
    function getMinMaxPages() {
      const size = 2;
      if (page <= size) {
        return { min: 1, max: Math.min(pages, 2 * size + 1) };
      }
      if (pages - page <= size) {
        return { min: Math.max(pages - 2 * size, 1), max: pages };
      }
      return {
        min: Math.max(page - size, 1),
        max: Math.min(page + size, pages),
      };
    }
    if (pages) {
      const mixMax = getMinMaxPages();
      return Array.from(
        { length: mixMax.max - mixMax.min + 1 },
        (v, k) => k + mixMax.min
      );
    }
    return null;
  }, [page, pages]);

  function handlePageChange(p) {
    if (onPageChange) onPageChange(p);
  }

  return (
    <Container>
      <TableContainer>
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
          {data && data.length === 0 && (
            <tfoot>
              <tr>
                <NoData colSpan={columns.length}>Sem Resultados</NoData>
              </tr>
            </tfoot>
          )}
        </table>
        {loading && <Spinner />}
      </TableContainer>
      {renderPages && (
        <Pagination>
          <PaginationButton
            first
            disabled={page === 1}
            onClick={() => handlePageChange(1)}
          >
            <MdFirstPage size={24} />
          </PaginationButton>
          <PaginationButton
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            <MdNavigateBefore size={24} />
          </PaginationButton>
          {renderPages.map(p => (
            <PaginationButton
              key={p}
              active={p === page}
              disabled={p === page}
              onClick={() => handlePageChange(p)}
            >
              {p}
            </PaginationButton>
          ))}
          <PaginationButton
            disabled={page === pages}
            onClick={() => handlePageChange(page + 1)}
          >
            <MdNavigateNext size={24} />
          </PaginationButton>
          <PaginationButton
            last
            disabled={page === pages}
            onClick={() => handlePageChange(pages)}
          >
            <MdLastPage size={24} />
          </PaginationButton>
        </Pagination>
      )}
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
  pages: PropTypes.number,
  page: PropTypes.number,
  onPageChange: PropTypes.func,
};

Table.defaultProps = {
  data: [],
  renderActions: null,
  loading: false,
  pages: null,
  page: 1,
  onPageChange: null,
};
