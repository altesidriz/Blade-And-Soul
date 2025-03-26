import React, { createContext, useState } from 'react';

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [appError, setAppError] = useState(null);

  return (
    <ErrorContext.Provider value={{ appError, setAppError }}>
      {children}
    </ErrorContext.Provider>
  );
};


