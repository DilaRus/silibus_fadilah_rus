import React from 'react'

// JSX
const element = <h1>Hello, World!</h1>;

// Transpiled JavaScript
// (named transpiledElement here because 'element' is already declared above in the same file)
const transpiledElement = React.createElement('h1', null, 'Hello, World!');

function JsxAndTranspiled() {
  return (
    <div>
      {element}
      {transpiledElement}
    </div>
  )
}

export default JsxAndTranspiled
