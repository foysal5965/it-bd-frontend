const DisableInspect = () => {
  // Disable Right-Click
  const handleContextMenu = (e: MouseEvent) => e.preventDefault();

  // Disable DevTools shortcuts, including F12
  const handleKeyDown = (e: KeyboardEvent) => {
    if (
      e.key === "F12" || // Prevent F12
      (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "C" || e.key === "J")) || // Prevent Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J
      (e.ctrlKey && e.key === "U") // Prevent Ctrl+U
    ) {
      e.preventDefault();
    }
  };

  // Add listeners
  document.addEventListener("contextmenu", handleContextMenu);
  document.addEventListener("keydown", handleKeyDown);

  return () => {
    // Cleanup listeners on unmount
    document.removeEventListener("contextmenu", handleContextMenu);
    document.removeEventListener("keydown", handleKeyDown);
  };
};

export default DisableInspect;
