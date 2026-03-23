import { useState, useCallback } from "react";

export function useAutoSendMode() {
  const [isAutoSendEnabled, setIsAutoSendEnabled] = useState(false);

  const toggleAutoSend = useCallback(() => {
    setIsAutoSendEnabled((prev) => !prev);
  }, []);

  const enableAutoSend = useCallback(() => {
    setIsAutoSendEnabled(true);
  }, []);

  const disableAutoSend = useCallback(() => {
    setIsAutoSendEnabled(false);
  }, []);

  return {
    isAutoSendEnabled,
    toggleAutoSend,
    enableAutoSend,
    disableAutoSend,
  };
}
