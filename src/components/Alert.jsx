import React from 'react'
import { useState, useEffect } from 'react'


function Alert({ title, message, open, setOpen, autoHideMs = 10000, className = ' border-red-300 bg-red-50 text-red-800' }) {

  useEffect(() => {
    if (!autoHideMs || !open) return;
    const t = setTimeout(() => setOpen(false), autoHideMs);
    return () => clearTimeout(t);
  }, [autoHideMs, open, setOpen]);

  if (!open) return null;

  return (
  <div className="fixed inset-x-0 top-10 z-50 flex justify-center px-4">
      <div
        className={`w-full max-w-xl rounded-lg border shadow ${className}`}
        role="alert"
        aria-atomic="true"
      >
        <div className="flex items-start gap-3 p-4">
          {/* Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.59c.75 1.335-.213 3.01-1.742 3.01H3.481c-1.53 0-2.492-1.675-1.742-3.01L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-.75-6.75a.75.75 0 00-1.5 0v4a.75.75 0 001.5 0v-4z"
              clipRule="evenodd"
            />
          </svg>

          {/* Message */}
          <div className="flex-1">
            <h2 className="font-semibold">{title}</h2>
            <p className="text-sm">{message}</p>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="ml-2 inline-flex rounded-md p-1 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label="Dismiss alert"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 
                1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 
                1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 
                10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>  
  )
}

export default Alert