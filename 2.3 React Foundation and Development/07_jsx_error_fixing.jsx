/*
Exercise 4: JSX Error Fixing (slide 22)
Task: Fix the JSX errors in the provided code.

Errors found in the slide's BrokenComponent and how they were fixed:
  1. <p>Message: {message}      -> the <p> tag was never closed. Added </p>.
  2. <img src="logo.png" alt="Logo">  -> an img tag must be self-closing in JSX. Now ends with />.
  3. <div class="container">    -> class must be className in JSX.
  4. The outer <div> opened at the top was never closed. Added the closing </div> before the final parenthesis.
*/
function BrokenComponent() {
  const message = "Hello World"

  return (
    <div>
      <h1>Welcome</h1>
      <p>Message: {message}</p>
      <img src="logo.png" alt="Logo" />
      <div className="container">
        <span>Item 1</span>
        <span>Item 2</span>
      </div>
    </div>
  )
}

export default BrokenComponent
