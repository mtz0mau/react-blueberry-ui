interface Props {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}

export const Label = ({ children, htmlFor, className }: Props) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  );
};
