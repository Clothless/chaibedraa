import React from 'react';

const Blog = () => {
  const blogPosts = [
    {
      title: "Getting Started with Flutter Development",
      excerpt: "A comprehensive guide to start your journey with Flutter mobile development...",
      date: "2024-02-15",
      readTime: "5 min read",
      category: "Mobile Development"
    },
    {
      title: "Understanding Machine Learning Basics",
      excerpt: "An introduction to the fundamental concepts of machine learning...",
      date: "2024-01-20",
      readTime: "8 min read",
      category: "Machine Learning"
    },
    {
      title: "Docker for Beginners",
      excerpt: "Learn how to containerize your applications with Docker...",
      date: "2023-12-10",
      readTime: "6 min read",
      category: "DevOps"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600">Thoughts, tutorials, and insights about software development</p>
        </div>
        
        <div className="space-y-8">
          {blogPosts.map((post, index) => (
            <article key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {post.category}
                  </span>
                  <div className="text-sm text-gray-500">
                    {post.date} · {post.readTime}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Read more →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog; 