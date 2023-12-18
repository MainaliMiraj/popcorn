import { useEffect, useState } from "react";

export function useLocalStorageState(initialState,key) {
  const [value, setValue] = useState(() => {
    const stortedValue = localStorage.getItem(key);
    return stortedValue?JSON.parse(stortedValue):initialState
  });

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(value));
  }, [value,key]);

  return [value,setValue]
}
