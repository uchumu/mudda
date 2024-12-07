import { createContext, useContext } from "react";

import { AccordionContextProps } from "@/components/Accordion/BaseAccordion/types";

const AccordionContext = createContext<AccordionContextProps | null>(null);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("Must be use within Accordion");
  return context;
};

export { useAccordion, AccordionContext };
