/*
Exercise 2: Basic JSX Practice (slides 19-20)
Task: Create a component that demonstrates JSX features.
Create a new component called PersonalInfo.jsx with:
  Your name in an h1 tag
  Your favorite programming language in a paragraph
  A list of 3 hobbies
  Current date and time
  An image (use any online image URL)

Exercise 3: Project Structure Exploration (slide 21)
Task: Understand the project structure by making specific changes.
  Create a new folder src/components
  Move your PersonalInfo component to this folder
  Import and use it in App.jsx
  Add a custom CSS file for your component
  Verify everything still works
(Here the folder is components/ next to this file, PersonalInfo is imported and used below, and it has its own PersonalInfo.css.)
*/
import PersonalInfo from './components/PersonalInfo.jsx'

function Exercise2and3() {
  return <PersonalInfo />
}

export default Exercise2and3
