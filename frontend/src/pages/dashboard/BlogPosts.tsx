import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogPostForm, { BlogPostFormData } from '../../components/BlogPostForm';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  slug: string;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

const BlogPosts: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/blog');
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch blog posts');
      setLoading(false);
    }
  };

  const handleCreatePost = async (data: BlogPostFormData) => {
    try {
      const response = await axios.post('/api/blog', data);
      setPosts((prev) => [...prev, response.data]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to create blog post');
    }
  };

  const handleUpdatePost = async (data: BlogPostFormData) => {
    if (!editingPost) return;

    try {
      const response = await axios.put(`/api/blog/${editingPost.id}`, data);
      setPosts((prev) =>
        prev.map((post) =>
          post.id === editingPost.id ? response.data : post
        )
      );
      setEditingPost(null);
    } catch (err) {
      setError('Failed to update blog post');
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    try {
      await axios.delete(`/api/blog/${id}`);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      setError('Failed to delete blog post');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (showForm || editingPost) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {editingPost ? 'Edit Blog Post' : 'Create Blog Post'}
        </h1>
        <BlogPostForm
          initialData={editingPost || undefined}
          onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
          onCancel={() => {
            setShowForm(false);
            setEditingPost(null);
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Blog Posts</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowForm(true)}
        >
          Add Post
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {posts.map((post) => (
            <li key={post.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {post.tags && post.tags.length > 0 ? post.tags.join(', ') : 'No Tags'}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => setEditingPost(post)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {post.published ? (
                        <span className="text-green-600">Published</span>
                      ) : (
                        <span className="text-yellow-600">Draft</span>
                      )}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Created: {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogPosts; 