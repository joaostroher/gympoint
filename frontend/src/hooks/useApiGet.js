import { useState, useEffect } from 'react';

import api from '~/services/api';

export default function useApiGet(url, config = null, processData = null) {
  const [data, setData] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const resp = await api.get(url, config);
        setResponse(resp);
        setData(processData ? processData(resp.data) : resp.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    }
    loadData();
  }, [url, config, processData]); //eslint-disable-line

  return { data, loading, error, response };
}
