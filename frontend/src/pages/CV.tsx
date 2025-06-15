import React from 'react';

const CV: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Curriculum Vitae</h1>
        <a
          href="https://docs.google.com/document/d/1sUn6qFXtRKFeADleLpdHM28mUkJiluBHfb0moIddfkY/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download PDF
        </a>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Professional Summary</h2>
          <p className="text-gray-600">
            Experienced software engineer with a strong background in full-stack development,
            specializing in React, TypeScript, and Go. Proven track record of delivering
            high-quality, scalable applications and mentoring junior developers.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Frontend</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>React</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Next.js</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Backend</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Go</li>
                <li>Node.js</li>
                <li>PostgreSQL</li>
                <li>REST APIs</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">DevOps</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Docker</li>
                <li>Git</li>
                <li>CI/CD</li>
                <li>AWS</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold">Senior Software Engineer</h3>
              <p className="text-gray-600">Company Name • 2020 - Present</p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Led development of key features for a high-traffic web application</li>
                <li>Mentored junior developers and conducted code reviews</li>
                <li>Improved application performance by 40% through optimization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Software Engineer</h3>
              <p className="text-gray-600">Previous Company • 2018 - 2020</p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Developed and maintained multiple client projects</li>
                <li>Implemented CI/CD pipelines for automated testing and deployment</li>
                <li>Collaborated with design team to create responsive UIs</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Education</h2>
          <div>
            <h3 className="text-xl font-semibold">Bachelor of Science in Computer Science</h3>
            <p className="text-gray-600">University Name • 2014 - 2018</p>
            <p className="text-gray-600 mt-2">
              Relevant coursework: Data Structures, Algorithms, Database Systems, Web Development
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Certifications</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>AWS Certified Developer - Associate</li>
            <li>Google Cloud Professional Developer</li>
            <li>Certified Kubernetes Administrator</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CV; 