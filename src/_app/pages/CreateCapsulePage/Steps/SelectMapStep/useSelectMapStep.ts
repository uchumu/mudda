import { useState } from "react";

const useSelectMapStep = () => {
  const [coordinates, setCoordinates] = useState<number[]>([0, 0]);

  return { coordinates, setCoordinates };
};

export default useSelectMapStep;
