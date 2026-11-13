import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

// import Navigation from "./component/Navigation";
// import Home from './pages/Home';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import { lazy } from "react";

const Navigation = lazy(() => import('./component/Navigation'))
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const UserProfile = lazy(() => import('./pages/Home'))
// const Search= lazy(() => import('./pages/Search'))
// const Dashboard = lazy(() => import('./pages/Dashboard'))



function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user-profile/:id" element={<UserProfile />} />
        </Routes>

      </Router>

    </div>
  );
}

export default App;