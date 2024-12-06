import clsx from "clsx";

interface Props {
  W?: number | string;
  H?: number | string;
}
const Margin = ({ W, H, ...props }: Props) => (
  <div {...props} className={clsx(W ? `w-[${W}]` : "", H ? `h-[${H}]` : "")} />
);

export default Margin;
