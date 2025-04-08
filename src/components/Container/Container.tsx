import { forwardRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export const Container = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, className, disabled = false, ...rest } = props;

  return (
    <div
      ref={ref}
      data-component-name="Container"
      className={`mx-auto ${disabled ? '' : 'p-4'} ${className}`}
      {...rest}>
      {children}
    </div>
  );
});
