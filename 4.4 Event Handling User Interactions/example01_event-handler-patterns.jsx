// Event Handler Patterns (slide 5). These are JSX snippets, not a runnable component.
// "handleClick" is assumed to be defined in the component.

// 1. Inline arrow function (avoid for complex logic)
<button onClick={() => console.log('clicked')}>Click</button>

// 2. Function reference (preferred for simple handlers)
<button onClick={handleClick}>Click</button>

// 3. Inline function with parameters
<button onClick={() => handleClick('parameter')}>Click</button>

// 4. Bound method (class components)
<button onClick={this.handleClick.bind(this)}>Click</button>
