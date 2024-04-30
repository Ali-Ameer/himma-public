type Props = {
  onClick: () => void;
  name: string;
  color: "primary" | "secondary";
  type?: "submit" | "reset" | "button";
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
};

export default function Button({
  onClick,
  name,
  color = "primary",
  type = "button",
  children,
  className,
  disabled = false,
  loading = false,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-1 w-fit rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm
      ${
        color === "primary"
          ? "bg-teal-600 hover:bg-teal-500 text-white"
          : "bg-yellow-500 hover:bg-yellow-400 text-zinc-800"
      }
      ${className ? className : ""}`}
      disabled={disabled || loading}
      type={type}
    >
      {name} {loading && "..."}
      {children && children}
    </button>
  );
}
