/*
Practice Exercise 2: User Dashboard (slide 27)
Build a user dashboard with:
  Header with user name
  Sidebar with navigation
  Main content area with user stats
  Footer with links
Use component composition principles.
*/
import { Header, Sidebar, MainContent } from './example14_layout-components.jsx'
import './example15_using-layout-components.css'

function Footer({ children }) {
  return (
    <footer className="app-footer">
      {children}
    </footer>
  );
}

function UserDashboard() {
  const user = { name: "Alice", posts: 24, followers: 310, following: 180 }

  return (
    <div className="app">
      <Header>
        <h1>Dashboard of {user.name}</h1>
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
          <h2>User Stats</h2>
          <ul>
            <li>Posts: {user.posts}</li>
            <li>Followers: {user.followers}</li>
            <li>Following: {user.following}</li>
          </ul>
        </MainContent>
      </div>

      <Footer>
        <a href="/">Home</a> | <a href="/about">About</a> | <a href="/contact">Contact</a>
      </Footer>
    </div>
  )
}

export default UserDashboard
