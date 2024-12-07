import { useState } from "react";

import AccordionChevron from "./AccordionChevron";

import { AccordionProps, AccordionSectionProps } from "./types";

import { AccordionContext, useAccordion } from "./useAcordionContext";

/**
 * @name Accordion
 * @description
 * 아코디언 컴포넌트
 *
 * @subComponent
 * - Section: 아코디언의 개별 섹션을 렌더링하는 컴포넌트
 *
 * @example
 * ```tsx
 * <Accordion defaultSection="date">
 *   <Accordion.Section
 *     id="date"
 *     label="날짜 선택"
 *     formatValue="2024-01-01"
 *   >
 *     <DatePicker />
 *   </Accordion.Section>
 * </Accordion>
 * ```
 */

const Accordion = ({ children, defaultSection = "" }: AccordionProps) => {
  const [activeSection, setActiveSection] = useState(defaultSection);
  const value = {
    activeSection,
    setActiveSection,
  };

  return (
    <AccordionContext.Provider value={value}>
      <div className="w-full px-[22px]">{children}</div>
    </AccordionContext.Provider>
  );
};

const Section = ({
  id,
  label,
  children,
  formatValue,
}: AccordionSectionProps) => {
  const { activeSection, setActiveSection } = useAccordion();
  const isActive = activeSection === id;

  return (
    <div className="flex flex-col gap-[10px] mb-[26px]">
      <p className="font-pretendard text-[14px] font-normal leading-[16.8px] text-left underline-offset-[from-font] decoration-skip-ink-none">
        {label}
      </p>
      <div>
        <button
          className="w-full py-[20px] px-[24px] rounded-[15px] h-[60px] flex items-center justify-between bg-[#F8F8F8]"
          onClick={() => setActiveSection(isActive ? " " : id)}
        >
          <span className="font-[400] text-[16px] leading-[19.2px]">
            {formatValue}
          </span>
          <AccordionChevron isActive={isActive} />
        </button>
        {isActive && (
          <div
            className="w-full rounded-[15px] bg-white bg-opacity-100 border-[4px] border-transparent hover:border-[#5194F9]"
            autoFocus
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

Accordion.Section = Section;

export default Accordion;
