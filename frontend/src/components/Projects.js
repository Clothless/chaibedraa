import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: "Face Recognition System",
      description: "A Python-based face recognition system using computer vision.",
      technologies: ["Python", "OpenCV", "Machine Learning"],
      github: "https://github.com/Clothless/FaceRecognition"
    },
    {
      title: "Heart Disease Prediction",
      description: "Machine learning model to predict heart disease using patient data.",
      technologies: ["Python", "Machine Learning", "Data Analysis"],
      github: "https://github.com/Clothless/Heart-Desease-Prediction"
    },
    {
      title: "Credit Card Fraud Detection",
      description: "Real-time fraud detection system using machine learning.",
      technologies: ["Python", "Machine Learning", "Data Science"],
      github: "https://github.com/Clothless/Credit-Card-Fraud-Detection"
    },
    {
      title: "Restaurant Management System",
      description: "Full-stack application for restaurant management.",
      technologies: ["Python", "Django", "SQLite"],
      github: "https://github.com/Clothless/Restaurent-Management-System"
    },
    {
      title: "URL Shortener",
      description: "A service to create short URLs for long links.",
      technologies: ["Python", "Web Development"],
      github: "https://github.com/Clothless/URL-Shortner"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Projects</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h2>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Technologies:</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects; 