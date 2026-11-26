import { Header, Sidebar, MainContent } from './example14_layout-components.jsx'
import './example15_using-layout-components.css'

function App() {
  return (
    <div className="app">
      <Header>
        <h1>My Application</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
        </nav>
      </Header>

      <div className="app-body">
        <Sidebar>
          <ul>
            <li>Dashboard</li>
            <li>Profile</li>
            <li>Settings</li>
          </ul>
        </Sidebar>

        <MainContent>
          <h2>Welcome to Dashboard</h2>
          <p>This is the main content area.</p>
        </MainContent>
      </div>
    </div>
  );
}

export default App
