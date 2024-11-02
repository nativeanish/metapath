import React, {
  useState,
  useRef,
  HTMLInputTypeAttribute,
  TextareaHTMLAttributes,
} from "react";
import Tooltip from "./Tooltip";

const TooltipTextArea = ({
  className,
  children,
  content,
  onClick,
  rows,
  value,
  onchange,
}: {
  className?: string;
  children?: JSX.Element;
  content: string;
  onClick?: () => void;
  rows?: number;
  value?: TextareaHTMLAttributes<HTMLTextAreaElement>["value"];
  onchange?: (e: string) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <>
      <textarea
        ref={buttonRef}
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        rows={rows}
        value={value}
        onChange={(e) => onchange && onchange(e.target.value)}
      >
        {children}
      </textarea>
      {isHovered && <Tooltip text={content} targetRef={buttonRef} />}
    </>
  );
};

export default TooltipTextArea;
