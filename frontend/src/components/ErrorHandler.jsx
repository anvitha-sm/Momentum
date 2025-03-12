import React from 'react';
import './ErrorHandler.css';

export const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-icon">ERROR</div>
      <div className="error-message">{message || "An error occurred. Please try again."}</div>
      {onRetry && (
        <button className="retry-button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export const handleApiError = (error, setErrorState, customMessage) => {
  console.error("API Error:", error);
  
  if (error.response) {
    const status = error.response.status;
    const serverMessage = error.response.data?.message;
    
    if (status === 401) {
      setErrorState("Your session has expired. Please log in again.");
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }
    
    if (status === 403) {
      setErrorState("You don't have permission to perform this action.");
      return;
    }
    
    if (status === 404) {
      setErrorState("The requested resource was not found.");
      return;
    }
    
    if (status >= 500) {
      setErrorState("Server error. Please try again later.");
      return;
    }
    
    setErrorState(serverMessage || customMessage || "An error occurred. Please try again.");
  } else if (error.request) {
    setErrorState("Unable to connect to the server. Please check your internet connection.");
  } else {
    setErrorState(customMessage || "An error occurred. Please try again.");
  }
};

export const useErrorHandler = (initialState = "") => {
  const [error, setError] = React.useState(initialState);
  
  const clearError = () => setError("");
  
  const handleError = (err, customMessage) => {
    handleApiError(err, setError, customMessage);
  };
  
  return {
    error,
    setError,
    clearError,
    handleError
  };
};

export default {
  ErrorMessage,
  handleApiError,
  useErrorHandler
}; 