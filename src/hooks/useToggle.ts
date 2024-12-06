import { useState } from "react";

const useToggle = (initialValue: boolean) => {
  const [state, setState] = useState<boolean>(initialValue);

  const toggleState = () => setState((prev) => !prev);

  return [state, toggleState];
};

export default useToggle;
