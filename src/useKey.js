import { useEffect } from "react";


export function useKey(Key,action){
    useEffect(() => {
      const callBack = (e) => {
        if (e.code.toLowerCase() === Key.toLowerCase()) action();
      };
      document.addEventListener("keydown", callBack);
      return () => document.removeEventListener("keydown", callBack);
    }, [Key,action])
}