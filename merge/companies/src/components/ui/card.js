import React from 'react';

export const Card = ({ children, ...props }) => (
  <div className="border p-4 rounded-xl shadow-md" {...props}>
    {children}
  </div>
);

export const CardContent = ({ children }) => (
  <div>
    {children}
  </div>
);