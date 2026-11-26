import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to React!</h1>
        <p>This is my first React component</p>
        <p>Current time: {new Date().toLocaleTimeString()}</p>
      </header>
    </div>
  )
}

export default App
