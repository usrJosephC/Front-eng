import React from "react";

const Button = React.forwardRef(function Button(
  { className = "", ...props },
  ref
) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

export { Button };
