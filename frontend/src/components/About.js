import React from 'react';

const About = () => {
  const socialLinks = {
    github: 'https://github.com/Clothless',
    linkedin: 'https://www.linkedin.com/in/ibrahim-chaibedraa/',
    facebook: 'https://www.facebook.com/Ibrahim.Chaibedraa',
    stackoverflow: 'https://stackoverflow.com/users/15012125/chaibedraa-ibrahim',
    leetcode: 'https://leetcode.com/u/ibradzm/',
    cv: 'https://docs.google.com/document/d/1sUn6qFXtRKFeADleLpdHM28mUkJiluBHfb0moIddfkY/edit?usp=sharing'
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Ibrahim Chaibedraa</h1>
            <p className="text-xl text-gray-600 mb-8">Software Engineer & Problem Solver</p>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">About Me</h2>
              <p className="text-gray-600">
                I'm a passionate software engineer with expertise in Python and Dart development. 
                I specialize in building robust applications using Flutter for mobile development 
                and have extensive experience with various technologies including Firebase, Docker, 
                Kubernetes, and REST APIs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Skills</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Programming Languages</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Python</li>
                    <li>Dart</li>
                    <li>JavaScript</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Technologies</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Flutter</li>
                    <li>Firebase</li>
                    <li>Docker</li>
                    <li>Kubernetes</li>
                    <li>REST APIs</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Connect With Me</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" 
                   className="flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700">
                  GitHub
                </a>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  LinkedIn
                </a>
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900">
                  Facebook
                </a>
                <a href={socialLinks.stackoverflow} target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600">
                  Stack Overflow
                </a>
                <a href={socialLinks.leetcode} target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600">
                  LeetCode
                </a>
                <a href={socialLinks.cv} target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                  View CV
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 