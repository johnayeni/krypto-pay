import * as React from "react";

export default function useFetch(asyncFetch: Function) {
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await asyncFetch();
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [asyncFetch]);

  return { data, loading, error };
}
