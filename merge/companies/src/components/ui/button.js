import React from 'react';

export const Button = ({ children, variant, ...props }) => {
  const styles = variant === "destructive" ? "bg-red-500" : "bg-blue-500";
  return (
    <button className={`${styles} text-white p-2 rounded-lg`} {...props}>
      {children}
    </button>
  );
};