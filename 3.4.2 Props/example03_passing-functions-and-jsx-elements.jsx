// (Button and Modal are defined here so the snippets from the slide can run)
function Button({ onClick }) {
  return <button onClick={onClick}>Click me</button>
}

function Modal({ header, content }) {
  return (
    <div style={{ border: '1px solid gray', padding: 8, marginTop: 8 }}>
      {header}
      {content}
    </div>
  )
}

function PassingFunctionsAndJsx() {
  const handleClick = () => console.log('Button clicked')

  return (
    <div>
      {/* Functions */}
      <Button onClick={handleClick} />
      {/* JSX Elements */}
      <Modal
        header={<h2>Warning</h2>}
        content={<p>Are you sure?</p>}
      />
    </div>
  )
}

export default PassingFunctionsAndJsx
