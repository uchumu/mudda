interface AccordionContextProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

interface AccordionProps {
  children: React.ReactNode;
  defaultSection?: string;
}

interface AccordionSectionProps {
  id: string;
  label: string;
  children: React.ReactNode;
  formatValue: string;
}

export type { AccordionContextProps, AccordionProps, AccordionSectionProps };
