function InlineStyles() {
  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px'
  };

  return (
    <button style={buttonStyle}>
      Click Me
    </button>
  );
}

export default InlineStyles
