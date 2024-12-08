interface CheveronProp {
    isActive: boolean;
  }
  const AccordionChevron = ({ isActive }: CheveronProp) => {
    return (
      <svg
        width="10"
        height="5"
        viewBox="0 0 10 5"
        className="transition-transform duration-200"
        style={{ transform: `rotate(${isActive ? 180 : 0}deg)` }}
      >
        <path d="M0 0 L5 5 L10 0" stroke="#A5A5A5" strokeWidth="2" fill="none" className="hover:stroke-[#5194F9] transition-colors" />
      </svg>
    );
  };

  export default AccordionChevron