import React from "react";

export default function Button({
  children,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button className={`px-4 py-3 rounded-lg ${className}`} {...props}>
      {children}
    </button>
  );
}
