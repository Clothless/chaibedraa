import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-8">
          I'm a software developer passionate about building great products and solving complex problems.
          With expertise in both frontend and backend development, I create full-stack applications
          that are both beautiful and functional.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-6">Skills & Technologies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Frontend</h3>
            <ul className="text-gray-600 space-y-1">
              <li>React</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Next.js</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Backend</h3>
            <ul className="text-gray-600 space-y-1">
              <li>Go</li>
              <li>Node.js</li>
              <li>PostgreSQL</li>
              <li>REST APIs</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">DevOps</h3>
            <ul className="text-gray-600 space-y-1">
              <li>Docker</li>
              <li>Git</li>
              <li>CI/CD</li>
              <li>AWS</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6">Experience</h2>
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Senior Software Engineer</h3>
            <p className="text-gray-600 mb-2">Company Name • 2020 - Present</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Led development of key features for a high-traffic web application</li>
              <li>Mentored junior developers and conducted code reviews</li>
              <li>Improved application performance by 40% through optimization</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Software Engineer</h3>
            <p className="text-gray-600 mb-2">Previous Company • 2018 - 2020</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Developed and maintained multiple client projects</li>
              <li>Implemented CI/CD pipelines for automated testing and deployment</li>
              <li>Collaborated with design team to create responsive UIs</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6">Education</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Bachelor of Science in Computer Science</h3>
          <p className="text-gray-600">University Name • 2014 - 2018</p>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6">Interests</h2>
        <p className="text-gray-600">
          When I'm not coding, you can find me exploring new technologies, contributing to open-source
          projects, or enjoying outdoor activities. I'm also passionate about teaching and sharing
          knowledge with the developer community.
        </p>
      </div>
    </div>
  );
};

export default About; 