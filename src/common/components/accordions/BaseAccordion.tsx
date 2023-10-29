import { Children, FormEvent, ReactElement, ReactNode, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

type ComponentProps = {
  className?: string;
  init?: boolean;
  children: ReactNode;
};

type ChildProps = {
  children: ReactNode;
};

export default function BaseAccordion({ init, children }: ComponentProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(init || false);

  function handleOnToggle(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsExpanded((prev) => !prev);
  }

  return (
    <div>
      {Children.map(children, (child) => {
        if (checkNamespace(child, "head")) {
          return (
            <button
              onClick={handleOnToggle}
              className="flex items-center justify-between w-full space-x-4"
            >
              {child}
              <FaChevronDown
                className={`transition-all duration-300 h-4 w-4 ${
                  isExpanded && "rotate-180"
                }`}
              />
            </button>
          );
        } else {
          return (
            <div
              className={`grid transition-all duration-300 ${
                isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">{child}</div>
            </div>
          );
        }
      })}
    </div>
  );
}

BaseAccordion.Head = ({ children }: ChildProps) => <>{children}</>;

BaseAccordion.Body = ({ children }: ChildProps) => <>{children}</>;

function checkNamespace(
  child: any,
  namespace: string
): child is ReactElement<ChildProps> {
  if (namespace === "head") {
    return child.type === BaseAccordion.Head;
  } else {
    return child.type === BaseAccordion.Body;
  }
}
