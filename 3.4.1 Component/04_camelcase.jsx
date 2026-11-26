// ❌ Wrong - HTML attributes
// <div class="container" onclick="handleClick()">

// ✅ Correct - JSX attributes
function CamelCaseAttributes() {
  const handleClick = () => console.log('clicked')

  return (
    <div className="container" onClick={handleClick}>Click this box (see console)</div>
  )
}

export default CamelCaseAttributes
