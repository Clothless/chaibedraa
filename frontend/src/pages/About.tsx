import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-8">
          I'm a passionate software engineer with experience in programming languages like JavaScript, Python, and Dart, and I've worked with frameworks such as Django, ExpressJS, and Flutter. I enjoy building things—whether it's back-end web systems, mobile apps, or managing databases like MySQL, MongoDB, and Firebase. I've worked on challenging projects during my studies and collaborated with others in coding clubs, which taught me the value of teamwork and problem-solving. I take pride in writing clean, efficient code and creating software that works well. I'm ready to take what I've learned and use it to contribute in a professional role.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-6">Skills & Technologies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Programming Languages</h3>
            <ul className="text-gray-600 space-y-1">
              <li>JavaScript</li>
              <li>Python</li>
              <li>Dart</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Frameworks/Libraries</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>NodeJS</li>
              <li>ExpressJS</li>
              <li>Flutter</li>
              <li>Django</li>
              <li>Passport</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Backend</h3>
            <ul className="text-gray-600 space-y-1">
              <li>Node.js</li>
              <li>ExpressJS</li>
              <li>REST APIs</li>
              <li>Firebase</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Databases</h3>
            <ul className="text-gray-600 space-y-1">
              <li>MySQL</li>
              <li>PostgreSQL</li>
              <li>MongoDB</li>
              <li>SQLite</li>
              <li>Oracle</li>
              <li>Firebase</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Tools & Technologies</h3>
            <ul className="text-gray-600 space-y-1">
              <li>Git</li>
              <li>Docker</li>
              <li>Kubernetes</li>
              <li>REST APIs</li>
              <li>Jira</li>
              <li>ClickUp</li>
              <li>Slack</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Other Skills</h3>
            <ul className="text-gray-600 space-y-1">
              <li>Problem Solving</li>
              <li>Teamwork</li>
              <li>Clean Code</li>
              <li>Efficient Software Design</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6">Work Experience</h2>
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Flutter Developer</h3>
            <p className="text-gray-600 mb-2">TELETIC -Digital banking & Telecoms solutions- • June 2024 - Present</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Design, develop, test, and deploy software using Flutter framework and Dart language</li>
              <li>Create user interface components following Flutter/Dart best practices</li>
              <li>Collaborate with product and engineering leads to implement business objectives</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6">Education</h2>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Master of Software Engineering (1 year studied)</h3>
            <p className="text-gray-600">Ibn Khaldoun University, Tiaret, Algeria • 2023 - 2024</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Bachelor of Computer Science</h3>
            <p className="text-gray-600">Ibn Khaldoun University, Tiaret, Algeria • 2020 - 2023</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Data Analytics</h3>
            <p className="text-gray-600">Google (Remote) • 2022</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Project Management</h3>
            <p className="text-gray-600">Google (Remote) • 2022</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6">Connect with Me</h2>
        <div className="flex flex-wrap gap-6 mb-12">
          <a href="https://github.com/Clothless" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
            <img src="https://github.githubassets.com/favicons/favicon-github.svg" alt="GitHub" className="w-6 h-6 mr-2" />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/ibrahim-chaibedraa" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-700 hover:underline">
            <img src="https://www.linkedin.com/favicon.ico" alt="LinkedIn" className="w-6 h-6 mr-2" />
            LinkedIn
          </a>
          <a href="https://stackoverflow.com/users/15012125/chaibedraa-ibrahim" target="_blank" rel="noopener noreferrer" className="flex items-center text-orange-500 hover:underline">
            <img src="https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico" alt="Stack Overflow" className="w-6 h-6 mr-2" />
            Stack Overflow
          </a>
          <a href="https://leetcode.com/u/ibradzm/" target="_blank" rel="noopener noreferrer" className="flex items-center text-yellow-600 hover:underline">
            <img src="https://leetcode.com/favicon.ico" alt="LeetCode" className="w-6 h-6 mr-2" />
            LeetCode
          </a>
          <a href="https://www.facebook.com/Ibrahim.Chaibedraa" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-800 hover:underline">
            <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-6 h-6 mr-2" />
            Facebook
          </a>
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