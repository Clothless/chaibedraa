import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectForm, { ProjectFormData } from '../../components/ProjectForm';

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  github_url: string;
  live_url: string;
  featured: boolean;
  created_at: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch projects');
      setLoading(false);
    }
  };

  const handleCreateProject = async (data: ProjectFormData) => {
    try {
      const response = await axios.post('/api/projects', data);
      setProjects((prev) => [...prev, response.data]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to create project');
    }
  };

  const handleUpdateProject = async (data: ProjectFormData) => {
    if (!editingProject) return;

    try {
      const response = await axios.put(`/api/projects/${editingProject.id}`, data);
      setProjects((prev) =>
        prev.map((project) =>
          project.id === editingProject.id ? response.data : project
        )
      );
      setEditingProject(null);
    } catch (err) {
      setError('Failed to update project');
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await axios.delete(`/api/projects/${id}`);
      setProjects((prev) => prev.filter((project) => project.id !== id));
    } catch (err) {
      setError('Failed to delete project');
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

  if (showForm || editingProject) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {editingProject ? 'Edit Project' : 'Create Project'}
        </h1>
        <ProjectForm
          initialData={editingProject || undefined}
          onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
          onCancel={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowForm(true)}
        >
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <div className="mt-4 flex space-x-2">
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  GitHub
                </a>
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-800"
                  >
                    Live Demo
                  </a>
                )}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => setEditingProject(project)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects; 