import React, { useState } from 'react';

export const Dialog = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {React.Children.map(children, (child) =>
        child.type.displayName === "DialogTrigger"
          ? React.cloneElement(child, { onClick: () => setIsOpen(!isOpen) })
          : isOpen && child
      )}
    </>
  );
};

export const DialogTrigger = ({ children, onClick }) => (
  <div onClick={onClick}>{children}</div>
);

DialogTrigger.displayName = "DialogTrigger";

export const DialogContent = ({ children }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
    <div className="bg-white p-5 rounded-md">{children}</div>
  </div>
);

export const DialogFooter = ({ children }) => (
  <div className="mt-4 flex justify-end space-x-2">{children}</div>
);