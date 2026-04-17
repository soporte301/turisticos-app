import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(error);
      return initialValue;
    }
  });

  // Fetch actual data from backend
  useEffect(() => {
    if (key === 'adminAuth') return; // Do not sync authentication state globally!

    fetch(`/api/db/${key}`)
      .then(res => res.json())
      .then(json => {
        if (json.data !== null) {
          setStoredValue(json.data);
          window.localStorage.setItem(key, JSON.stringify(json.data));
        }
      })
      .catch(err => {
        console.warn("Backend not reachable or offline, using local storage fallback", err);
      });
  }, [key]);

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));

      if (key !== 'adminAuth') {
        fetch(`/api/db/${key}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: valueToStore })
        }).catch(err => console.warn("Failed to sync with backend", err));
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return [storedValue, setValue];
}
