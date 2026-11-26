// Layout Components
export function Header({ children }) {
  return (
    <header className="app-header">
      {children}
    </header>
  );
}

export function Sidebar({ children }) {
  return (
    <aside className="sidebar">
      {children}
    </aside>
  );
}

export function MainContent({ children }) {
  return (
    <main className="main-content">
      {children}
    </main>
  );
}
