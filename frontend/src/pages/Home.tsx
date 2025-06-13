import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-xl text-gray-600 mb-8">
          I'm a software developer passionate about building great products.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/projects"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            View Projects
          </Link>
          <Link
            to="/contact"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
          >
            Contact Me
          </Link>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-2xl font-bold mb-6">Latest Blog Posts</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Placeholder blog posts */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Getting Started with Go</h3>
            <p className="text-gray-600 mb-4">
              Learn the basics of Go programming language and its ecosystem.
            </p>
            <Link to="/blog/getting-started-with-go" className="text-blue-600 hover:underline">
              Read more →
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Building with React</h3>
            <p className="text-gray-600 mb-4">
              A comprehensive guide to building modern web applications with React.
            </p>
            <Link to="/blog/building-with-react" className="text-blue-600 hover:underline">
              Read more →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Placeholder projects */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Project One</h3>
            <p className="text-gray-600 mb-4">
              A full-stack web application built with React and Go.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/yourusername/project-one"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
              <a
                href="https://project-one.demo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Live Demo
              </a>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Project Two</h3>
            <p className="text-gray-600 mb-4">
              An open-source tool for developers.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/yourusername/project-two"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
              <a
                href="https://project-two.demo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 