// Method 1: Function Declaration
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// Method 2: Arrow Function
const WelcomeArrow = () => {
  return <h1>Hello, World!</h1>;
}

// Method 3: Arrow Function (Implicit Return)
const WelcomeImplicit = () => <h1>Hello, World!</h1>;

// (the slides name all three 'Welcome'. They are renamed here so all three can be in one file and shown together.)
function FunctionalComponents() {
  return (
    <div>
      <Welcome />
      <WelcomeArrow />
      <WelcomeImplicit />
    </div>
  )
}

export default FunctionalComponents
