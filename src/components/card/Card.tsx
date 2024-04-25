import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
  childClassName?: string;
};

export default function Card({
  children,
  title,
  description,
  childClassName,
}: Props) {
  return (
    <div className="flex flex-col gap-2 justify-start">
      {title && <h4 className="text-lg font-medium text-slate-700">{title}</h4>}
      {description && (
        <p className="text-base font-normal text-slate-600">{description}</p>
      )}

      <div className={`${childClassName}`}>{children}</div>
    </div>
  );
}
