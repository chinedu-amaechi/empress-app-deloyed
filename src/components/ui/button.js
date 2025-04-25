// src/components/ui/button.js
import React from "react";
import Link from "next/link";

function Button({
  type = "button",
  children,
  className = "",
  disabled = false,
  href,
  as: Component,
  onClick,
  ...props
}) {
  const buttonClasses = `w-full bg-[#11296B] hover:bg-[#1E96FC] text-white font-medium py-2.5 rounded-lg transition-colors ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  } ${className}`;

  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href} className={buttonClasses} {...props}>
        {children}
      </Link>
    );
  }

  // If a custom component is provided, use that
  if (Component) {
    return (
      <Component className={buttonClasses} {...props}>
        {children}
      </Component>
    );
  }

  // Otherwise render as a button
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
