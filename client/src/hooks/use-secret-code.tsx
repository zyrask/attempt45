import { useState, useEffect } from "react";

const SECRET_CODE = "9017598429";

export function useSecretCode() {
  const [secretCodeBuffer, setSecretCodeBuffer] = useState("");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only process actual character keys
      if (e.key.length === 1) {
        setSecretCodeBuffer(prev => {
          const newBuffer = (prev + e.key).slice(-10); // Keep only last 10 characters
          
          if (newBuffer === SECRET_CODE) {
            setIsAdminMode(true);
            setShowNotification(true);
            
            // Hide notification after 3 seconds
            setTimeout(() => {
              setShowNotification(false);
            }, 3000);
            
            return "";
          }
          
          return newBuffer;
        });
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return {
    isAdminMode,
    showNotification,
    resetAdminMode: () => setIsAdminMode(false)
  };
}
