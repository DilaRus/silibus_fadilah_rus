function EventDemo() {
  const handleEvent = (e) => {
    // Prevent default browser behavior
    e.preventDefault();

    // Stop event bubbling
    e.stopPropagation();

    // Common properties
    console.log('Event type:', e.type);
    console.log('Target:', e.target);
    console.log('Current target:', e.currentTarget);
    console.log('Key pressed:', e.key); // for keyboard events
    console.log('Mouse button:', e.button); // for mouse events
  };

  return <input onKeyDown={handleEvent} />;
}

export default EventDemo;
