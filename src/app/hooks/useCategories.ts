import * as React from "react";
import { getCategories } from "app/api";

export default function useCategories() {
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
