import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Loader from '../Loader';
import './TeamUpModal.css';

function TeamUpModal({ isOpen, onClose, studentId, onSuccess }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchProjects();
    }
  }, [isOpen]);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      setLoading(true);
      setError(null);
      const response = await fetch(' http://localhost:3000/yourprojects', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        },
        credentials: 'include'
      });
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  const handleProjectClick = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      setSending(true);
      setError(null);
      const response = await fetch(` http://localhost:3000/projects/${projectId}/add-member`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ studentId }),
      });

      const result = await response.json();
      if (result.success) {
        onSuccess('Teammate added successfully');
        onClose();
      } else {
        setError(result.message || 'Failed to add teammate. Please try again.');
      }
    } catch (err) {
      console.error('Error sending invitation:', err);
      setError('Failed to send invitation. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Select a Project to Team Up</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          {loading ? (
            <Loader size="small" />
          ) : error ? (
            <div className="modal-error">
              <p>{error}</p>
              <button className="save-btn" onClick={fetchProjects}>
                Retry
              </button>
            </div>
          ) : projects.length === 0 ? (
            <div className="modal-empty">
              <p>No projects found. Create a project first!</p>
            </div>
          ) : (
            <div className="modal-projects-grid">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="modal-project-card"
                  onClick={() => !sending && handleProjectClick(project.id)}
                >
                  <h3 className="modal-project-title">{project.title}</h3>
                  <p className="modal-project-description">
                    {project.description || 'No description'}
                  </p>
                  {sending && <div className="modal-loading-overlay">Sending...</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamUpModal;
