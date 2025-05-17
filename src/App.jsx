import './App.css';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import { useState, useEffect } from 'react';

function App() {
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {

  },);

  return (
    <div className="fb-app">
      <header className="fb-header">
        <img
          src="https://img.freepik.com/free-photo/fuji-mountain-kawaguchiko-lake-morning-autumn-seasons-fuji-mountain-yamanachi-japan_335224-102.jpg"
          className="fb-cover"
          alt="Cover"
        />
        <div className="fb-profile-pic">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/005/544/708/small/profile-icon-design-free-vector.jpg"
            alt="Profile"
          />
        </div>
        <h1>Feed</h1>
      </header>

      <main className="fb-main">
        <aside className="fb-sidebar">
          <h3>Photos</h3>
          <div className="fb-photos">
            <img src="https://images.theconversation.com/files/651621/original/file-20250226-32-jxjhmy.jpg" alt="Photo1" />
            <img src="https://www.pdinsurance.co.nz/wp-content/uploads/2022/08/alena-ganzhela-_OLiar50J-A-unsplash.jpg" alt="Photo2" />
            <img src="https://www.wnct.com/wp-content/uploads/sites/99/2022/07/Cat.jpg" alt="Photo3" />
          </div>
        </aside>

        <section className="fb-feed">
          <button className="tweet-button" onClick={() => setShowForm(true)}>Post</button>
          {showForm && <PostForm onClose={() => setShowForm(false)} />}
          <PostList />
        </section>
      </main>
    </div>
  );
}

export default App;