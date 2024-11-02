import React, {
  useState,
  useRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from "react";
import Tooltip from "./Tooltip";

const TooltipInput = ({
  className,
  children,
  content,
  onClick,
  type,
  value,
  onchange,
}: {
  className?: string;
  children?: JSX.Element;
  content: string;
  type: HTMLInputTypeAttribute;
  onClick?: () => void;
  value?: InputHTMLAttributes<HTMLInputElement>["value"];
  onchange?: (e: string) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <input
        type={type}
        ref={buttonRef}
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        value={value}
        onChange={(e) => onchange && onchange(e.target.value)}
      >
        {children}
      </input>
      {isHovered && <Tooltip text={content} targetRef={buttonRef} />}
    </>
  );
};

export default TooltipInput;
