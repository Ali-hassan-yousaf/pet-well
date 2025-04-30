
import { useState, useEffect } from "react";

const Community = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/items');
        const data = await response.json();
        setPosts(data.filter(post => post.status === 'approved'));
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPostImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (postImage) formData.append('image', postImage);

      await fetch('/api/items', {
        method: 'POST',
        body: formData
      });

      // Reset form
      setTitle("");
      setContent("");
      setPostImage(null);
      setPreviewUrl(null);

    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <header>Community Header</header>

      <main>
        <h1>Community Posts</h1>
        
        <section>
          <h2>Posts</h2>
          {isLoading ? (
            <div>Loading posts...</div>
          ) : posts.length > 0 ? (
            posts.map(post => (
              <div key={post._id}>
                <h3>{post.title}</h3>
                <p>By {post.author}</p>
                <p>{post.content}</p>
                {post.image_url && <img src={post.image_url} alt="Post" />}
                <div>
                  <span>Likes: {post.likes}</span>
                  <span>Comments: {post.comments}</span>
                </div>
              </div>
            ))
          ) : (
            <div>No posts found</div>
          )}
        </section>

        <section>
          <h2>Create Post</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title:</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label>Content:</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
              />
              {previewUrl && <img src={previewUrl} alt="Preview" />}
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </section>
      </main>

      <footer>Community Footer</footer>
    </div>
  );
};

export default Community;
