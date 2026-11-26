/*
Exercise 1: Environment Setup Verification (slides 17-18)
Task: Verify your development environment is working correctly.
Instructions:
  Create a new React project called "react-practice"
  Start the development server
  Modify the default App component to display your name
Expected Result:
  Development server runs on localhost:5173
  Page displays your name instead of default content
  No console errors
(This component is the modified App.)
*/
function Exercise1() {
  const myName = "Your Name"   // replace with your own name

  return (
    <div>
      <h1>{myName}</h1>
    </div>
  )
}

export default Exercise1
