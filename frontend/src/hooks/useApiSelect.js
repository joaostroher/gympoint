import { useCallback, useMemo } from 'react';

import useApiGet from './useApiGet';

export default function useApiSelect(url, title, params = null) {
  const processData = useCallback(
    data => {
      return data.map(d => ({
        ...d,
        title: d[title],
      }));
    },
    [title]
  );

  const config = useMemo(() => ({ params }), [params]);

  const { data, loading, error, response } = useApiGet(
    url,
    config,
    processData
  );

  return { data, loading, error, response };
}
