


import { useState, useEffect } from "react";

const Community = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const API_URL = "https://pet-well.vercel.app/api/items";

  // GET request handler
  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPosts(data.filter(post => post.status === 'approved'));

    } catch (error) {
      console.error("Error fetching posts:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // POST request handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (postImage) formData.append('image', postImage);

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Submission failed');
      }

      // Refresh posts after successful submission
      await fetchPosts();
      
      // Reset form
      setTitle("");
      setContent("");
      setPostImage(null);
      setPreviewUrl(null);

    } catch (error) {
      console.error("Submission error:", error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Display functions
  const renderPosts = () => {
    if (isLoading) return <div>Loading posts...</div>;
    if (error) return <div>Error: {error}</div>;
    if (posts.length === 0) return <div>No posts found</div>;

    return posts.map(post => (
      <div key={post._id} className="post-card">
        <h3>{post.title}</h3>
        <p className="meta">Posted by {post.author?.name || 'Anonymous'}</p>
        <p className="content">{post.content}</p>
        {post.imageUrl && (
          <img 
            src={post.imageUrl} 
            alt="Post content" 
            className="post-image"
          />
        )}
        <div className="engagement">
          <span>Likes: {post.likes || 0}</span>
          <span>Comments: {post.comments?.length || 0}</span>
        </div>
      </div>
    ));
  };

  return (
    <div className="community-container">
      <header className="community-header">
        <h1>PetWell Community</h1>
      </header>

      <main className="community-main">
        <section className="post-form">
          <h2>Create New Post</h2>
          <form onSubmit={handleSubmit}>
            {/* Form inputs remain the same as previous implementation */}
          </form>
        </section>

        <section className="posts-list">
          <h2>Community Posts</h2>
          <div className="posts-container">
            {renderPosts()}
          </div>
        </section>
      </main>

      <footer className="community-footer">
        <p>© 2024 PetWell Community. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Community;
