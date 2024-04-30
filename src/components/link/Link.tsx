import { ReactNode } from "react";
import { Link as CustomLink } from "react-router-dom";

type Props = {
  name: string;
  to: string;
  onClick?: () => void;
  color?: "filled" | "outline";
  children?: ReactNode;
  className?: string;
};

export default function Link({ name, to, onClick, color = "filled", children, className }: Props) {
  return (
    <CustomLink
      to={to}
      onClick={onClick}
      className={`w-fit flex items-center gap-1 rounded-md text-sm font-semibold transition-all hover:transition-all 
      ${
        color === "filled"
          ? "bg-yellow-500 hover:bg-yellow-400 text-zinc-800 shadow-sm px-3.5 py-2.5"
          : "rounded-none text-zinc-800 hover:text-zinc-900"
      }
      ${className ? className : ""}`}
    >
      {name}
      {children && children}
    </CustomLink>
  );
}
