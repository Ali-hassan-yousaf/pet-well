// import { useState, useEffect } from "react";

// const Community = () => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [postImage, setPostImage] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [posts, setPosts] = useState([]);
//   const [error, setError] = useState(null);

//   const API_URL = "https://pet-well.vercel.app/api/items";

//   const fetchPosts = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(API_URL);
//       if (!response.ok) throw new Error('Failed to fetch posts');
//       const data = await response.json();
//       setPosts(data.filter(post => post.status === 'approved'));
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//       setError(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   useEffect(() => {
//     return () => {
//       if (previewUrl) URL.revokeObjectURL(previewUrl);
//     };
//   }, [previewUrl]);

//   const handleImageSelect = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setPostImage(file);
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
    
//     try {
//       const formData = new FormData();
//       formData.append('title', title);
//       formData.append('content', content);
//       if (postImage) formData.append('image', postImage);

//       const response = await fetch(API_URL, {
//         method: 'POST',
//         body: formData
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Submission failed');
//       }

//       await fetchPosts();
//       setTitle("");
//       setContent("");
//       setPostImage(null);
//       setPreviewUrl(null);

//     } catch (error) {
//       console.error("Submission error:", error);
//       setError(error.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
//       <header style={{ textAlign: 'center', marginBottom: '40px' }}>
//         <h1>PetWell Community</h1>
//       </header>

//       <main>
//         <section style={{ marginBottom: '40px' }}>
//           <h2>Create New Post</h2>
//           <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//             <div>
//               <label>Title:</label>
//               <input
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//                 style={{ width: '100%', padding: '8px' }}
//               />
//             </div>
            
//             <div>
//               <label>Content:</label>
//               <textarea
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 required
//                 style={{ width: '100%', padding: '8px', minHeight: '100px' }}
//               />
//             </div>

//             <div>
//               <label>Image:</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageSelect}
//                 style={{ marginTop: '5px' }}
//               />
//               {previewUrl && (
//                 <img 
//                   src={previewUrl} 
//                   alt="Preview" 
//                   style={{ maxWidth: '200px', marginTop: '10px' }}
//                 />
//               )}
//             </div>

//             {error && <div style={{ color: 'red' }}>{error}</div>}

//             <button 
//               type="submit" 
//               disabled={isSubmitting}
//               style={{
//                 padding: '10px 20px',
//                 backgroundColor: isSubmitting ? '#ccc' : '#007bff',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer'
//               }}
//             >
//               {isSubmitting ? 'Submitting...' : 'Submit Post'}
//             </button>
//           </form>
//         </section>

//         <section>
//           <h2>Community Posts</h2>
//           {isLoading ? (
//             <div style={{ textAlign: 'center', padding: '20px' }}>Loading posts...</div>
//           ) : error ? (
//             <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>
//           ) : posts.length > 0 ? (
//             posts.map(post => (
//               <article 
//                 key={post._id}
//                 style={{
//                   marginBottom: '30px',
//                   padding: '20px',
//                   border: '1px solid #ddd',
//                   borderRadius: '8px'
//                 }}
//               >
//                 <h3 style={{ marginBottom: '10px' }}>{post.title}</h3>
//                 <p style={{ color: '#666', marginBottom: '8px' }}>
//                   Posted by {post.author?.name || 'Anonymous'}
//                 </p>
//                 <p style={{ marginBottom: '15px' }}>{post.content}</p>
//                 {post.imageUrl && (
//                   <img 
//                     src={post.imageUrl} 
//                     alt="Post" 
//                     style={{ maxWidth: '300px', marginBottom: '15px' }}
//                   />
//                 )}
//                 <div style={{ display: 'flex', gap: '15px', color: '#666' }}>
//                   <span>❤️ {post.likes || 0} Likes</span>
//                   <span>💬 {post.comments?.length || 0} Comments</span>
//                 </div>
//               </article>
//             ))
//           ) : (
//             <div style={{ textAlign: 'center', padding: '20px' }}>No posts found</div>
//           )}
//         </section>
//       </main>

//       <footer style={{ textAlign: 'center', marginTop: '40px', padding: '20px' }}>
//         <p>© 2024 PetWell Community. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Community;



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
