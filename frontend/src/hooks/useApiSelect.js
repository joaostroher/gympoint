import { useCallback } from 'react';

import useApiGet from './useApiGet';

export default function useApiSelect(url, title) {
  const processData = useCallback(
    data => {
      return data.map(d => ({
        ...d,
        title: d[title],
      }));
    },
    [title]
  );
  const { data, loading, error, response } = useApiGet(url, null, processData);

  return { data, loading, error, response };
}
