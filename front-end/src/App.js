import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostList from './PostList';
import PostForm from './PostForm';
import PostView from './PostView';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="app-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/create" className="nav-link">Create Post</Link>
        </nav>

        <div className="content-container">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/create" element={<PostForm />} />
            <Route path="/edit/:id" element={<PostForm />} />
            <Route path="/post/:id" element={<PostView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;