import React, { useState, useEffect } from "react";

interface ErrorAlertProps {
  txt?: string;
  color?: string;
  show: boolean;
  setShow: (show: boolean) => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({
  txt = "An error occurred",
  color = "text-white",
  show,
  setShow,
}) => {
  useEffect(() => {
    // Set a timer to hide the alert after 5 seconds
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000); // 5000 ms = 5 seconds

    // Cleanup the timer if the component is unmounted before the timer completes
    return () => clearTimeout(timer);
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={` ${color} bg-red-300 p-6 absolute left-0 top-0 w-full z-50 shadow-lg `}
    >
      <span>{txt}</span>
    </div>
  );
};

export default ErrorAlert;
