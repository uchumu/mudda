import { useState } from "react";

import AccordionChevron from "./AccordionChevron";

import { AccordionProps, AccordionSectionProps } from "./types";

import { AccordionContext, useAccordion } from "./useAcordionContext";
import clsx from "clsx";

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
      <div className="w-full">{children}</div>
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
  
  const sharedRounded = "rounded-[16px]";
  const sharedBg = "bg-[#F8F8F8]";

  return (
    <div className="flex flex-col gap-[10px] mb-[26px]">
      <p className="font-pretendard text-[14px] font-normal leading-[16.8px] text-left underline-offset-[from-font] decoration-skip-ink-none">
        {label}
      </p>
      {/* 아코디언 트리거 관련 */}
      <div className={clsx(isActive && [sharedBg, sharedRounded])}>
        <button
          className={clsx(
            "w-full py-[20px] px-[24px] h-[60px]",
            "flex items-center justify-between",
            !isActive && [sharedBg, sharedRounded]
          )}
          onClick={() => setActiveSection(isActive ? " " : id)}
        >
          <span className="font-[400] text-[16px] leading-[19.2px]">
            {formatValue}
          </span>
          <AccordionChevron isActive={isActive} />
        </button>
        {/* 아코디언 내부 콘텐츠 관련 */}
        <div
          className={clsx(
            "transition-[max-height] duration-300 ease-out overflow-visible",
            isActive ? "max-h-96" : "max-h-0"
          )}
        >
          <div className={clsx(
            "bg-white shadow-[0_4px_10px_rgba(0,0,0,0.05)]",
            sharedRounded,
            "relative z-0",
            !isActive && "hidden"
          )}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

Accordion.Section = Section;

export default Accordion;
